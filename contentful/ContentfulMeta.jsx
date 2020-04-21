import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import siteDataContext from './siteDataContext';

function ContentfulMeta({ pageId, siteDomain, metaTitle }) {
	const iconSizes = [192, 96, 32, 16];
	const appleTouchIconSizes = [180, 152, 144, 114, 120, 76, 60, 57];
	const { fieldOrFallback, pathMap, siteEntry, linkedEntries, linkedAssets, lang } = useContext(
		siteDataContext
	);

	const [pagePath] = Object.entries(pathMap).find(
		([path, options]) =>
			options.query.pageId === linkedEntries[pageId].sys.id && options.query.lang === lang
	);

	const pageUrl = siteDomain && pagePath ? `${siteDomain}${pagePath}/` : null;
	const pageEntryFields = linkedEntries[pageId].fields;
	const siteEntryFields = siteEntry.fields;
	const isIndexPage = fieldOrFallback(siteEntryFields.indexPage).sys.id === pageId;
	const siteTitle = fieldOrFallback(siteEntryFields.title);
	const favicon = fieldOrFallback(siteEntryFields.favicon);
	const faviconUrl = favicon ? fieldOrFallback(linkedAssets[favicon.sys.id].fields.file).url : '';
	const pageTitle = fieldOrFallback(pageEntryFields.title);
	const description = fieldOrFallback(pageEntryFields.description);
	const keywords = fieldOrFallback(pageEntryFields.keywords);
	const pageKeywords = keywords ? fieldOrFallback(pageEntryFields.keywords).toString() : '';
	const ogDescription = fieldOrFallback(pageEntryFields.openGraphDescription);
	const ogTitle = fieldOrFallback(pageEntryFields.openGraphTitle);
	const ogImage = fieldOrFallback(pageEntryFields.openGraphImage);
	const ogImgUrl =
		(ogImage &&
			fieldOrFallback(linkedAssets[ogImage.sys.id].fields.file) &&
			fieldOrFallback(linkedAssets[ogImage.sys.id].fields.file).url) ||
		'';

	const title =
		metaTitle ||
		(isIndexPage && siteTitle && siteTitle) ||
		(pageTitle && siteTitle && `${pageTitle} | ${siteTitle}`) ||
		pageTitle ||
		'';

	return (
		<Head>
			{/* Page title */}
			<title>{title}</title>

			{/* Page desciption */}
			{description && <meta name="description" content={description} />}

			{/* OG page url and canonical url  */}
			{pageUrl && <meta property="og:url" content={pageUrl} />}
			{pageUrl && <link rel="canonical" href={pageUrl} />}

			{/* Get the keywords as an array */}
			{keywords && <meta name="keywords" content={pageKeywords} />}

			{/* Page OG Description */}
			{ogDescription && <meta property="og:description" content={ogDescription} />}

			{/* Page OG title */}
			{ogTitle && <meta property="og:title" content={ogTitle} />}

			{/* Page OG image */}
			{ogImage && <meta property="og:image" content={ogImgUrl} />}

			{/* Favicon links */}
			{faviconUrl && <link rel="icon" type="image/png" href={`${faviconUrl}?fm=png`} />}
			{faviconUrl &&
				iconSizes.map((size, index) => (
					<link
						rel="icon"
						type="image/png"
						sizes={`${size}x${size}`}
						href={`${faviconUrl}?w=${size}&fm=png`}
						// eslint-disable-next-line react/no-array-index-key
						key={index}
					/>
				))}
			{faviconUrl &&
				appleTouchIconSizes.map((size, index) => (
					<link
						rel="apple-touch-icon"
						sizes={`${size}x${size}`}
						href={`${faviconUrl}?w=${size}&fm=png`}
						// eslint-disable-next-line react/no-array-index-key
						key={index}
					/>
				))}
			{faviconUrl && <meta name="msapplication-TileImage" content={`${faviconUrl}?fm=png`} />}
			{siteTitle && <meta name="apple-mobile-web-app-title" content={siteTitle} />}
		</Head>
	);
}

ContentfulMeta.propTypes = {
	pageId: PropTypes.string.isRequired,
	siteDomain: PropTypes.string,
	metaTitle: PropTypes.string,
};

ContentfulMeta.defaultProps = {
	siteDomain: undefined,
	metaTitle: undefined,
};

export default ContentfulMeta;
