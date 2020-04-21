import React from 'react';
import PropTypes from 'prop-types';

function LanguageSwitch({ children, linkData, className }) {
	return (
		<a className={className} href={linkData.href} aria-label={linkData.accessibleText}>
			{children || linkData.text}
		</a>
	);
}

LanguageSwitch.propTypes = {
	linkData: PropTypes.shape({
		href: PropTypes.string.isRequired,
		text: PropTypes.string,
		accessibleText: PropTypes.string,
	}).isRequired,
	className: PropTypes.string,
	children: PropTypes.node,
};

LanguageSwitch.defaultProps = {
	className: undefined,
	children: undefined,
};

export default LanguageSwitch;
