module.exports = {
	moduleFileExtensions: ['jsx', 'js'],
	transform: {
		'^.+\\.jsx$': 'babel-jest',
		'^.+\\.js$': 'babel-jest',
	},
	globals: {
		'babel-jest': {
			useBabelrc: true,
		},
	},
	coveragePathIgnorePatterns: ['/node_modules/', 'enzyme.js'],
	testPathIgnorePatterns: ['/test-automation/tests/'],
	setupFiles: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
		'\\.(jpg|jpeg|png)[?&]srcset': '<rootDir>/__mocks__/srcsetMock.js',
		'\\.(jpg|jpeg)[?&]exif': '<rootDir>/__mocks__/exifLoaderMock.js',
		'\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
	},
};
