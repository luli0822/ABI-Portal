import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import EnglishContent from '../../content/english.json';
import FrenchContent from '../../content/french.json';
import Header from '../../components/Header';
import '../../scss/master.scss';
import './style.scss';

const rootClass = 'about';
function about({ lang, content }) {
	return (
		<>
			<Head>
				<title>Next.js Accelerator</title>
			</Head>
			<Header content={content} />
			<main id="main">
				<section className={`${rootClass}__content`}>
					<div className={rootClass}>
						<h1 className={`${rootClass}__heading`}>About {lang} Page</h1>
						<p className={`${rootClass}__body`}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. A incidunt iure quibusdam
							odit dignissimos consectetur maxime tempora, adipisci culpa numquam libero, facere
							voluptatibus excepturi tenetur earum dolorem pariatur? Corrupti, consectetur.
						</p>
						<a
							className={`${rootClass}__cta`}
							data-cruller={`${rootClass}__cta-button`}
							href="https://www.loblaws.ca"
						>
							Call to Action {lang} - visit loblaws.ca
						</a>
					</div>
				</section>
			</main>
		</>
	);
}
about.propTypes = {
	lang: PropTypes.oneOf(['en', 'fr']).isRequired,
	content: PropTypes.shape({
		skipToLinkText: PropTypes.string.isRequired,
	}).isRequired,
};

about.getInitialProps = ({ query }) => {
	const { lang } = query;
	const allLangContent = {
		en: EnglishContent,
		fr: FrenchContent,
	};
	const currentLangContent = allLangContent[lang];
	return { lang, content: currentLangContent };
};

export default about;
