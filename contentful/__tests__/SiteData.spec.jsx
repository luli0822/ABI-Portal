/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import siteDataContext from '../siteDataContext';
import refreshedFetchedData from '../__mocks__/refreshedFetchSiteData.json';
import mockSiteData from '../../data/__mocks__/siteData.json';
import mockAssets from '../../data/__mocks__/assets.json';

//  mock staticSiteData
jest.mock('../../data/siteData.json', () => mockSiteData, { virtual: true });
// mock previewAssets
jest.mock('../../data/assets.json', () => mockAssets, { virtual: true });
// mock pathMap
jest.mock('../path-map');
// mock config
jest.mock('../config');
// mock client (fetchSiteData)
jest.mock('../client');

// eslint-disable-next-line import/first
import client from '../client';

const originalFetchSiteData = client.fetchSiteData;

const mockFetchSiteData = jest.fn(originalFetchSiteData);

client.fetchSiteData = mockFetchSiteData;

// eslint-disable-next-line import/first
import SiteData from '../SiteData';

// jest.mock('react', () => {
// 	const ActualReact = require.requireActual('react');
// 	return {
// 		...ActualReact,
// 		useContext: () => ({
// 			fieldOrFallback: mockFieldOrFallback,
// 			lang: mockLang,
// 			previewAssets: mockPreviewAssets,
// 		}),
// 	};
// });
const stringifyObject = obj =>
	JSON.stringify(obj)
		.split('"')
		.join('');

// Mock child component
function MockChildComponent() {
	const {
		siteEntry,
		linkedEntries,
		linkedAssets,
		keyValues,
		pathMap,
		lang,
		fieldOrFallback,
		previewAssets,
		langSwitchLink,
	} = useContext(siteDataContext);

	return (
		<div>
			<h1>Some Mock Component</h1>
			<h2>siteEntry</h2>
			<div>{stringifyObject(siteEntry)}</div>
			<h2>linkedEntries</h2>
			<div>{stringifyObject(linkedEntries)}</div>
			<h2>linkedAssets</h2>
			<div>{stringifyObject(linkedAssets)}</div>
			<h2>keyValues</h2>
			<div>{stringifyObject(keyValues)}</div>
			<h2>PathMap</h2>
			<div>{stringifyObject(pathMap)}</div>
			<h2>lang</h2>
			<div>{stringifyObject(lang)}</div>
			<h2>previewAssets</h2>
			<div>{stringifyObject(previewAssets)}</div>
			<h2>Render Link using fieldOrFallback</h2>
			{stringifyObject(fieldOrFallback(siteEntry.fields.navigation[lang][0], lang))}
			<h2>langSwitchLink</h2>
			<div>{stringifyObject(langSwitchLink)}</div>
		</div>
	);
}

afterAll(() => {
	jest.clearAllMocks();
	mockFetchSiteData.mockReset();
});

describe('SiteData', () => {
	it('Provides correct values for siteData', async () => {
		// On inital render, the refresh functions
		let component;
		await act(async () => {
			component = await mount(
				// eslint-disable-next-line react/jsx-props-no-spreading
				<SiteData lang="en-CA" pageId="site-home-page">
					<MockChildComponent />
				</SiteData>
			);
		});
		expect(component.debug()).toMatchSnapshot();
	});

	it('Refresh button is rendered inPreview', async () => {
		let component;
		await act(async () => {
			component = await mount(
				// eslint-disable-next-line react/jsx-props-no-spreading
				<SiteData lang="en-CA" pageId="site-home-page">
					<MockChildComponent />
				</SiteData>
			);
		});
		expect(component.find('button[type="button"]')).toHaveLength(1);
	});

	it('Check refresh() is updating site content with a new siteData set', async () => {
		let component;
		await act(async () => {
			component = await mount(
				// eslint-disable-next-line react/jsx-props-no-spreading
				<SiteData lang="en-CA" pageId="site-home-page">
					{/* <MockChildComponent /> */}
					<MockChildComponent />
				</SiteData>
			);
		});

		// this string is present in the rendering of MockChildComponent when using the default siteData
		expect(component.text()).toMatch('indexPage:{en-CA:{sys:{id:site-home-page}}}');

		mockFetchSiteData.mockReturnValue(refreshedFetchedData);

		await act(async () => {
			await component
				.find('button')
				.first()
				.simulate('click');
		});

		component.update();

		// this string is present in rendering of MockChildComponment when using the Refreshed Fetched Data
		expect(component.text()).toMatch('indexPage:{en-CA:{sys:{id:REFRESHED-site-home-page}}}');
	});
});
