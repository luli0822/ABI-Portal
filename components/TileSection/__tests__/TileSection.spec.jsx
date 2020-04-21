import React from 'react';
import { shallow } from 'enzyme';
import TileSection from '../index';
import { defaultProps } from '../__mocks__/mockProps';

describe('<TileSection />', () => {
	it('renders correctly', () => {
		// https://github.com/facebook/jest/issues/7802
		// using .debug() instead of adding dependency on enzyme-to-json for now
		// eslint-disable-next-line react/jsx-props-no-spreading
		expect(shallow(<TileSection {...defaultProps} />).debug()).toMatchSnapshot();
	});
});
