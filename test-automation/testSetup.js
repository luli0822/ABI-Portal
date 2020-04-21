// You can add/implement setup assertions to be used in your tests as helper
// methods. They are not necessary to run tests. 
// Be sure to establish where assertions are kept in your package.json file using
// this example:
// "jest": {
// 	"setupFilesAfterEnv": [
// 		"./testSetup.js"
// 	]
// },
// The following examples show how to create assertions that:
// 1- check if you are on expected page.
// 2- check if  an element is visible on the given page, 
// For refernece: https://www.npmjs.com/package/cruller#creating-tests-in-jest

expect.extend({
	toBeOnPage(actual, expected) {
		const pass = actual.url().includes(expected.path);
		if (pass) {
			return {
				message: () => `expected ${actual.url()} not to contain ${expected.path}`,
				pass: true,
			};
		}
		return {
			message: () => `expected ${actual.url()} to contain ${expected.path}`,
			pass: false,
		};
	},

	async toHaveElement(puppeteerPage, expectedElement) {
		await puppeteerPage.waitForSelector(expectedElement, { visible: true });
		const pass = (await puppeteerPage.$(expectedElement)) !== null;
		if (pass) {
			return {
				message: () =>
					`expected ${puppeteerPage.url()} not to contain the element ${expectedElement}`,
				pass: true,
			};
		}
		return {
			message: () => `expected ${puppeteerPage.url()} to contain the element ${expectedElement}`,
			pass: false,
		};
	},

	// This assertion will check if the page response is valid.
	// The page response status is valid if the response in the range 200-399.
	// If the reponse isn't valid, it indicated an error in the page.
	async isValidPage(pageResponse) {
		const pass = pageResponse >= 200 && pageResponse <= 399 ;

		if (pass) {
			return {
				message: () =>
					`${pageResponse} is a valid response.`,
				pass: true,
			};
		}
		return {
			message: () => `${pageResponse} is not a valid response. There is an error in the page.`,
			pass: false,
		}
	},
	
	async toBeInViewPort(puppeteerPage, expectedElement) {
		//  Get the view port height to get the page location
		const viewPort = await puppeteerPage.viewport();
		const windowBottom = await viewPort.height;

		//  Find the element using selector
		const element = await puppeteerPage.waitForSelector(expectedElement)

		// Find the location of the element by finding the y coordinate
		const elementBoundries = await element.boundingBox();
		const elementLocation = await elementBoundries.y
		
		//  The test will pass when the element is within the viewport
		// location between (0 - window bottom)
		const pass = await ((elementLocation <= windowBottom) && (elementLocation >= 0));
		
		if (pass) {
			return {
				message: () =>
					`expected ${expectedElement} not to be within view port`,
				pass: true,
			}
		}
		return {
			message: () => `expected ${expectedElement} to be within view port`,
			pass: false,
		};
	},
});
