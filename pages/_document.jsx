import React from 'react';
import PropTypes from 'prop-types';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import {
	GoogleTagManagerBody,
	GoogleTagManagerHead,
	AnalyticsDataObject,
} from '../analytics/analyticsUtils';
/**
 * This file controls what is rendered as HTML around the React app. Components rendered here
 * are only rendred during the static build and therefore aren't rehydrated. If you need
 * to wrap an entire site in a component, do it in _app.jsx
 * @extends React.Component */
class AcceleratorDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps, query: ctx.query };
	}

	render() {
		const { query } = this.props;
		const { lang, analyticsPageName } = query;

		return (
			<Html lang={lang}>
				<Head>
					<AnalyticsDataObject lang={lang} pageName={analyticsPageName} />
					<GoogleTagManagerHead />
				</Head>
				<body>
					<GoogleTagManagerBody />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

AcceleratorDocument.propTypes = {
	query: PropTypes.shape({
		lang: PropTypes.oneOf(['en-CA', 'fr-CA']),
		analyticsPageName: PropTypes.string,
	}).isRequired,
};

export default AcceleratorDocument;
