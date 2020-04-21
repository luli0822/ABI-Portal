import pathMap from './path-map';
import { linkDataMock, imageDataMock } from './common';

export const mockLang = 'en-CA';

export const mockPathMap = pathMap.pathMap;

export const mockLinkedEntries = {
	'site-home-page': {
		sys: {
			id: 'site-home-page',
			space: {},
			contentType: {
				id: 'page',
			},
		},
		fields: {
			title: {
				'en-CA': 'title en',
				'fr-CA': 'title fr',
			},
			description: {
				'en-CA': 'description en',
				'fr-CA': 'description en',
			},
			openGraphTitle: {
				'en-CA': 'openGraphTitle en',
				'fr-CA': 'openGraphTitle en',
			},
			openGraphDescription: {
				'en-CA': 'openGraphDescription en',
				'fr-CA': 'openGraphDescription en',
			},
			slug: {
				'en-CA': 'home-pg-en',
				'fr-CA': 'home-pg-fr',
			},
		},
	},
	'about-us-page': {
		sys: {
			id: 'about-us-page',
			space: {},
			contentType: {
				id: 'page',
			},
		},
		fields: {
			title: {
				'en-CA': 'title en',
				'fr-CA': 'title fr',
			},
			description: {
				'en-CA': 'description en',
				'fr-CA': 'description en',
			},
			openGraphTitle: {
				'en-CA': 'openGraphTitle en',
				'fr-CA': 'openGraphTitle en',
			},
			openGraphDescription: {
				'en-CA': 'openGraphDescription en',
				'fr-CA': 'openGraphDescription en',
			},
			slug: {
				'en-CA': 'about-pg-en',
				'fr-CA': 'about-pg-fr',
			},
		},
	},
	'about-us-page-link': {
		sys: {
			id: 'about-us-page-link',
			space: {},
			contentType: {
				sys: {
					type: 'Link',
					id: 'pageLink',
				},
			},
		},
		fields: {
			title: {
				'en-CA': 'page link title',
				'fr-CA': 'page link title fr',
			},
			page: {
				'en-CA': {
					sys: {
						id: 'about-us-page',
					},
					fields: {
						slug: {
							'en-CA': 'some slug',
						},
					},
				},
			},
			hash: {
				'en-CA': 's',
			},
		},
	},
	'some-external-link': {
		sys: {
			id: 'some-external-link',
			space: {},
			contentType: {
				sys: {
					id: 'externalLink',
				},
			},
		},
		fields: {
			title: {
				'en-CA': 'External link text',
				'fr-CA': 'External link text fr',
			},
			accessibleLabel: {
				'en-CA': 'some accessibility text',
			},
			url: {
				'en-CA': 'https://test.com',
				'fr-CA': 'https://test.com/fr',
			},
		},
	},
	'lang-toggle-key-value': {
		sys: {
			id: 'lang-toggle-key-value',
			space: {},
			contentType: {
				id: 'keyValue',
			},
		},
		fields: {
			slug: {
				'en-CA': 'lang-toggle-slug',
			},
			value: {
				'en-CA': 'toggle English',
				'fr-CA': 'toggle French',
			},
		},
	},
	'rich-text-key-value': {
		sys: {
			id: 'rich-text-key-value',
			space: {},
			contentType: {
				id: 'keyRichText',
			},
		},
		fields: {
			slug: {
				'en-CA': 'rich-text-key-slug',
			},
			richText: {
				'en-CA': {
					nodeType: 'document',
					data: {},
					content: [
						{
							nodeType: 'paragraph',
							data: {},
							content: [{ nodeType: 'text', data: {}, value: 'some text value' }],
						},
					],
				},
			},
		},
	},
	'some-complex-block-1': {
		sys: {
			id: 'some-complex-block-1',
			space: {},
			contentType: {
				id: 'complexBlock',
			},
		},
		fields: {
			title: {
				'en-CA': 'complex block title',
				'fr-CA': 'complex block title - fr',
			},
			body: {
				'en-CA': {
					nodeType: 'document',
					data: {},
					content: [
						{
							nodeType: 'paragraph',
							data: {},
							content: [
								{ nodeType: 'text', data: {}, value: 'some paragraph in the complex block' },
							],
						},
					],
				},
			},
		},
	},
	'some-complex-block-2': {
		sys: {
			id: 'some-complex-block-2',
			space: {},
			contentType: {
				id: 'complexBlock',
			},
		},
		fields: {
			title: {
				'en-CA': 'complex block 2 title',
				'fr-CA': 'complex block 2 title - fr',
			},
			body: {
				'en-CA': {
					nodeType: 'document',
					data: {},
					content: [
						{
							nodeType: 'paragraph',
							data: {},
							content: [
								{ nodeType: 'text', data: {}, value: 'some paragraph in the complex block 2' },
							],
						},
					],
				},
			},
		},
	},
	'some-block-group': {
		sys: {
			id: 'some-block-group',
			space: {},
			contentType: {
				id: 'modularLayout',
			},
		},
		fields: {
			blocks: {
				'en-CA': [
					{
						sys: {
							type: 'Link',
							linkType: 'Entry',
							id: 'some-complex-block-1',
						},
					},
					{
						sys: {
							type: 'Link',
							linkType: 'Entry',
							id: 'some-complex-block-2',
						},
					},
				],
			},
		},
	},
};

