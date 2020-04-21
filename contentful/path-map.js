// eslint-disable-next-line import/no-unresolved
const siteData = require('../data/siteData.json');
const { fallbackLang, defaultLang } = require('./config');
const { assetPrefix } = require('../site-config');
const { slugify } = require('../utils');

// this builds paths for a site that has both English and French pages.
// If you are building two separate sites for EN and FR, your path map will be very different
// Instead, you will use the language for the current context to build only pages for that language

function pathsForPageEntry(pageReference, isIndex = false) {
	const pageEntry = siteData.linkedEntries[pageReference.sys.id];
	const slugLanguages = Object.keys(pageEntry.fields.slug);
	// todo: map from template content model id or displayAs field
	const template = '';
	return slugLanguages.map(lang => {
		// if this is the index page for the default language, ignore the slug value
		const slug = isIndex && lang === defaultLang ? '' : pageEntry.fields.slug[lang];
		// Google Tag Manager(GTM) pageName. if GTM field is undefinded, use the page title as fallback
		const analyticsPageName = slugify(
			(pageEntry.fields.analyticsPageName && pageEntry.fields.analyticsPageName[fallbackLang]) ||
				(pageEntry.fields.title && pageEntry.fields.title[fallbackLang])
		);
		return {
			[`${assetPrefix}/${slug}`]: {
				// this "page" field maps to a template in the /pages directory
				page: `/${template}`,
				// lang and pageId will be passed to getInitialProps
				query: {
					lang,
					pageId: pageEntry.sys.id,
					analyticsPageName,
				},
			},
		};
	});
}

function pathMap() {
	const { siteEntry } = siteData;

	const indexPageEntry = siteEntry.fields.indexPage[fallbackLang];
	const pageEntries = siteEntry.fields.pages ? siteEntry.fields.pages[fallbackLang] : [];
	const indexPaths = pathsForPageEntry(indexPageEntry, true);
	const pagePaths = pageEntries.map(entry => pathsForPageEntry(entry));
	const allPaths = [indexPaths, ...pagePaths]
		.reduce((acc, val) => acc.concat(val), [])
		.reduce((acc, val) => ({ ...acc, ...val }), {});

	return allPaths;
}

module.exports = {
	// TODO: refactor to just export the function?
	// consider how to cache pathMap
	pathMap: pathMap(),
	pathsForPageEntry,
};
