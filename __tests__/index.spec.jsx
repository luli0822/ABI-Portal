/* eslint-disable no-unused-vars */
/* eslint-env jest */

import { shallow, mount } from 'enzyme';
import React from 'react';
import Index from '../pages/index';

import {
	mockLang,
	mockPathMap,
	mockLinkedEntries,
	mockLinkedAssets,
	mockSiteEntry,
	mockFieldOrFallback,
	mockLangSwitchLink,
	mockHeaderNav,
	mockSkipNavText,
} from '../contentful/__mocks__/SiteDataContext';

import {
	mockPushCustomLinkEvent,
	mockUsePageViewEvent,
} from '../contentful/__mocks__/analyticsContext';

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
			langSwitchLink: mockLangSwitchLink,
			headerNav: mockHeaderNav,
			skipNavText: mockSkipNavText,
			lang: mockLang,
			pushCustomLinkEvent: mockPushCustomLinkEvent,
			usePageViewEvent: mockUsePageViewEvent,
		}),
	};
});

let wrapper;

beforeEach(() => {
	wrapper = shallow(<Index pageId="site-home-page" />);
});

describe('Loop page', () => {
	it('renders correctly', () => {
		// https://github.com/facebook/jest/issues/7802
		// using .debug() instead of adding dependency on enzyme-to-json for now
		expect(wrapper.debug()).toMatchSnapshot();
	});
});
