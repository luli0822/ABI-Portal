/* eslint-disable no-unused-vars */

import React from 'react';
import { shallow } from 'enzyme';
import LanguageSwitch from '../index';
import { navData } from '../../../.storybook/SiteData';

const props = {
	linkData: navData.langSwitchLink,
	className: 'some-class-name',
};

describe('<LanguageSwitch />', () => {
	it('renders correctly', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		expect(shallow(<LanguageSwitch {...props} />).debug()).toMatchSnapshot();
	});
});
