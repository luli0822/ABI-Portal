/* eslint-disable import/no-extraneous-dependencies */
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

const { error } = console;

function customError(message) {
	// eslint-disable-next-line prefer-rest-params
	error.apply(console, arguments); // keep default behaviour
	throw message instanceof Error ? message : new Error(message);
}

function customLog() {}

// eslint-disable-next-line no-console
console.error = customError;
// eslint-disable-next-line no-console
console.log = customLog;

Enzyme.configure({ adapter: new Adapter() });
