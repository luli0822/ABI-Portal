/* eslint-disable no-unused-vars */
const each = require('jest-each');
const StarterKit = require('cruller'); 
const permutations = require('cruller').cartesian;

describe.each(permutations)('Sample %s %s - Run accessibility validation', (baseurl, breakpoint) => {	
	let crawler;
	let accessibilityResults;

	// Before running test, Starts the crawler with a given permutation and set puppeteer options 
	// (ex baseurl and breakpoint in this case). Run accessibilityCheck method to validate page's 
	// accessibility. Call the method accessibilityCheck({page object}, {true or false flag if you 
	// want to create a new accessbility report or append to existing })
	beforeAll(async () => {
		crawler = new StarterKit();
		await crawler.startUp({ baseurl, breakpoint });
		// accessibility check using axe-puppeeter, returns results on the page
		accessibilityResults = await crawler.accessibilityCheck(crawler.page, true);
	}, 80000);

	// After running test, make sure to close the browser
	afterAll(async () => {
		await crawler.browser.close();
	});

	// test('check for passes', async () => {
	// expect(accessibilityResults).toHaveProperty('passes');
	// expect(accessibilityResults.passes).toEqual([]);
	// });

	/* CHECK FOR ACCESSIBILITY VIOLATIONS RESULTS
	 * VIOLATIONS: These results indicate what elements failed the rules */
	test('check for violations', async () => {
			await expect(accessibilityResults).toHaveProperty('violations');
			await expect(accessibilityResults.violations).toEqual([]);	
	});

	/* UNCOMMENT TO CHECK FOR ACCESSIBILITY INCOMPLETE RESULTS
	 * INCOMPLETE RESULTS: are results that were aborted and require further testing. 
	 * This can happen either because of technical restrictions to what the rule 
	 * can test, or because a javascript error occurred. */
	// test('check for incomplete', async () => {
	//  expect(accessibilityResults.incomplete).toEqual([]);
	// });

	/* UNCOMMENT TO CHECK FOR ACCESSIBILITY INAPPLICABLE RESULTS
	 * INAPPLICABLE RESULTS: These results indicate which rules did not run because 
	 * no matching content was found on the page. */
	// test('check for inapplicable', async () => {
	//  expect(accessibilityResults.inapplicable).toEqual([]);
	// });

}, 80000);
