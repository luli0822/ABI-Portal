module.exports = {
	pathMap: {
		'/': {
			page: '/',
			query: {
				lang: 'en-CA',
				pageId: 'site-home-page',
			},
		},
		'/home-pg-fr': {
			page: '/',
			query: {
				lang: 'fr-CA',
				pageId: 'site-home-page',
			},
		},
		'/about-pg-en': {
			page: '/',
			query: {
				lang: 'en-CA',
				pageId: 'about-us-page',
			},
		},
		'/about-pg-fr': {
			page: '/',
			query: {
				lang: 'fr-CA',
				pageId: 'about-us-page',
			},
		},
		// This path map for testing refreshed index page
		'/refreshed-page': {
			page: '/',
			query: {
				lang: 'en-CA',
				pageId: 'REFRESHED-site-home-page',
			},
		},
	},
};
