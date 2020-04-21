/* eslint-disable no-console */
const stampit = require('@stamp/it');

// HOW TO BUILD PAGE STAMPS
// See bellow for reference:
// - How to create a new stamp page: https://www.npmjs.com/package/cruller#creating-stamps
// - https://confluence.lblw.cloud/display/PHARM/Automated+Front+End+Testing+Using+Cruller
// - https://www.npmjs.com/package/cruller#what-are-stamps

// For a stamp ending with Base, the methods will be run by default unless the method is defined 
// within a breakpoint stamp (ex homeDesktop, homeMobile, homeTablet). In this case, the method 
// in the breakpoint stamp will be running instead .

// - You can add stamps and methods to be used on home page and will only be accessed
//   when called through homePage

// - The name of Pages doesn't have to match the name of tests. The purpose of the pages is to make sure we put all stamps related
// 	to a particular page within the same object.

// Example - To check navigation between different pages, we have a test file 'tests/navigateBetweenPages.test.js' which executes a test
// case that clicks between about and home page, and performs clicking CTA buttons

const homeBase = stampit({
	props: {
		// NOTE: that this is not a required prop. IT HAS NOTHING TO DO WITH VALIDATING IF YOU ARE ON THE CORRECT PAGE IN THE APPLICATION.
		// You need to make sure in your test cases's flow that you call these methods when you are on home Page (that you are ACTUALLY in
		// the application's home page.) Otherwise, the test will fail with an error that you can't find elements, etc.
		path: '/',
		homeProp: 'used for desktop',
		callToActionButton: 'a[data-cruller="home-hero__cta-button"]',
	},

	methods: {
		/**
		 *  Home page functions.
		 *  @namespace Home
		 */

		/**
		 * Methods on the home page to display the breakpoint the test is being run on
		 * @memberof Home
		 * @async
		 */
		async homeMethod() {
			console.log(`desktop: ${this.homeProp}`);
			return this.homeProp;
		},

		async clickCallToAction() {
			await this.waitClickNavigate('callToActionButton');
		},

		async checkScrollLink(selector) {
			await this.puppeteerPage.click(selector);
		}
	},
});

const homeTablet = stampit({
	props: {
		homeProp: 'used for tablet',
	},

	methods: {
		async homeMethod() {
			console.log('perform extra tablet step');
			console.log(`tablet: ${this.homeProp}`);
			return this.homeProp;
		},

		// UNCOMMENT this method if you want to run different validation
		// on tablet breakpoint. example: clicking button within a hamburger menu
		// or the action button direct to a different link/url
		// async clickCallToAction() {
		// }
	},
});

const homeMobile = stampit({
	props: {
		homeProp: 'used for mobile',
	},

	methods: {
		async homeMethod() {
			console.log('perform extra mobile step');
			console.log(`mobile: ${this.homeProp}`);
			return this.homeProp;
		},

		// UNCOMMENT this method if you want to run different validation
		// on mobile breakpoint.
		// async clickCallToAction() {
		// },
	},
});

// This stampit contains methods that be called on Dev baseurl
const homeDev = stampit({
	props: {
	},
	methods: {
		// Add Dev methods here
	}
})

// This stampit contains methods that be called on SIT baseurl
const homeSit = stampit({
	props: {
	},
	methods: {
		// Add Sit methods here
	}
})

// This stampit contains methods that be called on Prod baseurl
const homeProd = stampit({
	props: {
	},
	methods: {
		// ADD METHODS TO BE RUN FOR PROD
	}
})

module.exports = { homeBase, homeTablet, homeMobile, homeSit, homeDev, homeProd };
