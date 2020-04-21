/* eslint-disable no-console */
const stampit = require('@stamp/it');

// - You can add stamps and methods to be used for aboutPage and will only be accessed
//   when called through aboutPage
const aboutBase = stampit({
	props: {
		// NOTE: that this is not a required prop. IT HAS NOTHING TO DO WITH VALIDATING IF YOU ARE ON THE CORRECT PAGE IN THE APPLICATION.
		// You need to make sure in your test cases's flow that you call these methods when you are in about Page (that you are ACTUALLY in
		// the application's about page.) Otherwise, the test will fail with an error that you can't find elements, etc.
		path: '/about',
		aboutCTAButton: 'a[data-cruller="about__cta-button"]',
	},

	methods: {

		 async clickPageCta() {
				await this.waitClickNavigate('aboutCTAButton');
				await this.puppeteerPage.goBack({ timeout: 1000 });
		 }
	}
});


module.exports = { aboutBase };
