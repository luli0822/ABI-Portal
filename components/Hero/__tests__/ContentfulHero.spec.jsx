import React from 'react';
import { shallow } from 'enzyme';
import HomeHero from '../index';
import { mockPushCustomLinkEvent } from '../../../.storybook/analyticsContext';

jest.mock('react', () => {
	const ActualReact = require.requireActual('react');
	return {
		...ActualReact,
		useContext: () => ({
			pushCustomLinkEvent: mockPushCustomLinkEvent,
		}),
	};
});
describe('<HomeHero />', () => {
	it('renders correctly', () => {
		const props = {
			content: {
				title: 'some title',
				body: {},
				primaryLink: {},
				primaryLinkText: 'some text',
				secondaryLink: {},
				secondaryLinkText: 'some text',
			},
			isFirstChild: true,
		};
		// https://github.com/facebook/jest/issues/7802
		// using .debug() instead of adding dependency on enzyme-to-json for now
		// eslint-disable-next-line react/jsx-props-no-spreading
		expect(shallow(<HomeHero {...props} />).debug()).toMatchSnapshot();
	});
});
