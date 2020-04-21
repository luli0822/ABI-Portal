import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Use this component to load images when you are not using Lazyload

function StaticImage(props) {
	const { file, baseSizes, className, alt, onLoad, isSVG, previewAsset } = props;

	const imgRef = useRef();

	const svgImgUrl = previewAsset || file.url;

	const imgUrl = isSVG ? svgImgUrl : `${file.url}?w=1440`;

	useEffect(() => {
		const img = imgRef.current;
		if (img && img.complete) {
			onLoad();
		}
	});
	// render out source tags for widths between 100 and 1440 px, rounded up to nearest 100px.
	return (
		<picture>
			{!isSVG && (
				<>
					{baseSizes.map((size, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<React.Fragment key={index}>
							<source
								type="image/webp"
								srcSet={`${file.url}?fm=webp&w=${size}`}
								media={`(max-width: ${size}px)`}
							/>
							<source
								type={file.contentType}
								srcSet={`${file.url}?w=${size}`}
								media={`(max-width: ${size}px)`}
							/>
						</React.Fragment>
					))}
					<source
						type="image/webp"
						srcSet={`${file.url}?fm=webp&w=1440`}
						media="(min-width: 1440px)"
					/>
					<source
						type={file.contentType}
						srcSet={`${file.url}?w=1440`}
						media="(min-width: 1440px)"
					/>
				</>
			)}
			{/* img tag holds largest image src */}
			<img src={imgUrl} className={className} ref={imgRef} alt={alt} onLoad={onLoad} />
		</picture>
	);
}

StaticImage.propTypes = {
	file: PropTypes.shape({
		url: PropTypes.string.isRequired,
		contentType: PropTypes.string.isRequired,
	}).isRequired,
	baseSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
	className: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	onLoad: PropTypes.func.isRequired,
	isSVG: PropTypes.bool,
	previewAsset: PropTypes.string,
};

StaticImage.defaultProps = {
	isSVG: false,
	previewAsset: undefined,
};

export default StaticImage;
