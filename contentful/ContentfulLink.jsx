import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import siteDataContext from './siteDataContext';
import { linkPropType } from './prop-types';
import { fallbackLang } from './config';

/**
 * Build a link component that will render either a pageLink or externalLink
 * @param {*} props
 */
export default function ContentfulLink(props) {
	const { linkEntry, children, targetLang, ...aProps } = props;

	// check the type for this link. it's internal if the type is pageLink. otherwise it's externalLink.
	const isInternal = linkEntry.sys.contentType.sys.id === 'pageLink';

	const { pathMap, lang, fieldOrFallback } = useContext(siteDataContext);

	const finalLang = targetLang || lang;

	const ariaLabel = fieldOrFallback(linkEntry.fields.accessibleLabel, finalLang);

	if (isInternal) {
		const destinationPageId = linkEntry.fields.page[fallbackLang].sys.id;

		const hash = linkEntry.fields.hash ? `#${linkEntry.fields.hash[finalLang]}` : '';

		// TODO: find strategy for handling links to pages that don't exist in the path map.
		const [asPath, { page }] = Object.entries(pathMap).find(
			([path, options]) =>
				options.query.pageId === destinationPageId && options.query.lang === finalLang
		);

		const href = `${page}?pageId=${destinationPageId}&lang=${finalLang}${hash}`;

		return (
			<Link href={href} as={asPath}>
				{/* eslint-disable-next-line react/jsx-props-no-spreading */}
				<a aria-label={ariaLabel} {...aProps}>
					{children}
				</a>
			</Link>
		);
	}

	const href = fieldOrFallback(linkEntry.fields.url, finalLang);

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<a href={href} aria-label={ariaLabel} {...aProps}>
			{children}
		</a>
	);
}

ContentfulLink.propTypes = {
	linkEntry: linkPropType.isRequired,
	children: PropTypes.node.isRequired,
	targetLang: PropTypes.string,
};

ContentfulLink.defaultProps = {
	targetLang: undefined,
};
