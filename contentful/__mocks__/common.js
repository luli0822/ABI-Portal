// A method to build Link data structure
export const linkDataMock = (type, linkId = 'link-id-1') => ({
	sys: {
		id: linkId,
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
		url: type === 'externalLink' ? { 'en-CA': 'https://loblawdigital.co' } : undefined,
		page:
			type === 'pageLink'
				? {
						'en-CA': {
							sys: {
								type: 'Link',
								linkType: 'Entry',
								id: 'site-home-page',
							},
						},
				  }
				: undefined,
	},
});

// Use this for pageLink structure mock
export const pageLinkMock = linkDataMock('pageLink');

// Use this externalLink structure mock
export const externalLinkMock = linkDataMock('externalLink');

// A method to build Media/image data structure
export const imageDataMock = type => ({
	sys: {
		type: 'Asset',
		id: type === 'image/png' ? 'asset-id-1' : 'asset-id-2',
	},
	fields: {
		title: {
			'en-CA': 'Image Title Text',
		},
		description: {
			'en-CA': 'Image description Text',
		},
		file: {
			'en-CA': {
				url: 'image-file-url.png',
				details: {
					size: 150795,
					image: {
						width: 300,
						height: 300,
					},
				},
				fileName: 'png-example.png',
				contentType: type,
			},
		},
	},
});
