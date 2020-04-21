/* eslint-disable no-undef */
/**
 * All globals (window, document) must be defined here so that we can mock them properly
 */

const globals = {
	isBrowser: process.browser || false,
	getElementById: process.browser
		? document.getElementById.bind(document)
		: () => {
				throw new Error('Cannot getElementById on server side');
		  },
	getNavigator: process.browser
		? () => navigator
		: () => {
				throw new Error('Cannot get navigator on server side');
		  },
	getWindow: process.browser
		? () => window
		: () => {
				throw new Error('Cannot get navigator on server side');
		  },
	getDocument: process.browser
		? () => document.documentElement
		: () => {
				throw new Error('Cannot get documentElement on server side');
		  },
	getDocumentElement: process.browser
		? () => document.documentElement
		: () => {
				throw new Error('Cannot get documentElement on server side');
		  },
};

export default globals;
