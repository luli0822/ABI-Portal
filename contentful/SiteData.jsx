import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import staticSiteData from '../data/siteData.json';
// eslint-disable-next-line import/no-unresolved
import previewAssets from '../data/assets.json';
import { pathMap } from './path-map';
import { fetchSiteData } from './client';
import config from './config';
import { langPropType } from './prop-types';
import siteDataContext from './siteDataContext';
// import { siteDomains, isProd } from '../site-config';
/**
 * Builds the siteData object for the siteDataContext and allows refreshing the site data in preview mode
 * @param {*} props
 */
export default function SiteData(props) {
	const { children, lang, pageId } = props;

	// start out with the static site data store in json before the build
	const [siteData, setSiteData] = useState(staticSiteData);
	const [isRefreshing, setIsRefreshing] = useState(false);

	async function refresh() {
		setIsRefreshing(true);
		const newSiteData = await fetchSiteData(config.siteSlug);
		setSiteData(newSiteData);
		setIsRefreshing(false);
	}

	useEffect(() => {
		// Refresh when the page loads in the client in preview mode.
		// This allows us to not build the preview site every time a piece of content is saved.
		// Instead, we just get the latest content on site load.
		if (config.isPreview) {
			refresh();
		}
	}, []);

	const { siteEntry, linkedEntries, linkedAssets } = siteData;

	// make keyValues nicer to work with
	// TODO: the values here are still just the keyValue/keyLink/keyRichText entries.
	// maybe we can make it even simpler and just actually map key:value?
	const keyValues = siteEntry.fields.keyValues
		? siteEntry.fields.keyValues[config.fallbackLang].reduce((acc, cur) => {
				const valueEntry = siteData.linkedEntries[cur.sys.id];
				return { ...acc, [valueEntry.fields.slug[config.fallbackLang]]: valueEntry };
		  }, {})
		: {};

	function isLink(field) {
		return field && field.sys && field.sys.type === 'Link';
	}

	/**
	 * Extract the field value in either current language or fallback language
	 * Or, if a link, return the linked object.
	 * TODO: is this doing too much? should we know when we're getting a link and when we're not?
	 * @param {object} field
	 * @param {string} fieldLang
	 */
	function fieldOrFallback(field, fieldLang = lang) {
		if (isLink(field)) {
			if (field.sys.linkType === 'Entry') return linkedEntries[field.sys.id];
			if (field.sys.linkType === 'Asset') return linkedAssets[field.sys.id];
		}

		const fieldValue = field ? field[fieldLang] || field[config.fallbackLang] : undefined;

		if (isLink(fieldValue)) {
			if (fieldValue.sys.linkType === 'Entry') return linkedEntries[fieldValue.sys.id];
			if (fieldValue.sys.linkType === 'Asset') return linkedAssets[fieldValue.sys.id];
		}

		return fieldValue;
	}

	/**
	 * Map properties of a pageLink or externalLink object to strings for use by the component
	 * @param {object} link link object
	 */
	function mapLink(link) {
		return {
			type: 'link',
			link,
			text: fieldOrFallback(link.fields.title),
			accessibleText: fieldOrFallback(link.fields.accessibleText),
		};
	}

	/**
	 * Map properties of an asset object to strings for use by the component
	 * @param {string} fieldName name of the field
	 * @param {object} linkObj link reference object, will be resolved to the actual media object
	 */
	function mapMedia(fieldName, linkObj) {
		const link = fieldOrFallback(linkObj);

		if (!link) return {};

		return {
			[fieldName]: link,
			[`${fieldName}AccessibleText`]: fieldOrFallback(link.fields.description),
		};
	}

	/**
	 * Map properties of a linkGroup object to strings for use by the component
	 * @param {object} link link object
	 * @param {function} mapItems a function that will map group items' into nav fields
	 */
	function mapGroup(link, mapItems) {
		return {
			type: 'group',
			text: fieldOrFallback(link.fields.title),
			accessibleText: fieldOrFallback(link.fields.accessibleText),
			items: mapItems(link.fields.navigation, fieldOrFallback),
		};
	}

	/**
	 * Map properties of a Contentful nav object to a simpler, standard props object with content in the current locale.
	 * This object is passed to the component, providing content values.
	 * @param {object} navField The Contentful block object
	 */
	function mapNavFields(navField) {
		const navList = fieldOrFallback(navField);
		// Map + resolve standard fields
		if (!navList) return undefined;

		const items = navList.map(itemLink => {
			const item = fieldOrFallback(itemLink);
			switch (item.sys.contentType.sys.id) {
				case 'linkGroup':
					return mapGroup(item, fieldOrFallback, mapNavFields);
				case 'pageLink':
				case 'externalLink':
					return mapLink(item, fieldOrFallback);
				default:
					return {};
			}
		});

		return items;
	}

	/** Map lang Switch object */
	function mapLangSwitch() {
		const langToggleKeyValue = fieldOrFallback(siteEntry.fields.languageToggle);

		const text = langToggleKeyValue && fieldOrFallback(langToggleKeyValue.fields.value);

		const accessibleTextKeyValue = fieldOrFallback(siteEntry.fields.languageToggleAccessibleText);

		const accessibleText =
			accessibleTextKeyValue && fieldOrFallback(accessibleTextKeyValue.fields.value);

		const altLang = lang === 'en-CA' ? 'fr-CA' : 'en-CA';

		// If the pageId isn't part of the defined routes in pathMap (error page in this case), we will be build the language switch link
		// to use index page as destination route. (siteEntry.fields.indexPage[config.fallbackLang].sys.id is the index page id)
		// Note: This senario will happen when you don't have an error page setup in contentful,
		// otherwise, the error page path will use the page from the pathMap

		// Get the page based on the pageId is defined/exists
		const pagePath = Object.entries(pathMap).find(
			([path, options]) => options.query.pageId === pageId && options.query.lang === altLang
		);

		// Get the index page from path map if the pageId is undefined
		const indexPage = Object.entries(pathMap).find(
			([path, options]) =>
				options.query.pageId === siteEntry.fields.indexPage[config.fallbackLang].sys.id &&
				options.query.lang === altLang
		);

		// pluck the "path" from the page definition
		const [altHref] = pagePath || indexPage;

		// UNCOMMENT THE LINES BELLOW If you require switching domains for English and French on prod.
		// uncomment isProd and siteDomains import line at the top of this file.
		// and make "altHref" a let instead of const above
		// altHref = isProd
		// 	? `${siteDomains[altLang]}${altHref}`
		// 	: altHref;

		return {
			// we return an href instead of href and asPath because the language switcher is always an <a> tag
			href: altHref,
			text,
			accessibleText,
		};
	}

	function buildIndexPageLink() {
		const [asPath, { page, query }] = Object.entries(pathMap).find(
			([path, options]) =>
				options.query.pageId === siteEntry.fields.indexPage[config.fallbackLang].sys.id &&
				options.query.lang === lang
		);

		const href = `${page}?pageId=${query.pageId}&lang=${lang}`;

		return {
			href,
			asPath,
		};
	}

	// Navigation
	const primaryLogo = mapMedia('primary', siteEntry.fields.siteLogo);

	const altLogo = mapMedia('alt', siteEntry.fields.siteLogo);

	// Build the site logo link
	const indexPageLink = buildIndexPageLink();

	const headerNav = mapNavFields(siteEntry.fields.navigation) || [];

	const footerNav = mapNavFields(siteEntry.fields.footerNavigation) || [];

	const langSwitchLink = mapLangSwitch();

	// Set the key value name as you have it in Contentful
	const skipNavText =
		keyValues['skip-nav-text'] && fieldOrFallback(keyValues['skip-nav-text'].fields.value, lang);

	const siteContext = {
		siteEntry,
		linkedEntries,
		linkedAssets,
		keyValues,
		pathMap,
		lang,
		fieldOrFallback,
		previewAssets,
		headerNav,
		footerNav,
		logo: {
			...primaryLogo,
			...altLogo,
			...indexPageLink,
		},
		indexPageLink,
		langSwitchLink,
		skipNavText,
	};

	const buttonStyles = {
		boxShadow: '3px 3px 5px 0px #AFB1BC',
		display: 'inline-block',
		backgroundColor: '#ffffff',
		color: '#000',
		border: '1px solid rgb(216, 216, 216)',
		borderRadius: '4px',
		padding: '2px 7px',
		textDecoration: 'none',
		fontSize: '12px',
		fontFamily: 'sans-Serif',
	};

	return (
		<siteDataContext.Provider value={siteContext}>
			{config.isPreview && (
				<div
					style={{
						position: 'fixed',
						top: '5px',
						left: '5px',
						zIndex: '2000',
					}}
					role="complementary"
				>
					<button type="button" onClick={refresh} style={buttonStyles}>
						{isRefreshing ? '...' : 'Refresh'}
					</button>
					<a
						href="/storybook"
						style={{
							...buttonStyles,
						}}
					>
						Component Library
					</a>
				</div>
			)}
			{children}
		</siteDataContext.Provider>
	);
}

SiteData.propTypes = {
	children: PropTypes.node.isRequired,
	lang: langPropType.isRequired,
	pageId: PropTypes.string,
};

SiteData.defaultProps = {
	pageId: undefined,
};
