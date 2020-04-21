/* eslint-disable no-console */
const stampit = require('@stamp/it');

// You can define methods that can be accessed from any page, or if it is shared
// across different pages. Example as header/footer, banners or componenets used
// across different pages or sections

const sharedBase = stampit({
	props: {
		myProp: 'this property is accessible from any page, if the breakpoint variable is not set',
		headerLink1: 'a[data-cruller=header__link1]',
		headerLink2: 'a[data-cruller=header__link2]',
		headerLink3: 'a[data-cruller=header__link3]',
		headerLink4: 'a[data-cruller=header__link4]',
		headerLink5: 'a[data-cruller=header__link5]'

	},

	methods: {
		/**
		 *  Shared page functions.
		 *  @namespace Shared
		 */

		/**
		 * Sample method on the Shared page to show how methods run differently depending on the parameters given.
		 * @memberof Shared
		 * @async
		 */
		async sharedAction() {
			console.log('This method is accessible from any page');
		},

		// This method will return the current url
		async getCurrentUrl() {
			return await this.puppeteerPage.url();
		},
		// This method will go back to previous page with a default timeout of 1000
		async goBack(timeout= 1000) {
			await this.puppeteerPage.goBack({ timeout });
		},

		// This method will navigate on header link click
		async clickHeaderLinks(selector){
			await this.waitClickNavigate(selector);
		},

		// This method will perform a click action and return the response
		// param: selector
		async getCtaClickResponse(selector) {
			const [response] = await Promise.all([
				this.puppeteerPage.waitForNavigation(), // The promise resolves after navigation has finished
				this.puppeteerPage.click(selector), // Clicking the link will indirectly cause a navigation
			]);
			return response;
		}
	},
});

const sharedDesktop = stampit({
	props: {
		extraTabletProp: 'this property is accesible from any Desktop page',
	},

	methods: {
		async sharedAction() {
			console.log(`Desktop: ${this.extraTabletProp}`);
			return this.myProp;
		},

		// UNCOMMENT TO PERFOM DIFFERENT OR EXTRA STEPS ON DESKTOP BREAKPOINT
		// async checkHeaderLinks() {
		// }
	},
});

const sharedTablet = stampit({
	props: {
		extraTabletProp: 'this property is accesible from any Tablet page',
	},

	methods: {
		async sharedAction() {
			console.log('perform extra tablet step');
			console.log(`tablet: ${this.extraTabletProp}`);
			return this.myProp;
		},
		
		// UNCOMMENT TO PERFOM DIFFERENT OR EXTRA STEPS ON TABLET BREAKPOINT
		// async checkHeaderLinks() {
		// }
	},
});

const sharedMobile = stampit({
	props: {
		extraTabletProp: 'this property is accesible from any Mobile page',
	},

	methods: {
		async sharedAction() {
			console.log(`Mobile: ${this.extraTabletProp}`);
			return this.myProp;
		},
		
		// UNCOMMENT TO PERFOM DIFFERENT OR EXTRA STEPS ON MOBILE BREAKPOINT
		// async checkHeaderLinks() {
		// }
	},
});

module.exports = { sharedBase, sharedDesktop, sharedTablet, sharedMobile };
