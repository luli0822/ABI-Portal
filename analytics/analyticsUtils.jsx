import React from 'react';
import PropTypes from 'prop-types';
import { analyticsPageSection, GTMAnalyticsId } from '../site-config';

export const analyticsLangMap = {
	'en-CA': 'en',
	'fr-CA': 'fr',
};

/**
 * Used in the _document.jsx component, renders a script to the head exactly once
 */
export function GoogleTagManagerHead() {
	// Place GTM head script as high in the <head> of the page as possible
	const scriptContent = `
	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','${GTMAnalyticsId}');`;

	// eslint-disable-next-line react/no-danger
	return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}

/**
 * Used in _document.jsx component, renders the fallback tracking iframe
 */
export function GoogleTagManagerBody() {
	// Place GTM body script immediately after the opening <body> tag
	return (
		<noscript>
			<iframe
				src={`https://www.googletagmanager.com/ns.html?id=${GTMAnalyticsId}`}
				height="0"
				width="0"
				style={{ display: 'none', visibility: 'hidden' }}
				title="analytics"
			></iframe>
		</noscript>
	);
}

export function AnalyticsDataObject({ lang, pageName }) {
	// eslint-disable-next-line no-nested-ternary
	const pageLanguage = analyticsLangMap[lang];
	const scriptContent = `
		var analyticsSiteType = (function(width) {
			if (width > 990) return 'desktop'
			if (width > 768) return 'tablet'
			return 'mobile'
		})(window.innerWidth)


		var dataLayer = [{
			pageName: "${pageName}",
			pageSection: "${analyticsPageSection}",
			pageLanguage: "${pageLanguage}",
			siteType: analyticsSiteType,
			linkName: "",
		}];
	`;

	// eslint-disable-next-line react/no-danger
	return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}

AnalyticsDataObject.propTypes = {
	lang: PropTypes.oneOf(['en-CA', 'fr-CA']),
	pageName: PropTypes.string,
};

AnalyticsDataObject.defaultProps = {
	lang: undefined,
	pageName: undefined,
};
