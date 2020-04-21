import { pageLinkMock, externalLinkMock } from '../../../.storybook/SiteData';

export const navigationEntries = [
	{
		type: 'link',
		link: pageLinkMock,
		text: 'Link 1',
		accessibleText: undefined,
	},
	{
		type: 'link',
		link: externalLinkMock,
		text: 'Link 2',
		accessibleText: undefined,
	},
];

export const defaultProps = {
	navigationEntries,
};
