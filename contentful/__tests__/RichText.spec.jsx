import React from 'react';
import { mount } from 'enzyme';
import RichText from '../RichText';

import {
	mockLang,
	mockPathMap,
	mockLinkedEntries,
	mockLinkedAssets,
	mockFieldOrFallback,
	mockRichText,
} from '../__mocks__/SiteDataContext';

// Mock React useContext
jest.mock('react', () => {
	const ActualReact = require.requireActual('react');
	return {
		...ActualReact,
		useContext: () => ({
			pathMap: mockPathMap,
			fieldOrFallback: mockFieldOrFallback,
			linkedEntries: mockLinkedEntries,
			linkedAssets: mockLinkedAssets,
			lang: mockLang,
		}),
	};
});

const mockProps = {
	replacements: {
		italicized: <span className="i">italicized</span>,
	},
};

describe('<RichText /> ', () => {
	it('renders correctly', () => {
		const component = mount(<RichText document={mockRichText['without-markings']} />);

		expect(component.debug()).toMatchSnapshot();
	});
	it('renders marks correctly with correct classes', () => {
		const component = mount(<RichText document={mockRichText['with-markings']} />);

		expect(component.debug()).toMatchSnapshot();
	});
	it('renders correctly with contentful link', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		const component = mount(<RichText document={mockRichText['with-link']} {...mockProps} />);

		expect(component.debug()).toMatchSnapshot();
	});
	it('renders correctly with Text Replacement markup', () => {
		const component = mount(
			// eslint-disable-next-line react/jsx-props-no-spreading
			<RichText document={mockRichText['without-markings']} {...mockProps} />
		);

		expect(component.debug()).toMatchSnapshot();
	});
	// it('Check getClient() and fetchSiteData() will return the expected site Data from contentful ', async () => {
	// 	// TODO: test1: create snapshot that renders rich text properly. Import context mocks.
	// 	// TODO: test2: Check mounting Block paragraph richText (using bold/italic). Check the proper classes are attached to element
	// 	// TODO: test3: Check mounting INLINES.EMBEDDED_ENTRY (contentfulLink). Check the proper classes are attached to element
	// 	// TODO: test4: Check mounting list items. Check the proper classes are attached to element

	// 	expect(1).toBe(1);
	// });
});
