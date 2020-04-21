import React, { useContext } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
// components can import ContentfulLink and RichText but should NOT use the SiteData context directly
// any prop mapping should happen inside ComponentForBlock
// this keeps your display components very clean
import ContentfulLink from '../../contentful/ContentfulLink';
import RichText from '../../contentful/RichText';
import { contentPropType } from '../../contentful/prop-types';
import analyticsContext from '../../analytics/analyticsContext';

function Hero(props) {
	const { content, isFirstChild } = props;
	const rootClass = 'contentful-hero';
	const { pushCustomLinkEvent } = useContext(analyticsContext);
	// components don't know where they are on the page, but the page must always have an H1
	// this is a simple way to show the H1 using the first component on the page
	// note this doesn't work if there is no title content in the first component
	const HTag = isFirstChild ? 'h1' : 'h2';

	return (
		<section className={rootClass}>
			<div className={`${rootClass}__content`}>
				{/* Always test if a field has a value before rendering it, so the component doesn't break if specific content isn't present */}
				{content.title && <HTag className={`${rootClass}__heading`}>{content.title}</HTag>}
				<div className={`${rootClass}__detail-row`}>
					<div className={`${rootClass}__body-col`}>
						{content.body && <RichText document={content.body} rootClass={`${rootClass}__rich`} />}
					</div>
					<div className={`${rootClass}__cta-col`}>
						{content.primaryLink && (
							<ContentfulLink
								linkEntry={content.primaryLink}
								className={`${rootClass}__cta`}
								onClick={() => pushCustomLinkEvent(content.primaryLink.fields.title)}
							>
								{content.primaryLinkText}
							</ContentfulLink>
						)}
						{content.secondaryLink && (
							<ContentfulLink linkEntry={content.secondaryLink} className={`${rootClass}__cta`}>
								{content.secondaryLinkText}
							</ContentfulLink>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

Hero.propTypes = {
	content: contentPropType.isRequired,
	isFirstChild: PropTypes.bool,
};

Hero.defaultProps = {
	isFirstChild: false,
};

export default Hero;
