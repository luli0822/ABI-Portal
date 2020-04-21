import { imagePNGMock } from '../../../.storybook/SiteData';
// eslint-disable-next-line import/prefer-default-export

export const primaryMedia = {
	primaryMedia: imagePNGMock,
	primaryLinkAccessibleText: `Image Accessible Text`,
};

export const defaultBlocks = [
	{
		contentType: 'Complex Block',
		id: 'tileBlock1',
		title: 'Tile 1',
		body: {
			// NOTE: For richText body, the CustomDoc component will render the content from values:[] field to eliminate the complex mapping for body.content fields to read the content.
			// For paragraph - {type: 'paragraph' , value: ''}, for list items {type: 'list', value: ['', '']}
			values: [
				{
					type: 'paragraph',
					value: 'Tile 1 Body',
				},
			],
			nodeType: 'document',
			data: {},
			content: [
				{
					nodeType: 'paragraph',
					data: {},
					content: [
						{
							nodeType: 'text',
							value: 'Tile 1 Body',
							data: {},
							marks: [],
						},
					],
				},
			],
		},
		...primaryMedia,
	},
	{
		contentType: 'Complex Block',
		id: 'tileBlock2',
		title: 'Tile 2',
		body: {
			// NOTE: For richText body, the CustomDoc component will render the content from values:[] field to eliminate the complex mapping for body.content fields to read the content.
			// For paragraph - {type: 'paragraph' , value: ''}, for list items {type: 'list', value: ['', '']}
			values: [
				{
					type: 'paragraph',
					value: 'Tile 2 Body',
				},
			],
			nodeType: 'document',
			data: {},
			content: [
				{
					nodeType: 'paragraph',
					data: {},
					content: [
						{
							nodeType: 'text',
							value: 'Tile 2 Body',
							data: {},
							marks: [],
						},
					],
				},
			],
		},
		...primaryMedia,
	},
];

export const defaultContent = {
	contentType: 'Block Group',
	title: 'What can we build for you?',
	body: {
		values: [
			{
				type: 'paragraph',
				value: 'From microsites to interactive quizzes - we know digital experience.',
			},
		],
		nodeType: 'document',
		data: {},
		content: [
			{
				nodeType: 'paragraph',
				data: {},
				content: [
					{
						nodeType: 'text',
						value: 'From microsites to interactive quizzes - we know digital experience.',
						data: {},
						marks: [],
					},
				],
			},
		],
	},
};

// Default props without links
export const defaultProps = {
	content: {
		...defaultContent,
		blocks: defaultBlocks,
	},
};
