export const mockSiteMeta = {
	pageId: 'site-home-page',
	siteDomain: 'https://www.test-fr.ca/',
};

export const mockPageMeta = {
	pageId: 'about-us-page',
	siteDomain: 'https://www.test.ca',
};

export const mockNoFavicon = {
	sys: {
		id: 'siteId',
		contentType: {
			sys: {
				id: 'site',
				type: 'link',
			},
		},
	},
	fields: {
		title: {
			'en-CA': 'en title',
			'fr-CA': 'fr title',
		},
		indexPage: {
			'en-CA': {
				sys: {
					id: 'site-home-page',
				},
				fields: {
					slug: {
						'en-CA': 'index-slug',
					},
					title: {
						'en-CA': 'index title',
					},
				},
			},
		},
		pages: {
			'en-CA': [
				{
					sys: {
						id: 'about-us-page',
					},
				},
			],
		},
	},
};
