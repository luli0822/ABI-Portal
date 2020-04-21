import React from 'react';
import { mount } from 'enzyme';
import TextReplacement from '../TextReplacement';

import { mockLang, mockFieldOrFallback } from '../__mocks__/SiteDataContext';

// Mock React useContext
jest.mock('react', () => {
	const ActualReact = require.requireActual('react');
	return {
		...ActualReact,
		useContext: () => ({
			fieldOrFallback: mockFieldOrFallback,
			lang: mockLang,
		}),
	};
});

const mockProps = {
	text: 'This is just regularText',
};

const mockPropsWithReplacements = {
	text: 'This is a tradmark ™ and this worked is italicized',
	replacements: {
		'™': <sup className="sup">™</sup>,
		italicized: <span className="i">italicized</span>,
	},
};

describe('<ContentfulImage />', () => {
	it('Renders just text with no markup', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		const component = mount(<TextReplacement {...mockProps} />);

		expect(component.debug()).toMatchSnapshot();
	});
	it('Renders text with correct markup added', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		const component = mount(<TextReplacement {...mockPropsWithReplacements} />);

		expect(component.debug()).toMatchSnapshot();
	});
});
