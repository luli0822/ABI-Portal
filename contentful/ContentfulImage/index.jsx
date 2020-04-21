import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { assetPropType } from '../prop-types';
import siteDataContext from '../siteDataContext';
import StaticImage from './StaticImage';
import LazyImage from './LazyImage';
import useOnScreen from './useOnScreen';
import './styles.scss';

const rootClass = 'contentful-image';

export default function ContentfulImage({ asset, className, alt, lazyload, cover }) {
	const { lang, fieldOrFallback, previewAssets } = useContext(siteDataContext);
	const file = fieldOrFallback(asset.fields.file, lang);
	const isSVG = file && file.contentType === 'image/svg+xml';
	const [isVisible, setIsVisible] = useState(false);
	const imgContainerRef = useRef();

	const isInViewport = useOnScreen(imgContainerRef, '100px');

	const isLazyLoad = isSVG ? false : lazyload;

	function onLoad() {
		setIsVisible(true);
	}

	// Generate and array from 100px-1440px
	const getBaseSizes = () => {
		const base = 100;
		const sizes = [];
		for (let i = base; i <= 1440; i += base) {
			if (i === 1400) {
				sizes.push(1440);
			} else {
				sizes.push(i);
			}
		}
		return sizes;
	};

	//  An array of the px sizes 100px-1440
	const baseSizes = getBaseSizes();

	// Alt must be present, so we can't let it be `undefined`
	// use image description or fallback to empty string (don't pass undefined)
	const defaultAlt = fieldOrFallback(asset.fields.description) || '';
	// if no alt was passed in (default prop value is undefined, use the defaultAlt, otherwise use the passed alt, even if it's an empty string)
	const finalAlt = alt === undefined ? defaultAlt : alt;

	const placeholderClasses = [
		`${rootClass}__placeholder`,
		`${rootClass}__placeholder--${!isVisible ? 'visible' : 'hidden'}`,
		cover ? `${rootClass}__placeholder--cover` : '',
	];

	const imgClasses = [
		`${rootClass}__img`,
		`${rootClass}__img--${isVisible || isSVG ? 'visible' : 'hidden'}`,
		cover ? `${rootClass}__img--cover` : '',
	];

	const placeholderClass = placeholderClasses.join(' ');
	const imgClass = imgClasses.join(' ');

	const LazyLoadImageOn = isInViewport && (
		<LazyImage
			imgContainerRef={imgContainerRef}
			file={file}
			className={imgClass}
			baseSizes={baseSizes}
			alt={finalAlt}
			onLoad={onLoad}
		/>
	);

	const LazyLoadImageOff = (
		<StaticImage
			file={file}
			className={imgClass}
			baseSizes={baseSizes}
			alt={finalAlt}
			onLoad={onLoad}
			isSVG={isSVG}
			previewAsset={previewAssets[asset.sys.id].url}
		/>
	);

	const backgroundUrl =
		!isSVG && previewAssets[asset.sys.id] ? `url(${previewAssets[asset.sys.id].url})` : undefined;

	return (
		<div ref={imgContainerRef} className={`${rootClass} ${className}`}>
			<div
				className={placeholderClass}
				style={{
					paddingTop:
						file && !cover && `${100 * (file.details.image.height / file.details.image.width)}%`,
					backgroundImage: backgroundUrl,
				}}
			/>
			{isLazyLoad ? LazyLoadImageOn : LazyLoadImageOff}
		</div>
	);
}

ContentfulImage.propTypes = {
	asset: assetPropType.isRequired,
	className: PropTypes.string,
	alt: PropTypes.string,
	lazyload: PropTypes.bool,
	cover: PropTypes.bool,
};

ContentfulImage.defaultProps = {
	className: '',
	alt: undefined,
	lazyload: true,
	cover: false,
};
