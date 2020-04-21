import mockSiteData from '../../data/__mocks__/siteData.json';

jest.mock('../../data/siteData.json', () => ({ ...mockSiteData }), { virtual: true });

jest.mock('../config');

jest.mock('../../site-config.js');

// TODO: refactor path-map to export the function
// eslint-disable-next-line import/first
import { pathMap, pathsForPageEntry } from '../path-map';

describe('pathMap()', () => {
	it('generates the right paths from staticSiteData', async () => {
		expect(pathMap).toMatchSnapshot();
	});
});

describe('pathsForPageEntry()', () => {
	it('generates the EN and FR links for a page', async () => {
		// get the first page from the mock site data pages
		const reference = mockSiteData.siteEntry.fields.pages['en-CA'][0];
		const paths = pathsForPageEntry(reference);
		expect(paths).toMatchSnapshot();
	});

	it('generates the EN and FR links for an index page', async () => {
		// get the index page from the mock site data
		const reference = mockSiteData.siteEntry.fields.indexPage['en-CA'];
		const paths = pathsForPageEntry(reference, true);
		expect(paths).toMatchSnapshot();
	});
});