export const mockSiteEntry = {
	sys: {
		space: {
			sys: {
				id: 'spaceId',
			},
		},
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
		slug: {
			'en-CA': 'site-slug',
		},
		siteLogo: {
			'en-CA': {
				fields: {
					file: {
						'en-CA': {
							url: '/test-img.png',
							fileName: 'filename.png',
							contentType: 'image/png',
							details: {
								image: {
									height: 10,
									width: 10,
								},
							},
						},
					},
					title: {
						'en-CA': 'image title',
					},
				},
			},
		},
		favicon: {
			'en-CA': {
				sys: {
					id: 'favicon.png',
				},
				fields: {
					file: {
						'en-CA': {
							url: '/favicon.png',
							fileName: 'favicon.png',
							contentType: 'image/png',
							details: {
								image: {
									height: 10,
									width: 10,
								},
							},
						},
					},
				},
			},
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
		keyValues: {
			'en-CA': [
				{
					sys: {
						type: 'Link',
						linkType: 'Entry',
						id: 'lang-toggle-key-value',
					},
				},
				{
					sys: {
						type: 'Link',
						linkType: 'Entry',
						id: 'rich-text-key-value',
					},
				},
			],
		},
		navigation: {
			'en-CA': [
				{
					sys: {
						type: 'Link',
						linkType: 'Entry',
						id: 'about-us-page-link',
					},
				},
				{
					sys: {
						type: 'Link',
						linkType: 'Entry',
						id: 'some-external-link',
					},
				},
			],
		},
	},
};

export const mockLinkedAssets = {
	'test-img.png': {
		sys: {
			id: 'test-img.png',
		},
		fields: {
			title: {
				'en-CA': 'some title',
				'fr-CA': 'some title fr',
			},
			description: {
				'en-CA': 'asset description',
				'fr-CA': 'asset description fr',
			},
			file: {
				'en-CA': {
					url: '/test-img.png',
					fileName: 'filename.png',
					contentType: 'image/png',
					details: {
						image: {
							height: 20,
							width: 20,
						},
					},
				},
			},
		},
	},
	'test-img2.png': {
		sys: {
			id: 'test-img2.png',
		},
		fields: {
			// no description - used to test image components
			file: {
				'en-CA': {
					url: '/test-img2.png',
					fileName: 'filename2.png',
					contentType: 'image/png',
					details: {
						image: {
							height: 20,
							width: 20,
						},
					},
				},
			},
		},
	},
	'favicon.png': {
		sys: {
			id: 'favicon.png',
		},
		fields: {
			file: {
				'en-CA': {
					url: '/favicon.png',
					fileName: 'favicon.png',
					contentType: 'image/png',
					details: {
						image: {
							height: 20,
							width: 20,
						},
					},
				},
			},
		},
	},
};

export const mockPreviewAssets = {
	'test-img.png': { url: 'data:image/png;base64,someUriData' },
	'test-img2.png': { url: 'data:image/png;base64,someUriData2' },
};

export const mockKeyValues = {
	'lang-toggle-slug': {
		sys: {
			id: 'lang-toggle-key-value',
			space: {},
			contentType: {
				id: 'keyValue',
			},
		},
		fields: {
			slug: {
				'en-CA': 'lang-toggle-slug',
			},
			value: {
				'en-CA': 'toggle English',
				'fr-CA': 'toggle French',
			},
		},
	},
	'rich-text-key-slug': {
		sys: {
			id: 'rich-text-key-value',
			space: {},
			contentType: {
				id: 'keyRichText',
			},
		},
		fields: {
			slug: {
				'en-CA': 'rich-text-key-slug',
			},
			richText: {
				'en-CA': {
					nodeType: 'document',
					data: {},
					content: [
						{
							nodeType: 'paragraph',
							data: {},
							content: [{ nodeType: 'text', data: {}, value: 'some text value' }],
						},
					],
				},
			},
		},
	},
};

export const mockLogo = {
	primary: imageDataMock('image/png'),
	primaryAccessibleText: 'Accessible description of logo',
	alt: imageDataMock('image/svg+xml'),
	altAccessibleText: 'Accessible description of logo',
};

export const mockHeaderNav = [
	{
		type: 'link',
		link: linkDataMock('pageLink', 'nav-id-1'),
		text: 'Nav 1',
		accessibleText: 'Nav 1 accessible text',
	},
	{
		type: 'link',
		link: linkDataMock('pageLink', 'nav-id-2'),
		text: 'Nav 2',
		accessibleText: 'Nav 2 accessible text',
	},
];

export const mockFooterNav = [
	{
		type: 'link',
		link: linkDataMock('pageLink', 'footer-nav-id-1'),
		text: 'Nav 1',
		accessibleText: 'Nav 1 accessible text',
	},
];

export const mockLangSwitchLink = {
	href: '/some-href',
	asPath: '/some-path',
	text: 'change lang',
	accessibleText: 'Switch lang to EN',
};

export const mockSkipNavText = 'Skip to main content';

function isLink(field) {
	return field && field.sys && field.sys.type === 'Link';
}

export const mockFieldOrFallback = jest.fn((field, fieldLang = 'en-CA') => {
	if (isLink(field)) {
		if (field.sys.linkType === 'Entry') return mockLinkedEntries[field.sys.id];
		if (field.sys.linkType === 'Asset') return mockLinkedAssets[field.sys.id];
	}

	const fieldValue = field ? field[fieldLang] || field['en-CA'] : undefined;

	if (isLink(fieldValue)) {
		if (fieldValue.sys.linkType === 'Entry') return mockLinkedEntries[fieldValue.sys.id];
		if (fieldValue.sys.linkType === 'Asset') return mockLinkedAssets[fieldValue.sys.id];
	}

	return fieldValue;
});

export const mockRichText = {
	'without-markings': {
		data: {},
		content: [
			{
				data: {},
				content: [
					{
						data: {},
						marks: [],
						value: 'Text without markings italicized',
						nodeType: 'text',
					},
				],
				nodeType: 'paragraph',
			},
		],
		nodeType: 'document',
	},
	'with-markings': {
		data: {},
		content: [
			{
				data: {},
				content: [
					{
						data: {},
						marks: [{ type: 'bold' }],
						value: 'Bold Text',
						nodeType: 'text',
					},
					{ data: {}, marks: [], value: ' for ', nodeType: 'text' },
					{
						data: {},
						marks: [{ type: 'italic' }],
						value: 'Italic Text',
						nodeType: 'text',
					},
				],
				nodeType: 'paragraph',
			},
			{
				nodeType: 'unordered-list',
				content: [
					{
						nodeType: 'list-item',
						data: {},
						content: [
							{
								nodeType: 'paragraph',
								content: [
									{
										nodeType: 'text',
										value: 'point 1',
										marks: [],
										data: {},
									},
								],
								data: {},
							},
						],
					},
					{
						nodeType: 'list-item',
						content: [
							{
								nodeType: 'paragraph',
								content: [
									{
										nodeType: 'text',
										value: 'point 2',
										marks: [],
										data: {},
									},
								],
								data: {},
							},
						],
						data: {},
					},
				],
				data: {},
			},
		],
		nodeType: 'document',
	},
	'with-link': {
		data: {},
		content: [
			{
				data: {},
				content: [
					{
						data: {},
						marks: [{ type: 'bold' }],
						value: 'We bring marketing sites to life',
						nodeType: 'text',
					},
					{ data: {}, marks: [], value: ' for ', nodeType: 'text' },
					{
						data: {},
						marks: [{ type: 'italic' }],
						value: 'brands',
						nodeType: 'text',
					},
					{
						data: {},
						marks: [],
						value: ' across the organization. Learn more ',
						nodeType: 'text',
					},
					{
						data: {
							target: {
								'en-CA': {
									sys: {
										id: 'about-us-page-link',
										contentType: {
											sys: {
												id: 'externalLink',
											},
										},
									},
									fields: {
										title: {
											'en-CA': 'mock link title italicized',
										},
										url: {
											'en-CA': 'www.site.com',
										},
										accessibleLabel: {
											'en-CA': 'accessible text ',
										},
									},
								},
							},
						},
						content: [],
						nodeType: 'embedded-entry-inline',
					},
					{ data: {}, marks: [], value: '', nodeType: 'text' },
				],
				nodeType: 'paragraph',
			},
			{
				data: {},
				content: [{ data: {}, marks: [], value: '', nodeType: 'text' }],
				nodeType: 'paragraph',
			},
			{
				data: {},
				content: [{ data: {}, marks: [], value: '', nodeType: 'text' }],
				nodeType: 'paragraph',
			},
		],
		nodeType: 'document',
	},
};
