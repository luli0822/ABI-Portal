/* eslint-disable import/no-dynamic-require, prefer-template, global-require */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sources from './Sources';
import images from '../../images/responsive-images';

/**
 * <RepositoryImage /> provides automatic responsive image component for images stored in the repository
 * For each image, it pulls optimized optimized png, jpg and wepb sources from responsive-images.js
 * Do not use this component for svg or gif images
 * For svg or gif formats, import them directly into the component.
 * High density screens will pick the wider image option.
 * Providing a source for each breakpoint prevents high density devices
 * from choosing the absolute highest option, which is generally not necessary.
 */
function RepositoryImage(props) {
	const { src, className, alt, xs, sm, md, lg, xl, onLoad } = props;

	const imgRef = useRef();

	useEffect(() => {
		const img = imgRef.current;
		if (img && img.complete) {
			onLoad();
		}
	});

	// these breakpoints should match the grid breakpoints (max)
	const breakpointMaxWidths = {
		xs: 480,
		sm: 767,
		md: 991,
		lg: 1247,
	};

	const image = images[src];

	const fileExtension = images[src].meta.type;
	const type = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;

	return (
		<picture>
			<Sources
				image={image}
				breakpointPixels={breakpointMaxWidths.xs}
				widthPercent={xs}
				type={type}
			/>
			<Sources
				image={image}
				breakpointPixels={breakpointMaxWidths.sm}
				widthPercent={sm}
				type={type}
			/>
			<Sources
				image={image}
				breakpointPixels={breakpointMaxWidths.md}
				widthPercent={md}
				type={type}
			/>
			<Sources
				image={image}
				breakpointPixels={breakpointMaxWidths.lg}
				widthPercent={lg}
				type={type}
			/>
			<Sources
				image={image}
				breakpointPixels={breakpointMaxWidths.lg + 1}
				widthPercent={xl}
				type={type}
				isMinWidth
			/>
			{/* use the default image size as the default for browsers that don't get sources */}
			<img src={image[1440]} className={className} alt={alt} ref={imgRef} onLoad={onLoad} />
		</picture>
	);
}

RepositoryImage.propTypes = {
	src: PropTypes.string.isRequired,
	className: PropTypes.string,
	alt: PropTypes.string.isRequired,
	xs: PropTypes.number,
	sm: PropTypes.number,
	md: PropTypes.number,
	lg: PropTypes.number,
	xl: PropTypes.number,
	onLoad: PropTypes.func,
};

RepositoryImage.defaultProps = {
	className: '',
	xs: 100,
	sm: 100,
	md: 100,
	lg: 100,
	xl: 100,
	onLoad: () => {},
};

export default RepositoryImage;
