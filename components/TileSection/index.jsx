import React from 'react';
import './style.scss';
import RichText from '../../contentful/RichText';
import ContentfulImage from '../../contentful/ContentfulImage';
import { contentPropType } from '../../contentful/prop-types';
import TextReplacement from '../../contentful/TextReplacement';

function TileSection(props) {
	const { content } = props;
	const rootClass = 'tile-section';
	// links are references to a link object, so only in the fallback lang

	return (
		<section className={rootClass}>
			<div className={`${rootClass}__content`}>
				<h2 className={`${rootClass}__heading`}>{content.title}</h2>
				{content.body && <RichText document={content.body} rootClass={`${rootClass}__rich`} />}
				{content.blocks && (
					<ul className={`${rootClass}__tile-row`}>
						{content.blocks.map(tile => (
							<li key={tile.id} className={`${rootClass}__tile-col`}>
								<div className={`${rootClass}__tile`}>
									<h3 className={`${rootClass}__tile-heading`}>
										{tile.primaryMedia && (
											<ContentfulImage
												asset={tile.primaryMedia}
												className={`${rootClass}__tile-img`}
											/>
										)}
										{tile.title && (
											<TextReplacement
												text={tile.title}
												replacements={{
													Microsites: <span className={`${rootClass}__tile-i`}>Microsites</span>,
												}}
											/>
										)}
									</h3>

									{tile.body && <RichText document={tile.body} rootClass={`${rootClass}__tile`} />}
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
}

TileSection.propTypes = {
	content: contentPropType.isRequired,
};

export default TileSection;
