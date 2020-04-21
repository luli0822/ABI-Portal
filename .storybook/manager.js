// Use this file to add configration to storybook UI.a Allow settting optional parameters

// Extra docs: https://storybook.js.org/docs/configurations/options-parameter/

import { addons } from '@storybook/addons';
// global optional configs
addons.setConfig({
/**
* show story component as full screen
* @type {Boolean}
*/
isFullscreen: false,
/**
* display panel that shows a list of stories
* @type {Boolean}
*/
showNav: true,
/**
* display panel that shows addon configurations
* @type {Boolean}
*/
showPanel: true,
/**
* where to show the addon panel
* @type {('bottom'|'right')}
*/
panelPosition: 'bottom',
/**
* sidebar tree animations
* @type {Boolean}
*/
sidebarAnimations: true,
/**
* enable/disable shortcuts
* @type {Boolean}
*/
enableShortcuts: true,
/**
* show/hide tool bar
* @type {Boolean}
*/
isToolshown: true,
/**
* theme storybook, see link https://storybook.js.org/docs/configurations/theming/
*/
theme: undefined,
/**
* id to select an addon panel
* @type {String}
*/
selectedPanel: undefined,
});