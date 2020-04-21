import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import { objectExpression, blockStatement } from '@babel/types';
import Hero from '../Hero';
import InlineHero from '../InlineHero';
import TileSection from '../TileSection';
import siteDataContext from '../../contentful/siteDataContext';
/**
 * Map properties of a pageLink or externalLink object to strings for use by the component
 * @param {string} fieldName name of the field
 * @param {object} linkObj link reference object, will be resolved to the actual link object
 * @param {string} lang language for content
 * @param {function} fieldOrFallback fieldOrFallback function that can fetch content from SiteDataContext
 */
function mapLink(fieldName, linkObj, lang, fieldOrFallback) {
	const link = fieldOrFallback(linkObj, lang);
	return {
		[fieldName]: link,
		[`${fieldName}Text`]: fieldOrFallback(link.fields.title, lang),
		[`${fieldName}AccessibleText`]: fieldOrFallback(link.fields.accessibleText, lang),
	};
}

// TODO: consider merging with the useNavigation hook

/**
 * Map properties of an asset object to strings for use by the component
 * @param {string} fieldName name of the field
 * @param {object} linkObj link reference object, will be resolved to the actual media object
 * @param {string} lang language for the content
 * @param {function} fieldOrFallback fieldOrFallback function that can fetch content from SiteDataContext
 */
function mapMedia(fieldName, linkObj, lang, fieldOrFallback) {
	const link = fieldOrFallback(linkObj, lang);
	return {
		[fieldName]: link,
		[`${fieldName}AccessibleText`]: fieldOrFallback(link.fields.description, lang),
	};
}

/**
 * Map properties of a Contentful block object to a simpler, standard props object with content in the current locale.
 * This object is passed to the component, providing content values.
 * @param {object} block The Contentful block object
 * @param {string} lang language for the content
 * @param {function} fieldOrFallback fieldOrFallback function that can fetch content from SiteDataContext
 */
function mapBlockFields(block, lang, fieldOrFallback) {
	// Map + resolve standard fields
	if (!block.fields) return {};

	const id = (block.sys && block.sys.id) || '';
	const resolvedBlocksList = Object.entries(block.fields).map(([fieldName, fieldValue]) => {
		switch (fieldName) {
			case 'blocks':
				return {
					blocks: fieldOrFallback(fieldValue, lang)
						.map(blockRef => fieldOrFallback(blockRef, lang))
						.map(childBlock => mapBlockFields(childBlock, lang, fieldOrFallback)),
				};

			case 'primaryLink':
			case 'secondaryLink':
				return mapLink(fieldName, fieldValue, lang, fieldOrFallback);

			case 'primaryMedia':
			case 'secondaryMedia':
				return mapMedia(fieldName, fieldValue, lang, fieldOrFallback);

			default:
				return { [fieldName]: fieldOrFallback(fieldValue, lang) };
		}
	});

	return Object.assign({}, { id }, ...resolvedBlocksList);
}

/**
 * Given a piece of content from Contentful, picks the appropriate component to render and passes the
 * simplified, standardized content props for the current locale to that component.
 * @param {object} props
 * @param {object} props.block The block reference link for the content to pass to the selected component
 * @param {boolean} props.isFirstChild Indicate if this is the first component on the page, used to determine where to render H1 tag
 */
function ComponentForBlock({ block, isFirstChild }) {
	let Tag = InlineHero;

	const { fieldOrFallback, lang } = useContext(siteDataContext);

	// resolve the data from a link to actual entry
	const blockValue = fieldOrFallback(block);
	const content = mapBlockFields(blockValue, lang, fieldOrFallback);
	const displayAs = fieldOrFallback(blockValue.fields.displayAs);

	const commonProps = {
		content,
		isFirstChild,
	};

	const componentProps = {};

	switch (blockValue.sys.contentType.sys.id) {
		// TODO - consider making this reference a dictionary of "display-as" values,
		// with fallbacks for complexBlock and blockGroup
		// instead of a big switch/case tree
		case 'complexBlock':
			switch (displayAs) {
				case 'inline-hero':
					Tag = InlineHero;
					break;
				default:
					Tag = Hero;
					break;
			}
			break;

		case 'blockGroup':
			Tag = TileSection;
			break;

		default:
			break;
	}

	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Tag {...commonProps} {...componentProps} />;
}

ComponentForBlock.propTypes = {
	block: PropTypes.shape({
		sys: PropTypes.shape({
			id: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			linkType: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	isFirstChild: PropTypes.bool.isRequired,
};

export default ComponentForBlock;
