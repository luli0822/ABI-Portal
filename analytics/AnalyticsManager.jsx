import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import analyticsContext from './analyticsContext';
import siteDataContext from '../contentful/siteDataContext';
import globals from '../globals';
import { analyticsPageSection } from '../site-config';
import { fallbackLang } from '../contentful/config';
import { slugify } from '../utils';
import { analyticsLangMap } from './analyticsUtils';

/**
 * Builds the analyticsData object for the analyticsContext to use to update analytics dataLayer on events
 * @param {*} props
 */
export default function AnalyticsManager(props) {
	const { children, pageId } = props;

	const { linkedEntries, fieldOrFallback, lang } = useContext(siteDataContext);

	// analytics page name - it should be slugified in contentful
	const analyticsPageName =
		linkedEntries[pageId] &&
		linkedEntries[pageId].fields &&
		fieldOrFallback(linkedEntries[pageId].fields.analyticsPageName);

	const pageTitle =
		linkedEntries[pageId] &&
		linkedEntries[pageId].fields &&
		fieldOrFallback(linkedEntries[pageId].fields.title, fallbackLang);

	// analytics pageName is analyticsPageName or a Slugified english page title as fallback
	const pageName = analyticsPageName || slugify(pageTitle);

	// eslint-disable-next-line no-nested-ternary
	const pageLanguage = analyticsLangMap[lang];

	/**
	 * Push an event to the dataLayer object
	 * @param linkName
	 */
	function pushAnalyticsEvent(linkName = undefined) {
		const { dataLayer } = globals.getWindow();

		let formattedLinkName = '';

		// If the linkName if passed as text/string
		if (typeof linkName === 'string') {
			formattedLinkName = slugify(linkName);
		}
		//  if linkName is passed as LinkEntry/object, get the english value of the link
		if (typeof linkName === 'object') {
			formattedLinkName = slugify(linkName[fallbackLang]) || formattedLinkName;
		}
		const analyticsSiteType = () => {
			if (window.innerWidth > 990) return 'desktop';
			if (window.innerWidth > 768) return 'tablet';
			return 'mobile';
		};

		//  GTM Object
		const analyticsDataLayer = {
			pageName,
			pageSection: analyticsPageSection,
			pageLanguage,
			siteType: analyticsSiteType(),
			linkName: formattedLinkName,
		};

		// add event only is linkName is provided
		if (linkName) {
			analyticsDataLayer.event = 'customLink';
		}

		// Push dataLayer for GTM
		dataLayer.push(analyticsDataLayer);
		// eslint-disable-next-line no-console
		console.log('Pushed to data layer:', analyticsDataLayer);
	}

	//  Push custom Link Event to dataLayer
	function pushCustomLinkEvent(linkName) {
		pushAnalyticsEvent(linkName);
	}

	// Use this event to push page view events on pageId change
	const usePageViewEvent = pageID => {
		useEffect(() => {
			// The second param to false to set dataLayer event to undefined instead of customLink
			pushAnalyticsEvent();
		}, [pageID]);
	};

	const analyticsData = {
		pushAnalyticsEvent,
		usePageViewEvent,
		pushCustomLinkEvent,
	};

	return <analyticsContext.Provider value={analyticsData}>{children}</analyticsContext.Provider>;
}

AnalyticsManager.propTypes = {
	children: PropTypes.node.isRequired,
	pageId: PropTypes.string,
};

AnalyticsManager.defaultProps = {
	pageId: undefined,
};
