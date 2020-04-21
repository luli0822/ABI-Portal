import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Meta from '../components/Meta';
import Footer from '../components/Footer';
import '../scss/master.scss';
import siteDataContext from '../contentful/siteDataContext';
import analyticsContext from '../analytics/analyticsContext';
import ComponentForBlock from '../components/ComponentForBlock';

const { siteDomains } = require('../site-config');

function Index({ pageId }) {
	const {
		lang,
		linkedEntries,
		fieldOrFallback,
		headerNav,
		langSwitchLink,
		skipNavText,
		logo,
		footerNav,
	} = useContext(siteDataContext);

	const { pushCustomLinkEvent, usePageViewEvent } = useContext(analyticsContext);

	// TODO: expose these values as part of the siteData context or part of a pageData object (pending Nextjs SSG update)
	// ideally we aren't using fieldOrFallback in components. It's not very pretty

	const pageEntry = linkedEntries[pageId];

	const layoutEntry = fieldOrFallback(pageEntry.fields.layout);

	const blocks = layoutEntry ? fieldOrFallback(layoutEntry.fields.blocks) : [];

	const siteDomain = siteDomains[lang];

	usePageViewEvent(pageId);

	return (
		<>
			<Meta pageId={pageId} siteDomain={siteDomain} />
			<Header
				navigationEntries={headerNav}
				skipNavText={skipNavText}
				langSwitchLink={langSwitchLink}
				logo={logo}
				pushCustomLinkEvent={pushCustomLinkEvent}
			/>

			<main id="main">
				{blocks.map((block, index) => {
					return (
						<ComponentForBlock
							block={block}
							lang={lang}
							key={`${pageId}${block.sys.id}`}
							isFirstChild={index === 0}
						/>
					);
				})}
			</main>
			<Footer navigationEntries={footerNav} />
		</>
	);
}

Index.propTypes = {
	pageId: PropTypes.string.isRequired,
};

Index.getInitialProps = ({ query }) => {
	const { pageId } = query;
	return { pageId };
};

export default Index;
