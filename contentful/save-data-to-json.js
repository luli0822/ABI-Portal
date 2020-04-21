/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { fetchSiteData } = require('./client');
const config = require('./config');
const { createPlaceholderDataUri } = require('./image-loader');

async function getData() {
	const dataDir = path.join(__dirname, '..', 'data');
	console.log('Saving site data to file:', path.join(dataDir, 'siteData.json'));

	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir);
	}

	const siteData = await fetchSiteData(config.siteSlug);

	// TODO: decide if pages should have their own folder
	fs.writeFileSync(path.join(dataDir, 'siteData.json'), JSON.stringify(siteData));

	// Filter linkedAssets that have file attached. If for some reason there is no file attached to the asset record, don't try to generate preview
	const filteredAssetsKeys = Object.keys(siteData.linkedAssets).filter(assetKey => {
		return (
			siteData.linkedAssets[assetKey].fields.file ||
			siteData.linkedAssets[assetKey].fields.file[config.defaultLang]
		);
	});

	// Map through filtered linked assets ids and get preview/placeholder 20px images. Save the previewAssets in assets.json
	const placeholderImages = await Promise.all(
		filteredAssetsKeys.map(async imgKey => {
			return {
				[imgKey]: {
					url: await createPlaceholderDataUri(
						siteData.linkedAssets[imgKey].fields.file[config.defaultLang].url,
						siteData.linkedAssets[imgKey].fields.file[config.defaultLang].contentType
					),
				},
			};
		})
	);

	const linkedPreviewAssets = placeholderImages.reduce((acc, cur) => {
		return {
			...acc,
			...cur,
		};
	}, {});

	// Save preview assets
	fs.writeFileSync(path.join(dataDir, 'assets.json'), JSON.stringify(linkedPreviewAssets));
}

getData();
