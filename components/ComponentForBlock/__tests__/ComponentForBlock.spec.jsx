import React from 'react';
import { shallow } from 'enzyme';
import ComponentForBlock from '../index';
import mockPushDataLayer from '../../../contentful/__mocks__/analyticsContext';

jest.mock('react', () => {
	const linkedEntries = {
		'page-link-id': {
			sys: {
				id: 'page-link-id',
				contentType: {
					sys: {
						id: 'pageLink',
					},
				},
			},
			fields: {
				title: {
					'en-CA': 'Page Link Title EN',
				},
				accessibleText: {
					'en-CA': 'Page Link Accessible Text EN',
				},
			},
		},
		'complex-block-id': {
			fields: {
				title: {
					'en-CA': 'Complex Block Title EN',
				},
				primaryLink: {
					'en-CA': {
						sys: {
							id: 'page-link-id',
							type: 'Link',
							linkType: 'Entry',
						},
					},
				},
			},
			sys: {
				id: 'complex-block-id',
				contentType: {
					sys: {
						id: 'complexBlock',
					},
				},
			},
		},
		'block-group-id': {
			fields: {
				title: {
					'en-CA': 'Complex Block Title EN',
				},
				blocks: {
					'en-CA': [
						{
							sys: {
								id: 'complex-block-id',
								type: 'Link',
								linkType: 'Entry',
							},
						},
					],
				},
			},
			sys: {
				id: 'block-group-id',
				contentType: {
					sys: {
						id: 'blockGroup',
					},
				},
			},
		},
	};

	const linkedAssets = {};

	// TODO - find better way to mock fieldOrFallback - this is just copy/paste from <SiteData />
	function isLink(field) {
		return field && field.sys && field.sys.type === 'Link';
	}

	function fieldOrFallback(field, fieldLang) {
		if (isLink(field)) {
			if (field.sys.linkType === 'Entry') return linkedEntries[field.sys.id];
			if (field.sys.linkType === 'Asset') return linkedAssets[field.sys.id];
		}

		const fieldValue = field ? field[fieldLang] || field['en-CA'] : undefined;

		if (isLink(fieldValue)) {
			if (fieldValue.sys.linkType === 'Entry') return linkedEntries[fieldValue.sys.id];
			if (fieldValue.sys.linkType === 'Asset') return linkedAssets[fieldValue.sys.id];
		}

		return fieldValue;
	}

	const ActualReact = require.requireActual('react');

	return {
		...ActualReact,
		useContext: () => ({
			fieldOrFallback,
			lang: 'en-CA',
			pushDataLayer: mockPushDataLayer,
		}),
	};
});

const complexBlockProps = {
	block: {
		sys: {
			id: 'complex-block-id',
			type: 'Link',
			linkType: 'Entry',
		},
	},
	isFirstChild: true,
};

const blockGroupProps = {
	block: {
		sys: {
			id: 'block-group-id',
			type: 'Link',
			linkType: 'Entry',
		},
	},
	isFirstChild: true,
};

describe('<ComponentForBlock />', () => {
	it('renders Complex Block', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		const component = shallow(<ComponentForBlock {...complexBlockProps} />);
		expect(component.debug()).toMatchSnapshot();
	});
	it('renders correct props for Complex Block', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		const component = shallow(<ComponentForBlock {...complexBlockProps} />);
		expect(component.props()).toMatchSnapshot();
	});
	it('renders Block Group', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		expect(shallow(<ComponentForBlock {...blockGroupProps} />).debug()).toMatchSnapshot();
	});
	it('renders correct props for Block Group', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		const component = shallow(<ComponentForBlock {...blockGroupProps} />);
		expect(component.props()).toMatchSnapshot();
	});
});
