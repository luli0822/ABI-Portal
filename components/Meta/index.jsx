import React from 'react';
import PropTypes from 'prop-types';
import ContentfulMeta from '../../contentful/ContentfulMeta';

function Meta({ pageId, siteDomain }) {
	return (
		<>
			{/* Need to pass metaTitle  prop to ContentfulMeta  to override contentful the default Title */}
			<ContentfulMeta siteDomain={siteDomain} pageId={pageId} />
		</>
	);
}

Meta.propTypes = {
	pageId: PropTypes.string.isRequired,
	siteDomain: PropTypes.string.isRequired,
};

export default Meta;
