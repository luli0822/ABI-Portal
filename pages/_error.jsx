import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import siteDataContext from '../contentful/siteDataContext';
import Hero from '../components/Hero';
/* For multi domain sites */

// const { siteDomains } = require('../site-config');

function Error({ statusCode }) {
	const { keyValues, fieldOrFallback } = useContext(siteDataContext);

	const getFields = lang => {
		const title = keyValues['404-page-title'] &&
			fieldOrFallback(keyValues['404-page-title'].fields.value, lang) && {
				title: fieldOrFallback(keyValues['404-page-title'].fields.value, lang),
			};

		const body = keyValues['404-page-body'] &&
			fieldOrFallback(keyValues['404-page-body'].fields.richText, lang) && {
				body: fieldOrFallback(keyValues['404-page-body'].fields.richText, lang),
			};

		return {
			...title,
			...body,
		};
	};

	/* Uncomment this for multi domain sites. 
	Gives you the access to the current hostname */

	// const [host, setHost] = useState();

	// useEffect(() => {
	// 	setHost(window.location.hostname);
	// }, [host]);

	// let errorContent = {};

	// if (host) {
	// 	if (siteDomains['fr-CA'].includes(host)) {
	// 		errorContent = getFields('fr-CA');
	// 	} else {
	// 		errorContent = getFields('en-CA');
	// 	}
	// }
	return statusCode === 404 ? (
		<>
			{/* For a multi domain site */}
			{/* <Hero content={errorContent} isFirstChild /> */}
			<Hero content={getFields('en-CA')} isFirstChild />
			<Hero content={getFields('fr-CA')} />
		</>
	) : (
		<p>An error occurred on client </p>
	);
}

Error.propTypes = {
	statusCode: PropTypes.number,
};

Error.defaultProps = {
	statusCode: undefined,
};

Error.getInitialProps = ({ res, err }) => {
	let statusCode = 404;

	if (res && res.statusCode) {
		statusCode = res.statusCode;
	}

	if (err && err.statusCode) {
		statusCode = err.statusCode;
	}

	return { statusCode };
};

export default Error;
