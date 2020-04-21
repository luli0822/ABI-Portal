const each = require('jest-each');
const StarterKit = require('cruller'); // replace with project-specific name
const permutations = require('cruller').cartesian;


describe.each(permutations)('Sample %s %s', (baseurl, breakpoint) => {	
	let sample;
	beforeAll(async () => {
		sample = new StarterKit();
		await sample.startUp({ baseurl, breakpoint });
	}, 80000);

	afterAll(async () => {
		await sample.browser.close();
	});

	// This test will click the header links on starter kit
	// and checks that they redirect to the proper page
	test('Check that you can navigate between pages through header nav', async () => {
		// Note that this is a shared method, which can be accessed from different pages
		// We will use it through home page to navigate to about page.
		await sample.homePage.clickHeaderLinks('headerLink4'); 

		// You are expected to be on about page at this point, and can click the action button
		await sample.aboutPage.clickPageCta(); 

		// The step vobe will make sure you go back again to abut page, where you can call a shared method
		// to navigate to home page
		await sample.aboutPage.clickHeaderLinks('headerLink5')

		// From home page now, you can click the action button on home page.
		await sample.homePage.clickCallToAction()
	}, 80000);

});
