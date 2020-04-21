const request = require('request-promise-native');

async function createPlaceholderDataUri(imageURL, contentType, imageWidth = 20) {
	const requestOptions = {
		method: 'GET',
		// 20px contentful image url
		uri: imageURL.startsWith('https:')
			? `${imageURL}?w=${imageWidth}`
			: `https:${imageURL}?w=${imageWidth}`,
		// adding this option gets the image as a buffer
		encoding: null,
	};

	const body = await request(requestOptions);
	const imageUri = await encode(body, contentType);

	return imageUri;
}

// encode an image data to base64
function encode(data, mediaType) {
	if (!data || !mediaType) {
		Error(' Error :: Missing some of the required params: data, mediaType');
		return null;
	}
	const dataBase64 = Buffer.isBuffer(data)
		? data.toString('base64')
		: Buffer.from(data).toString('base64');
	const dataImgBase64 = `data:${mediaType || ''};base64,${dataBase64}`;

	return dataImgBase64;
}

module.exports = {
	createPlaceholderDataUri,
};
