// this module builds image objects for all images in the components folder.
// see the __mocks__ directory for the shape of the generated object.

// create a require() context that includes all jpeg+png files in the components folders
const requireImage = require.context('../components/?responsive', true, /\.jpe?g|\.png$/);

const imageFileNames = requireImage.keys();

const images = imageFileNames
	// for each image, create an object with the file name as a key and the loader output as the value
	.map(image => ({ [image.slice(2)]: requireImage(image) }))
	// merge all the image objects to one
	.reduce((obj, image) => ({ ...obj, ...image }), {});

module.exports = images;
