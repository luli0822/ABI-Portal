import React from 'react';
import { shallow } from 'enzyme';
import InlineHero from '../index';

describe('<InlineHero />', () => {
	const props = {
		content: {
			primaryMedia: {},
			title: 'some title',
			body: {},
			primaryLink: {},
			primaryLinkText: 'some text',
			secondaryLink: {},
			secondaryLinkText: 'some text',
		},
		isFirstChild: false,
	};
	it('renders correctly', () => {
		// https://github.com/facebook/jest/issues/7802
		// using .debug() instead of adding dependency on enzyme-to-json for now
		// eslint-disable-next-line react/jsx-props-no-spreading
		expect(shallow(<InlineHero {...props} />).debug()).toMatchSnapshot();
	});
});
