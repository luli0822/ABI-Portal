const loaderUtils = require('loader-utils');
const sharp = require('sharp');
const imageSize = require('image-size');
const mime = require('mime');

function sharpTransformer(contentBuffer, options) {
	const transformer = sharp(contentBuffer);
	Object.assign(transformer.options, options);
	return transformer.toBuffer().then(resultBuffer => ({ ...options, resultBuffer }));
}

function createFileOrDataUri(loaderContext, imageData) {
	if (imageData.resultBuffer.length > 8192) {
		loaderContext.emitFile(imageData.outputPath, imageData.resultBuffer);
	} else {
		const mimetype = mime.getType(imageData.publicPath);
		// eslint-disable-next-line no-param-reassign
		imageData.publicPath = `data:${mimetype || ''};base64,${imageData.resultBuffer.toString(
			'base64'
		)}`;
	}
	return imageData;
}

function generateFilenames(
	loaderContext,
	imageResult,
	{ outputPath: configOutputPath, publicPath: configPublicPath },
	{ formatOut }
) {
	const filename = loaderUtils.interpolateName(
		loaderContext,
		`[name]-${imageResult.name}.${formatOut || '[ext]'}`,
		{
			context: loaderContext.rootContext,
			content: imageResult.resultBuffer,
		}
	);

	const outputPath = `${configOutputPath}${filename}`;

	const publicPath = `${configPublicPath}${filename}`;

	return { ...imageResult, outputPath, publicPath };
}

module.exports = function loader(contentBuffer) {
	const loaderCallback = this.async();
	const loaderOptions = loaderUtils.getOptions(this);

	const promises = loaderOptions.sharpOptions.map(options =>
		sharpTransformer(contentBuffer, options)
			.then(result => generateFilenames(this, result, loaderOptions, options))
			.then(result => createFileOrDataUri(this, result))
	);

	Promise.all(promises)
		.then(results => {
			const images = results
				.map(result => ({ [result.name]: result.publicPath }))
				.reduce((obj, item) => ({ ...obj, ...item }), { meta: imageSize(contentBuffer) });
			const resultString = JSON.stringify(images);
			loaderCallback(null, `module.exports = ${resultString};`);
		})
		.catch(err => loaderCallback(err));

	return undefined;
};

module.exports.raw = true;
