import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../index';
import { defaultProps } from '../__mocks__/mockProps';

describe('<Footer />', () => {
	it('renders correctly', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		expect(shallow(<Footer {...defaultProps} />).debug()).toMatchSnapshot();
	});
});
