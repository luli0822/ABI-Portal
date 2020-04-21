// Use this file to add any gloabl story configs (such as decorators, parameters, etc)
// Note than you can also set these configs at the component or individual story level in the story file

import { addParameters, addDecorator } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from "@storybook/addon-knobs";
// Use the same contentful context, Creating a new context won't work
import siteDataContext from '../contentful/siteDataContext';
import { SiteData } from './SiteData';
// Add project reset styles
import '../scss/master.scss';
// Mock next/router to allow using next/link.
import './mockNextRouter';
/**  
 	DECORATORS (https://storybook.js.org/docs/basics/writing-stories/#decorators)
  A way to wrap a story with a common set of components, for example if you want to wrap a story in some formatting, or provide some context to the story.
*/
const customViewports = {
	mobile: {
		name: 'Mobile',
		styles: {
			width: '320px',
			height: '568px'
		}
	},
	tablet: {
		name: 'Tablet',
		styles: {
			width: '768px',
			height: '1024px'
		}
	},
	laptop: {
		name: 'Laptop',
		styles: {
			width: '1200px',
			height: '1024px'
		}
	},
	desktop: {
		name: 'Desktop',
		styles: {
			width: '1366px',
			height: '1024px'
		}
	},
	wide: {
		name: 'Wide',
		styles: {
			width: '1920px',
			height: '1080px'
		}
	}
};

addParameters({
	viewport: {
		// You can set initial viewports and add your custom viewports.
		viewports: {...customViewports, ...INITIAL_VIEWPORTS, },
		// defaultViewport: 'desktop'   // you can set the defaultViewport globally as needed
	},
	// set Docs as default open panel
	options: {
		selectedPanel: 'storybook/CustomDocsAddon/panel',
	},
});

// Example global decorator
// addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>);

// Context wrapper for all stories
addDecorator(StoryFn => {
	return (
		<siteDataContext.Provider value={SiteData}>
			<StoryFn />
		</siteDataContext.Provider>
	);
},)
addDecorator(withA11y);
addDecorator(withKnobs({ escapeHTML: false }))