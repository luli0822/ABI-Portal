/* eslint-disable no-unused-vars */

import React from 'react';
import { shallow } from 'enzyme';
import Header from '../index';
import { navData } from '../../../.storybook/SiteData';

const props = {
	skipNavText: navData.skipNavText,
	langSwitchLink: navData.langSwitchLink,
	navigationEntries: navData.headerNav,
	pushCustomLinkEvent: jest.fn(),
};

describe('<Header />', () => {
	it('renders correctly', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		expect(shallow(<Header {...props} />).debug()).toMatchSnapshot();
	});
});
