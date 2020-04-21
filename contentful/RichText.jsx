import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import * as Contentful from '@contentful/rich-text-react-renderer';
import ContentfulLink from './ContentfulLink';
import TextReplacement from './TextReplacement';
import siteDataContext from './siteDataContext';

function RichText(props) {
	const { lang, fieldOrFallback } = useContext(siteDataContext);
	const { document, rootClass, replacements } = props;

	const options = {
		renderMark: {
			[MARKS.BOLD]: text => <span className={`${rootClass}-b`}>{text}</span>,
			[MARKS.ITALIC]: text => <span className={`${rootClass}-i`}>{text}</span>,
		},
		renderNode: {
			[BLOCKS.PARAGRAPH]: (node, children) => <p className={`${rootClass}-p`}>{children}</p>,
			[BLOCKS.UL_LIST]: (node, children) => <ul className={`${rootClass}-ul`}>{children}</ul>,
			[BLOCKS.LIST_ITEM]: (node, children) => <li className={`${rootClass}-li`}>{children}</li>,
			[INLINES.EMBEDDED_ENTRY]: node => {
				const link = fieldOrFallback(node.data.target);
				const linkTitle = fieldOrFallback(link.fields.title, lang);
				return (
					<ContentfulLink linkEntry={link} className={`${rootClass}-link`}>
						<TextReplacement text={linkTitle} replacements={replacements} />
					</ContentfulLink>
				);
			},
		},
		renderText: children => <TextReplacement text={children} replacements={replacements} />,
	};

	return Contentful.documentToReactComponents(document, options);
}

RichText.propTypes = {
	document: PropTypes.shape({}).isRequired,
	rootClass: PropTypes.string,
	replacements: PropTypes.shape({}),
};

RichText.defaultProps = {
	rootClass: 'rich-text',
	replacements: {},
};

export default RichText;
