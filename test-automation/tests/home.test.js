/* eslint-disable no-unused-vars */

// The name of the test files, doesn't have to be the same as the page name being tested. Test files
// are mainly to test flows within a page or across multiple pages. You don't need to create a new test file
// per page, but per flow/functionality that you want to test.
// 
// HOW TO CREATE TESTS IN JEST
// - https://www.npmjs.com/package/cruller#creating-tests-in-jest
// - make sure to set cruller instance and permutations within describe.each()
// - beforeAll() - run before test commences
// - afterAll() - run after tests end/fail gracefully (used for cleanup and closing browser)
// - test() methods to run during the test, pages to use, etc.
// - Navigate to the page you want to test within the test case (example crawler.[pageName]Page.[method_within_Page])
// - You shouldn't be putting puppeteer methods here, just cruller and jest
// - You can add variables into the test to pass to the pages (if the page method accepts variables)
// - A test can contain different pages to create a flow

const each = require('jest-each');
const StarterKit = require('cruller'); // replace with project-specific name
const permutations = require('cruller').cartesian;

// example of Permutations: [ ['dev', 'mobile'], ['dev', 'tablet'], ['dev', 'desktop'] ]
// If you have more custom variables, you need to add them to the describe.each() suite and
// pass them to startUp() method
// - describe.each(permutations)('Sample %s %s', (banner, breakpoint, <custom-variable>) => {	
// - await sample.startUp({ banner, breakpoint, <custom-variable>});

describe.each(permutations)('Sample %s %s', (baseurl, breakpoint) => {	
	let sample;
	//  before running test, Starts the crawler with a given permutation 
	// and set of puppeteer options (ex baseurl and breakpoint in this case)
	beforeAll(async () => {
		sample = new StarterKit();
		await sample.startUp({ baseurl, breakpoint });
	}, 80000);

	// After running test, make sure to close the browser
	afterAll(async () => {
		await sample.browser.close();
	});

	// This test will click the header links on starter kit
	// and checks that they redirect to the proper page
	test('Check link headers by using shared stamps', async () => {
		// Check link1
		await sample.homePage.clickHeaderLinks('headerLink1')
		await expect(await sample.homePage.getCurrentUrl()).toEqual('https://www.google.com/');
		await sample.homePage.goBack()

		// Check link2
		await sample.homePage.clickHeaderLinks('headerLink2')
		await expect(await sample.homePage.getCurrentUrl()).toEqual('https://developer.mozilla.org/en-US/');
		await sample.homePage.goBack()

		// Check link3
		await sample.homePage.clickHeaderLinks('headerLink3')
		await expect(await sample.homePage.getCurrentUrl()).toEqual('https://www.npmjs.com/package/cruller');
		await sample.homePage.goBack()

	}, 80000);

	// This test to check call to action button on starter kit
	// redirects to the proper link
	test('Open home page and click button', async () => {
		await sample.homePage.clickCallToAction();
		await expect(await sample.homePage.getCurrentUrl()).toEqual('https://loblawdigital.co/');
		await sample.homePage.goBack()
	}, 80000);

	test('Validate CTA URL status - using cta link', async () => {
		const response = await sample.homePage.getCtaClickResponse('a[data-cruller=header__link1]')
		
		await expect(response.status()).isValidPage()
	}, 80000)

	test('Validate URL status - without using a CTA link', async () => {
		const response = await sample.page.goto('https://www.npmjs.com/package/cruller')

		// Check if the response status to validate page response
		await expect(response.status()).isValidPage()
	}, 80000)
});
