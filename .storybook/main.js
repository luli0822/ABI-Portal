module.exports = {
	/* 
	 ** Stories: []  - Used to set where to import stories to be loaded.
	 - NOTE: There is another way to configure loading stories. You can import 	 them in preview.js to add more customized configs (see https://storybook.js.org/docs/basics/writing-stories/#loading-stories for more info)
	 
	 ** addons: [] - Used to configure addons (https://storybook.js.org/docs/addons/introduction/)
	 ** presets: [] - Used to configure storybook presets (https://storybook.js.org/docs/presets/introduction/)
	 */

	stories: ['../components/**/*.stories.jsx', '../components/**/*.stories.js'],
	addons: [
			'./.storybook/CustomDocsAddon/register',
			'@storybook/addon-actions',
			'@storybook/addon-links',
			'@storybook/addon-viewport/register',
			'@storybook/addon-knobs/register',
			'@storybook/addon-a11y/register',
			'@storybook/addon-contexts/register'
		],
	presets: ['@storybook/preset-scss'], // Use scss presets provided by storybook: https://storybook.js.org/docs/presets/preset-gallery/#scss
	//  Another way to build sass by adding custom webpack sass configs 
	// https://storybook.js.org/docs/configurations/custom-webpack-config/#examples
}