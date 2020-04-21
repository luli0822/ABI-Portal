/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import App from 'next/app';
import globals from '../globals';
import SiteData from '../contentful/SiteData';
import AnalyticsManager from '../analytics/AnalyticsManager';
import { defaultLang } from '../contentful/config';
import { langPropType } from '../contentful/prop-types';

/** @extends React.Component */
class AcceleratorApp extends App {
	render() {
		const { Component, pageProps, router } = this.props;

		// fallback to defaultLang (router.lang is undefined on an error route).
		// could also set lang based on hostname if those are known
		const lang = router.query.lang || defaultLang;
		const { pageId } = router.query;

		// check to see if the current HTML lang attribute matches the current page language
		// if it doesn't, update the current HTML lang attributte to match current page language
		const currentLangTag = globals.isBrowser ? globals.getDocument().lang : '';
		if (currentLangTag !== lang && globals.isBrowser) {
			globals.getDocument().lang = lang;
		}

		return (
			// SiteData provides content from Contentful to any components rendered within the page
			<SiteData lang={lang} pageId={pageId}>
				<AnalyticsManager pageId={pageId}>
					<Component {...pageProps} />
				</AnalyticsManager>
			</SiteData>
		);
	}
}

AcceleratorApp.propTypes = {
	Component: PropTypes.any.isRequired,
	pageProps: PropTypes.any.isRequired,
	router: PropTypes.shape({
		query: PropTypes.shape({
			lang: langPropType,
			pageId: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default AcceleratorApp;
