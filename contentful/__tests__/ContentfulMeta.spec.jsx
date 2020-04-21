import React from 'react';
import { shallow } from 'enzyme';
import ContentfulMeta from '../ContentfulMeta';
import {
	mockLang,
	mockPathMap,
	mockLinkedEntries,
	mockLinkedAssets,
	mockSiteEntry,
	mockFieldOrFallback,
} from '../__mocks__/SiteDataContext';
import { mockPageMeta, mockSiteMeta, mockNoFavicon } from '../__mocks__/ContentfulMeta';

const mockSiteEntryFn = jest.fn();
mockSiteEntryFn.mockReturnValue(mockSiteEntry);

jest.mock('react', () => {
	const ActualReact = require.requireActual('react');
	return {
		...ActualReact,
		useContext: () => ({
			pathMap: mockPathMap,
			fieldOrFallback: mockFieldOrFallback,
			linkedEntries: mockLinkedEntries,
			linkedAssets: mockLinkedAssets,
			siteEntry: mockSiteEntryFn(),
			lang: mockLang,
		}),
	};
});

describe('<ContentfulMeta />', () => {
	it('renders page title correctly', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		expect(shallow(<ContentfulMeta {...mockPageMeta} />).debug()).toMatchSnapshot();
	});
	it('renders metaTitle prop correctly', () => {
		expect(
			// eslint-disable-next-line react/jsx-props-no-spreading
			shallow(<ContentfulMeta {...mockSiteMeta} metaTitle="meta title" />).debug()
		).toMatchSnapshot();
	});
	it('renders correctly with icons', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		expect(shallow(<ContentfulMeta {...mockSiteMeta} />).debug()).toMatchSnapshot();
	});
	it('renders correctly with no icons', () => {
		mockSiteEntryFn.mockReturnValue(mockNoFavicon);
		// eslint-disable-next-line react/jsx-props-no-spreading
		expect(shallow(<ContentfulMeta {...mockSiteMeta} />).debug()).toMatchSnapshot();
	});
});
