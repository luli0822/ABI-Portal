import React from 'react';
import { shallow } from 'enzyme';
import ContentfulLink from '../ContentfulLink';
import {
	mockLang,
	mockPathMap,
	mockLinkedEntries,
	mockFieldOrFallback,
} from '../__mocks__/SiteDataContext';

// Mock React useContext
jest.mock('react', () => {
	const ActualReact = require.requireActual('react');
	return {
		...ActualReact,
		useContext: () => ({
			pathMap: mockPathMap,
			lang: mockLang,
			fieldOrFallback: mockFieldOrFallback,
		}),
	};
});

const mockPageLinkEntry = mockLinkedEntries['about-us-page-link'];

const mockExternalLinkEntry = mockLinkedEntries['some-external-link'];

describe('<ContentfulLink />', () => {
	it('Renders a pageLink correctly - snapshot', () => {
		const component = shallow(
			<ContentfulLink linkEntry={mockPageLinkEntry}>Page Link Text</ContentfulLink>
		);
		expect(component.debug()).toMatchSnapshot();
	});

	it('Check a next.js Link is rendered for page link', () => {
		const component = shallow(
			<ContentfulLink linkEntry={mockPageLinkEntry}>Page Link Text</ContentfulLink>
		);

		expect(component.find('Link[href]')).toHaveLength(1);
		expect(component.find('a')).toHaveLength(1);
		expect(component.find('a[href]')).toHaveLength(0);
	});

	it('Renders an external link correctly - snapshot', () => {
		const component = shallow(
			<ContentfulLink linkEntry={mockExternalLinkEntry}>Externsl link text</ContentfulLink>
		);
		expect(component.debug()).toMatchSnapshot();
	});

	it('Check an <a> tag is rendered on enternal link', () => {
		const component = shallow(
			<ContentfulLink linkEntry={mockExternalLinkEntry}>External link text</ContentfulLink>
		);
		// For external link, there is an <a> tag and no next Link
		expect(component.find('a[href]')).toHaveLength(1);
		expect(component.find('Link')).toHaveLength(0);
	});
});
