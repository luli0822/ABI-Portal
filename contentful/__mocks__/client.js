import fetchSiteData from './fetchSiteData.json';
// Refresh mock siteData will disclude about-us
module.exports = {
	getClient: () => {},
	fetchSiteData: () => fetchSiteData,
};
