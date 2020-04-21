import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import SkipNav from '../SkipNav/index';
import { assetPropType } from '../../contentful/prop-types';
import './style.scss';
import ContentfulLink from '../../contentful/ContentfulLink';
import ContentfulImage from '../../contentful/ContentfulImage';
import LanguageSwitch from '../LanguageSwitch';

function Header(props) {
	const { skipNavText, navigationEntries, langSwitchLink, logo, pushCustomLinkEvent } = props;
	const rootClass = 'header';

	const logoMedia = logo && (logo.primary || logo.alt);

	return (
		<header id="header" className={rootClass}>
			<SkipNav skipToLinkText={skipNavText} />
			<div className={`${rootClass}__fixed`}>
				<nav className={`${rootClass}__nav`}>
					{logoMedia && logo.href && logo.asPath && (
						<div className={`${rootClass}__logo`}>
							<Link href={logo.href} as={logo.asPath}>
								{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
								<a className={`${rootClass}__logo-link`}>
									<ContentfulImage
										asset={logoMedia}
										className={`${rootClass}__logo-img`}
										lazyload={false}
									/>
								</a>
							</Link>
						</div>
					)}
					<ul className={`${rootClass}__nav-list`}>
						{navigationEntries.map(entry => (
							<li className={`${rootClass}__nav-list-item`} key={entry.link.sys.id}>
								<ContentfulLink
									linkEntry={entry.link}
									className={`${rootClass}__nav-link`}
									data-cruller={`${rootClass}__link1`}
									onClick={() => pushCustomLinkEvent(entry.link.fields.title)}
								>
									{entry.text}
								</ContentfulLink>
							</li>
						))}
					</ul>
					<ul className={`${rootClass}__nav-list`}>
						<li className={`${rootClass}__nav-list-item`}>
							{langSwitchLink && (
								<LanguageSwitch linkData={langSwitchLink} className={`${rootClass}__nav-link`} />
							)}
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

Header.propTypes = {
	navigationEntries: PropTypes.arrayOf(
		PropTypes.shape({
			fields: PropTypes.shape({
				page: PropTypes.object.isRequired,
				title: PropTypes.object.isRequired,
			}),
		})
	).isRequired,
	skipNavText: PropTypes.string.isRequired,
	langSwitchLink: PropTypes.shape({
		href: PropTypes.string,
		asPath: PropTypes.string,
		text: PropTypes.string,
		accessibleText: PropTypes.string,
	}).isRequired,
	logo: PropTypes.shape({
		primary: assetPropType,
		primaryAccessibleText: PropTypes.string,
		alt: assetPropType,
		altAccessibleText: PropTypes.string,
		href: PropTypes.string.isRequired,
		asPath: PropTypes.string.isRequired,
	}),
	pushCustomLinkEvent: PropTypes.func.isRequired,
};

Header.defaultProps = {
	logo: undefined,
};

export default Header;
