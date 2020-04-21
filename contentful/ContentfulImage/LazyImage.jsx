import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Use this component to load images when you are not using Lazyload.

function LazyImage(props) {
	const { file, baseSizes, className, alt, onLoad, imgContainerRef } = props;

	const imgRef = useRef();
	const containerWidth = imgContainerRef.current.offsetWidth;
	useEffect(() => {
		const img = imgRef.current;
		if (img && img.complete) {
			onLoad();
		}
	});

	// on load, find the width of the container and create the picture with one img tag and one source tag for webp. Create the URL for the nearest largest 100px
	const imgWidth = baseSizes.find(size => size >= containerWidth) || 1440;
	return (
		<picture>
			<source type="image/webp" srcSet={`${file.url}?fm=webp&w=${imgWidth}`} />
			<img
				src={`${file.url}?w=${imgWidth}`}
				className={className}
				ref={imgRef}
				alt={alt}
				onLoad={onLoad}
			/>
		</picture>
	);
}

LazyImage.propTypes = {
	file: PropTypes.shape({
		url: PropTypes.string.isRequired,
	}).isRequired,
	baseSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
	className: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	onLoad: PropTypes.func.isRequired,
	imgContainerRef: PropTypes.shape({
		current: PropTypes.shape(),
	}).isRequired,
};

export default LazyImage;
