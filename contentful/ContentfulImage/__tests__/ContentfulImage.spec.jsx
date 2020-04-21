import React from 'react';
import { mount, shallow } from 'enzyme';

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

const noLazyloadProps = {
	asset: mockImageAsset,
	alt: 'mock-alt',
	lazyload: false,
	cover: false,
};

// const useOnScreen = jest.fn();

jest.mock('../useOnScreen');

// eslint-disable-next-line import/first
import useOnScreen from '../useOnScreen';

// eslint-disable-next-line import/first
import ContentfulImage from '..';

afterEach(() => {
	mockFieldOrFallback.mockClear();
	useOnScreen.mockClear();
});

describe('<ContentfulImage /> and <StaticImage />', () => {
	it('Renders a <LazyImage /> if is in viewport and lazyload is enabled', () => {
		useOnScreen.mockReturnValue(true);
		// eslint-disable-next-line react/jsx-props-no-spreading
		const component = shallow(<ContentfulImage {...lazyloadProps}>Page Link Text</ContentfulImage>);

		expect(component.debug()).toMatchSnapshot();
	});

	it('Does not render a <LazyImage /> if not in viewport and lazyload is enabled', () => {
		useOnScreen.mockReturnValue(false);
		// eslint-disable-next-line react/jsx-props-no-spreading
		const component = shallow(<ContentfulImage {...lazyloadProps}>Page Link Text</ContentfulImage>);

		expect(component.debug()).toMatchSnapshot();
	});

	it('Renders a <StaticImage> if lazyload is disabled, <StaticImage> renders appropriate <source> tags', () => {
		const component = mount(
			// eslint-disable-next-line react/jsx-props-no-spreading
			<ContentfulImage {...noLazyloadProps}>Page Link Text</ContentfulImage>
		);

		expect(component.debug()).toMatchSnapshot();
	});

	it("Uses the asset's provided description if no alt is provided", () => {
		const { alt, ...otherProps } = noLazyloadProps;
		const component = mount(
			// eslint-disable-next-line react/jsx-props-no-spreading
			<ContentfulImage {...otherProps}>Page Link Text</ContentfulImage>
		);

		expect(component.find("img[alt='asset description']")).toHaveLength(1);
	});

	it('Uses the empty string provided as an alt', () => {
		const { alt, ...otherProps } = noLazyloadProps;
		const component = mount(
			// eslint-disable-next-line react/jsx-props-no-spreading
			<ContentfulImage {...otherProps} alt="">
				Page Link Text
			</ContentfulImage>
		);

		expect(component.find("img[alt='']")).toHaveLength(1);
	});

	it('Renders an empty alt tag if no alt is provided and asset description is empty', () => {
		const component = mount(
			// eslint-disable-next-line react/jsx-props-no-spreading
			<ContentfulImage asset={mockLinkedAssets['test-img2.png']} lazyload={false} cover={false}>
				Page Link Text
			</ContentfulImage>
		);

		expect(component.find("img[alt='']")).toHaveLength(1);
	});
});
