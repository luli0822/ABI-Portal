import React from 'react';
import { shallow } from 'enzyme';
import Image from '../index';

jest.mock('../../../images/responsive-images');

describe('<Image />', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Image src="TestComponent/test.png" alt="alt-text" />);
		// https://github.com/facebook/jest/issues/7802
		// using .debug() instead of adding dependency on enzyme-to-json for now
		expect(wrapper.debug()).toMatchSnapshot();
	});

	it('passes a className correctly', () => {
		const wrapper = shallow(
			<Image src="TestComponent/test.png" alt="alt-text" className="test-class-name" />
		);

		expect(wrapper.find('img.test-class-name').length).toBe(1);
	});
});
