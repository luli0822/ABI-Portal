/** Plugin for image optimization via webpack for Next.js
 * Using this instead of next-optimized-images for now because this allows us to have webp resizing
 */

const path = require('path');

const responsiveSizes = [100, 200, 400, 600, 800, 1200, 1440, 1600, 2400, 2880];

module.exports = (nextConfig = {}) => ({
	...nextConfig,
	webpack(config, options) {
		// assetPrefix set in next.config.js
		const { assetPrefix } = nextConfig;

		// const fileLoaderOptions = {
		// 	publicPath: `${assetPrefix || ''}/_next/static/images/`,
		// 	outputPath: 'static/images/',
		// 	name: '[name]-[hash].[ext]',
		// };

		const urlLoaderOptions = {
			publicPath: `${assetPrefix || ''}/_next/static/images/`,
			outputPath: 'static/images/',
			name: '[name]-[hash].[ext]',
			limit: 8192,
			fallback: 'file-loader',
		};

		config.module.rules.push({
			// are we importing an image?
			test: /\.(gif|png|jpe?g|svg)$/i,
			oneOf: [
				{
					// get dimensions for an image
					resourceQuery: /[?&]responsive/i,
					use: [
						{
							// the sharp-multiple-image-loader is highly configurable. See the readme.md in this directory!
							loader: path.resolve('images/sharp-multiple-image-loader.js'),
							options: {
								publicPath: `${assetPrefix || ''}/_next/static/images/`,
								outputPath: 'static/images/',
								sharpOptions: [
									...responsiveSizes.map(width => ({
										name: width,
										width,
									})),
									...responsiveSizes.map(width => ({
										name: `${width}-webp`,
										formatOut: 'webp',
										width,
									})),
									{
										name: 'placeholder',
										width: 20,
									},
								],
							},
						},
					],
				},
				{
					// default optimized image loader
					use: [
						{
							loader: 'url-loader',
							options: urlLoaderOptions,
						},
						{
							loader: 'image-webpack-loader',
						},
					],
				},
			],
		});

		if (typeof nextConfig.webpack === 'function') {
			return nextConfig.webpack(config, options);
		}
		return config;
	},
});
