module.exports = {
	variables: {
		// baseurl: the origin landing page of the project.
		// You can set different base urls for the needed environments, and can specifiy if you want
		// to run tests on a specific url by passing variables to the run script
		// Examples:
		// - BASEURL='sit' npm test (execute tests on sit url using all breakpoints)
		// - BASEURL='dev' BREAKPOINT='mobile' npm test (execute tests on dev url using mobile breakpoint only )

		// If no variables are set when running test script, all test variations will be executed
		baseurl: {
			dev: 'http://localhost:3000', // your local baseurl
			sit:'https://5d935ab2f763290008f8ac48--dxstudio-accelerator-dev.netlify.com/',
			prod: 'https://dxstudio-accelerator-dev.netlify.com/' 
			// MAKE SURE TO UNCOMMENT LINE 70 TO CHECK FOR PASSWORD PROTECTION ON PROD
		},

		// breakpoint: size breakpoint between devices.
		breakpoint: {
			mobile: { width: 650, height: 2000 },
			tablet: { width: 900, height: 2000 },
			desktop: { width: 1200, height: 2000 },
		},

		// Add custom variables here
		// Note: Make sure the new variables are passed into describe.each()test suite and
		// passed into to cruller's startUp() method as params.
		// language: {
		// 	en: 'en', // en: '',
		// 	fr: 'fr',
		// 	es: 'es'
		// }
	},

	// Location of all page stamps. Using the gen-fs command will point this to the default directory.
	// However, if you prefer you can keep your stamps elsewhere.
	stampDirectory: 'stamps',

	// Location of your browserless installation. Leave blank if none is being used.
	// To use browserless, you need to add BROWSERLESS_KEY in your CI pipeline variables
	browserlessUrl: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_KEY}`,

	// Use this setup function to define any steps required to configure the startup state of your crawler.
	// - page:  is a new browser page created through cruller startUp() using
	//   await this.browser.newPage();
	// variables { 
	//	baseurl: {
	// 		dev: 'http://localhost:3000',
	// 		sit: 'sit-url',
	// 		prod: 'prod-url' 
	// },
	//  breakpoint: { desktop: { width: 1200, height: 2000 } } }
	// opts {banner:'dev' breakpoint : 'desktop'}
	
	async setupFunction(page, variables, opts) {
		// variables:  The list of variables set in the config file
		// opts: the permutation options set at the test suite level
		// page: puppeteer page

		const permutation = {};
		// set breakpoint
		await page.setViewport(variables.breakpoint[opts.breakpoint]);
		permutation.breakpoint = opts.breakpoint;
		// set banner
		permutation.baseurl = variables.baseurl[opts.baseurl];
		permutation.banner = opts.baseurl;	// banner is the options' baseurl

		// If we have a language permutation, you can add it as a path to the base url
		// or reconfigure the url in the desired way
		if (opts.language) {
			permutation.baseurl = `${variables.baseurl[opts.baseurl]}/${variables.language[opts.language]}`;
		} else {
			permutation.baseurl = variables.baseurl[opts.baseurl];
		}
		// visit baseUrl
		await page.goto(permutation.baseurl);

		// check if the website is a password protect site.
		// Check that prod shouldn't be password protected
		// if (opts.baseurl !== "prod" && await this.isPasswordProtected(page)) {
		if (await this.isPasswordProtected(page)) {
			await this.loginPasswordProtection(page, 'dxstudio123')
		}
	},

	// A function that contains custom instructions for specific permutations of environment variables which do not occur normally.
	envExceptions({ envMap }) {
		// add any business-specific code to change environment variables here
		return envMap;
	},

	// This method will check if the page is using netlify password protection
	async isPasswordProtected(page) {
		const title = await page.title();
		if (title === "Password Protection") {
			return true
		}
		else {
			false
		}
	},

	// This function will set netlify password to login on password protected site
	async loginPasswordProtection(page, password) {
		await page.type('[name="password"]', password, { delay: 10 });
		await page.waitFor(1000);
		await page.click('button.button');
		await page.waitFor(1000);
	},
	
	// accessibility configurations - refer README.md for configuration options
	accessibility : {
		runOnly: {
				type: 'tag',
				values: {
						include:['wcag2aa'],
						exclude: ['experimental']
				}
		},
		resultTypes: ['violations', 'passes', 'incomplete', 'inapplicable'],
	},

	// accessibility report configurations
	accessibilityReport : {
		fileType: 'tsv', // supported values - 'tsv' or 'csv' 
		fileName: 'AccessibilityReport',
		createNewFile: false 
	},
};
