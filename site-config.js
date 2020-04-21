// urls used by the meta component
const siteDomains = {
	'en-CA': '//www.domain.ca',
	'fr-CA': '//www.domainfr.ca',
};

const isProd = process.env.BRANCH === 'master';

// Analytics pageSection to be set inline in the code as a single value
// Configure this value per project
const analyticsPageSection = 'DX-Accelerator';
const GTMAnalyticsId = 'GTM-XXXXXXX';

module.exports = {
	siteDomains,
	isProd,
	assetPrefix: process.env.NETLIFY_ASSET_PATH || '',
	analyticsPageSection,
	GTMAnalyticsId,
};
