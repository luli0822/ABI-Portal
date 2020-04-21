const { createClient } = require('contentful');
const config = require('./config');

function getClient() {
	const { space, accessToken, host, environment } = config;
	return createClient({
		space,
		accessToken,
		host,
		environment,
		resolveLinks: false,
		removeUnresolved: false,
	});
}

async function fetchSiteData(siteSlug) {
	const client = getClient();

	const allData = await client
		.getEntries({
			content_type: 'site',
			'fields.slug': siteSlug,
			locale: '*',
			include: 10,
		})
		.catch(err => {
			throw Error(err);
		});

	const siteEntry = allData.items[0];
	const linkedEntries = allData.includes.Entry.reduce(
		(acc, cur) => ({ ...acc, [cur.sys.id]: cur }),
		{}
	);

	const linkedAssets = allData.includes.Asset.reduce(
		(acc, cur) => ({ ...acc, [cur.sys.id]: cur }),
		{}
	);

	return {
		siteEntry,
		linkedEntries,
		linkedAssets,
	};
}

module.exports = {
	getClient,
	fetchSiteData,
};
