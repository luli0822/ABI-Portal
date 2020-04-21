import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function SkipNav(props) {
	const { skipToLinkText } = props;
	const rootClass = 'skip-nav';
	return (
		<div className={rootClass}>
			<a href="#main" className={`${rootClass}__link`}>
				{skipToLinkText}
			</a>
		</div>
	);
}

SkipNav.propTypes = {
	skipToLinkText: PropTypes.string.isRequired,
};

export default SkipNav;
