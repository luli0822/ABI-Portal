// Use this file to mock SiteDataContext and to use across stories and unit tests
import pngImage from './static/png-example.png';
import textSVGImage from './static/page-hero-text.svg';
import svgImage from './static/svg-example.svg';

// Mock contentful siteData
export const SiteData = {
	pathMap: {
		'/en_CA': {
			page: "/",
			query:{
				lang: "en-CA", pageId: "page-id"
			} 
		},
	},
	linkedAssets: {
		// PNG Image asset link
		'asset-id-1': {
			sys: {
				type: 'Asset',
				id: 'asset-id-1'
			},
			field: {
				title: {
					'en-CA': 'image title text'
				},
				file: {
					'en-CA': {
						url: pngImage,
						details: {
							size: 150795,
							image: {
								width: 300,
								height: 300
							}
						},
						fileName: "png-example.png",
						contentType: "image/png"
					}
				}

			}
		},
		// SVG Image asset link
		'asset-id-2': {
			sys: {
				type: 'Asset',
				id: 'asset-id-2'
			},
			field: {
				title: {
					'en-CA': 'image title text'
				},
				file: {
					'en-CA': {
						url: svgImage,
						details: {
							size: 150795,
							image: {
								width: 300,
								height: 300
							}
						},
						fileName: "svg-example.svg",
						contentType: "image/svg+xml"
					}
				}

			}
		}
	},
	previewAssets: {
		'asset-id-1':{
			 url: 'data:image/png;base64,someUriData', meta: { width: 300, height: 130 } 
		},
		// svg image preview asset
		'asset-id-2':{
			url: 'data:image/svg+xml;base64,someUriData', meta: { width: 	500, height: 120 } 
	 }
	},
	// keyValues: {},
	lang: 'en-CA',
	fieldOrFallback: (field, lang = 'en-CA') => (
		field && field[lang] ? field[lang] : undefined
	)
};

// A method to build Link data structure
const linkDataMock = (type) => ({
	sys: {
		id: 'page-link-id',
		contentType: {
			sys: {
				type: 'Link',
				linkType: 'ContentType',
				id: `${type}`,
			},
		},
	},
	fields: {
		title: {
			'en-CA': 'Link Text',
		},
		accessibleLabel: {
			'en-CA': 'Link accessible Text',
		},
		url: type === 'externalLink' ? {'en-CA': 'https://loblawdigital.co'} : undefined,
		page: type === 'pageLink' ? {
			'en-CA': {
				sys: {
					type: 'Link',
					linkType: 'Entry',
					id: 'page-id',
				},
			},
		} : undefined
	},
})

// Use this for pageLink structure mock
export const pageLinkMock = linkDataMock('pageLink')

// Use this externalLink structure mock
export const externalLinkMock = linkDataMock('externalLink')

// A method to build Media/image data structure
const imageDataMock = (imageUrl, type) => ({
	sys: {
		type: "Asset",
		id: type === 'image/png' ? "asset-id-1" : "asset-id-2" ,
	},
	fields: {
		title: {
			'en-CA': 'Image Title Text'
		},
		description: {
			'en-CA': 'Image description Text'
		},
		file: {
			'en-CA': {
				url: imageUrl,
				details: {
					size: 150795, 
					image: {
						width: 300,
						height: 300
					}
				},
				fileName: "png-example.png",
				contentType: type
			}
		}
	}
})

// You can add the needed image mocks for your porject
// Use this for PNG image structure mock
export const imagePNGMock = imageDataMock(pngImage, 'image/png')

// Use this for SVG image structure mock
export const textSVGMock = imageDataMock(textSVGImage, 'image/svg+xml')

// Use this for SVG logo image structure mock
export const logoSVGMock = imageDataMock(svgImage, 'image/svg+xml')

// Mock useNavigation data
export const navData = {
	logo: {
		primary: logoSVGMock,
		primaryAccessibleText: 'Accessible description of logo',
		alt: textSVGMock,
		altAccessibleText: 'Accessible description of logo'
	},
	langSwitchLink: {
		href: '/some-href',
		asPath: '/some-path',
		text: 'change lang',
		accessibleText: 'Switch lang to EN',
	},
	skipNavText: 'Skip to main content',
	headerNav: [
		{
			type: 'link',
			link: pageLinkMock,
			text: 'Home Page',
			accessibleText: undefined
		},
		{
			type: 'link',
			link: externalLinkMock,
			text: 'External Link',
			accessibleText: undefined
		},

	],
	footerNav: [
		{
			type: 'group',
			text: 'Link group',
			accessibleText: undefined,
			items: [
				{
					type: 'link',
					link: pageLinkMock,
					text: 'link 1',
					accessibleText: undefined
				},
				{
					type: 'link',
					link: externalLinkMock,
					text: 'link 2',
					accessibleText: undefined
				},
			]
		}
	]
}