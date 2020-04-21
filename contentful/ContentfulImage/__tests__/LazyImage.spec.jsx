import React from 'react';
import { mount } from 'enzyme';

// import useOnScreen from '../ContentfulImage/useOnScreen';
import {
	mockLang,
	mockLinkedAssets,
	mockPreviewAssets,
	mockFieldOrFallback,
} from '../../__mocks__/SiteDataContext';

// Mock React useContext

jest.mock('react', () => {
	const ActualReact = require.requireActual('react');
	return {
		...ActualReact,
		useContext: () => ({
			fieldOrFallback: mockFieldOrFallback,
			lang: mockLang,
			previewAssets: mockPreviewAssets,
		}),
	};
});

const mockImageAsset = mockLinkedAssets['test-img.png'];

const lazyloadProps = {
	asset: mockImageAsset,
	alt: 'mock-alt',
	lazyload: true,
	cover: true,
};

// eslint-disable-next-line import/first
import ContentfulImage from '..';

afterEach(() => {
	mockFieldOrFallback.mockClear();
});

// Running this test here instead of ContentfulImage.spec.jsx because mocking useOnScreen causes a react ref to be undefined.
describe('<ContentfulImage> and <LazyImage>', () => {
	it('renders expected sources', () => {
		// eslint-disable-next-line react/jsx-props-no-spreading
		const component = mount(<ContentfulImage {...lazyloadProps}>Page Link Text</ContentfulImage>);

		// check <picture>, <source> and <img> tags exists
		expect(component.find('picture')).toHaveLength(1);
		expect(component.find('source')).toHaveLength(1);
		expect(component.find('img')).toHaveLength(1);
		expect(component.find('source[type="image/webp"]')).toHaveLength(1);

		// Check that the image source will be coming from the fieldOrFallback function call.
		expect(component.find(`img[src='/test-img.png?w=100']`)).toHaveLength(1);
		expect(component.debug()).toMatchSnapshot();
	});
});
