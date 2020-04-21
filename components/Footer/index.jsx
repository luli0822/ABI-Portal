import React from 'react';
import PropTypes from 'prop-types';
import ContentfulLink from '../../contentful/ContentfulLink';
import './style.scss';

const rootClass = 'footer';

function Footer(props) {
	const { navigationEntries } = props;

	return (
		<footer id="footer" className={rootClass}>
			<div className={`${rootClass}__container`}>
				<div className={`${rootClass}__nav-links-container`}>
					<ul className={`${rootClass}__nav-list`}>
						{navigationEntries.map(entry => (
							<li className={`${rootClass}__nav-list-item`} key={entry.link.sys.id}>
								<ContentfulLink linkEntry={entry.link} className={`${rootClass}__nav-link`}>
									{entry.text}
								</ContentfulLink>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	);
}

Footer.propTypes = {
	navigationEntries: PropTypes.arrayOf(
		PropTypes.shape({
			fields: PropTypes.shape({
				page: PropTypes.object.isRequired,
				title: PropTypes.object.isRequired,
			}),
		})
	),
};

Footer.defaultProps = {
	navigationEntries: [],
};

export default Footer;
