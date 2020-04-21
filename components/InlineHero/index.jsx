import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import ContentfulLink from '../../contentful/ContentfulLink';
import ContentfulImage from '../../contentful/ContentfulImage';
import RichText from '../../contentful/RichText';
import { contentPropType } from '../../contentful/prop-types';

function InlineHero(props) {
	const { content, isFirstChild } = props;
	const rootClass = 'inline-hero';

	// components don't know where they are on the page, but the page must always have an H1
	// this is a simple way to show the H1 using the first component on the page
	// note this doesn't work if there is no title content in the first component
	const HTag = isFirstChild ? 'h1' : 'h2';

	return (
		<section className={rootClass}>
			<div className={`${rootClass}__content`}>
				{content.primaryMedia && (
					<div className={`${rootClass}__cover-image`}>
						<ContentfulImage asset={content.primaryMedia} className={`${rootClass}__image`} cover />
						<div className={`${rootClass}__image-screen`} />
					</div>
				)}
				{content.title && <HTag className={`${rootClass}__heading`}>{content.title}</HTag>}
				{content.body && <RichText document={content.body} rootClass={`${rootClass}__rich`} />}

				<div className={`${rootClass}__cta-container`}>
					{content.primaryLink && (
						<ContentfulLink linkEntry={content.primaryLink} className={`${rootClass}__cta`}>
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
		</section>
	);
}

InlineHero.propTypes = {
	content: contentPropType.isRequired,
	isFirstChild: PropTypes.bool.isRequired,
};

export default InlineHero;
