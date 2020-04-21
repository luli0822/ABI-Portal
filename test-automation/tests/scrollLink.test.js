const each = require('jest-each');
const StarterKit = require('cruller'); // replace with project-specific name
const permutations = require('cruller').cartesian;

// permutations passed in this syntax
// [[<baseurl-variable>, <breakpoint-baseurl>]], [[ 'dev', 'desktop']]
describe.each(permutations)('ScrollLink %s %s', (baseurl, breakpoint) => {	
	let crawler;

	beforeAll(async () => {
		crawler = new StarterKit();
		//  StartUp method params are passed as
		// { baseurl, breakpoint, <other options>}
		// baseurl: refers to the baseurl variable
		// breakpoint: breakpoint refers - If you don't want to use breakpoint permutation
		// make sure to remove the breakpoint check from setupFunction() in cruller.config.js 
		await crawler.startUp({ baseurl, breakpoint });
	}, 80000);

	afterAll(async () => {
		await crawler.browser.close();
	});

	test('Testing scroll link within view port', async () => {
		// 1- Make sure element exists and is in ViewPort before using scroll Link
		// await expect(crawler.page).toHaveElement('a[data-cruller=banner-section-link]');
		await expect(crawler.page).toBeInViewPort('a[data-cruller=banner-section-link]');
		
		// Click on banner link and wait for 1 seconds to finish scroll
		await crawler.homePage.checkScrollLink('a[data-cruller=banner-section-link]');
		await crawler.page.waitFor(1000);

		// 3- After scroll, check the scrolled section is visible in viewport
		// video section is visible
		await expect(crawler.page).toBeInViewPort('h2#home-video-heading');
		await expect(crawler.page).toBeInViewPort('a[data-cruller=video-section-link]');

		// 4- check the clicked link is now not in view port
		// Banner section isn't visible
		await expect(crawler.page).not.toBeInViewPort('h2#home-banner-heading');
	}, 80000)
});
