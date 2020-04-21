import React from 'react';
import { shallow } from 'enzyme';
import AnimatedMediaPlayer from '../index';

describe('<AnimatedMediaPlayer />', () => {
	it('renders correctly', () => {
		// https://github.com/facebook/jest/issues/7802
		// using .debug() instead of adding dependency on enzyme-to-json for now
		expect(
			shallow(
				<AnimatedMediaPlayer mp4Url="video.mp4" posterUrl="poster.jpg" description="A video" />
			).debug()
		).toMatchSnapshot();
	});
});
