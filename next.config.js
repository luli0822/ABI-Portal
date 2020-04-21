// make it easy to include multiple Next.js plugins: https://github.com/cyrilwanner/next-compose-plugins
const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withImages = require('./images/nextjs-image-plugin');
const { assetPrefix } = require('./site-config');
const { pathMap } = require('./contentful/path-map');

// if you are hosting this app behind a reverse proxy that is only forwarding a subdirectory,
// then you will want to set the assetPrefix to a subdir of that directory
// and also update this path in netlify.toml
// const assetPrefix = process.env.NETLIFY_ASSET_PATH || '';
// const languageRoutes = {
// 	[`${assetPrefix}/`]: { page: '/', query: { lang: 'en' } },
// 	[`${assetPrefix}/fr`]: { page: '/', query: { lang: 'fr' } },
// 	[`${assetPrefix}/about`]: { page: '/about', query: { lang: 'en' } },
// 	[`${assetPrefix}/fr/about`]: { page: '/about', query: { lang: 'fr' } },
// };

const nextConfig = {
	assetPrefix,
	exportPathMap: async () => pathMap,
	// exportTrailingSlash: true is required to ensure all files reside in the /assetPrefix folder
	exportTrailingSlash: true,
	env: {
		BRANCH: process.env.BRANCH,
		CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
	},
	webpack(config) {
		return config;
	},
};

const sassOptions = {
	sassLoaderOptions: {
		outputStyle: 'compressed',
	},
};

// eslint-disable-next-line no-console
console.log('Building this path map:', pathMap);

module.exports = withPlugins([[withSass, sassOptions], [withImages], [withFonts]], nextConfig);
