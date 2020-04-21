import React from 'react';
import { shallow } from 'enzyme';
import Meta from '../index';
import {
	mockLang,
	mockPathMap,
	mockLinkedEntries,
	mockLinkedAssets,
	mockSiteEntry,
	mockFieldOrFallback,
} from '../../../contentful/__mocks__/SiteDataContext';

jest.mock('react', () => {
	const ActualReact = require.requireActual('react');
	return {
		...ActualReact,
		useContext: () => ({
			pathMap: mockPathMap,
			fieldOrFallback: mockFieldOrFallback,
			linkedEntries: mockLinkedEntries,
			linkedAssets: mockLinkedAssets,
			siteEntry: mockSiteEntry,
			lang: mockLang,
		}),
	};
});

const props = {
	pageId: 'site-home-page',
	siteDomain: '//www.domain.ca',
};

describe('<Meta />', () => {
	it('renders correctly', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		expect(shallow(<Meta {...props} />).debug()).toMatchSnapshot();
	});
});
