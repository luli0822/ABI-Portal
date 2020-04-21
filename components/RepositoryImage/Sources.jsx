import React from 'react';
import PropTypes from 'prop-types';

/**
 * Generate a set of <source> tags for a given breakpoint for the RepositoryImage component
 */
function Sources({ image, breakpointPixels, widthPercent, type, isMinWidth = false }) {
	const mediaQueryConstraint = isMinWidth ? 'min-width' : 'max-width';

	// these base sizes must match the sizes set in the nextjs-image-plugin
	// TODO set them globally and import them in both places
	// This must be ordered smallest to largest
	const baseSizes = [100, 200, 400, 600, 800, 1200, 1440];

	const widthPixels = breakpointPixels * (widthPercent / 100);

	const baseSize = baseSizes.find(size => size >= widthPixels) || 1440;

	return (
		<>
			{/* Webp source must come first */}
			<source
				srcSet={`${image[`${baseSize}-webp`]}, ${image[`${baseSize * 2}-webp`]} 2x`}
				type="image/webp"
				media={`(${mediaQueryConstraint}: ${breakpointPixels}px)`}
			/>
			<source
				srcSet={`${image[baseSize]}, ${image[baseSize * 2]} 2x`}
				type={type}
				media={`(${mediaQueryConstraint}: ${breakpointPixels}px)`}
			/>
		</>
	);
}

Sources.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	image: PropTypes.any.isRequired,
	type: PropTypes.string.isRequired,
	isMinWidth: PropTypes.bool,
	breakpointPixels: PropTypes.number.isRequired,
	widthPercent: PropTypes.number.isRequired,
};

Sources.defaultProps = {
	isMinWidth: false,
};

export default Sources;
