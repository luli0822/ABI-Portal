import React from 'react';
import { shallow } from 'enzyme';
import SkipNav from '../index';

describe('<SkipNav />', () => {
	it('renders correctly', () => {
		expect(shallow(<SkipNav skipToLinkText="Skip to main content" />).debug()).toMatchSnapshot();
	});
});
