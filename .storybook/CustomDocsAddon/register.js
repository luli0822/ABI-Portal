import React from 'react';
import { addons, types } from '@storybook/addons';
import { useParameter } from '@storybook/api';
import { AddonPanel } from '@storybook/components';
import CustomDocs from './CustomDocs';

const ADDON_ID = 'CustomDocsAddon';
const PARAM_KEY = 'CustomDocsAddon';
const PANEL_ID = `${ADDON_ID}/panel`;

const MyPanel = () => {
	// You can uncomment this line to get fields edited in the knobs
	// const storybookState = useStorybookState();
	// const knobParams = storybookState.customQueryParams

	const value = useParameter(PARAM_KEY, null);
	return (value && <CustomDocs value={value}/>)
};

addons.register(ADDON_ID, api => {
	const render = ({ active, key }) => (
		<AddonPanel active={active} key={key}>
			<MyPanel />
		</AddonPanel>
	);
	addons.add(PANEL_ID, {
		type: types.PANEL,
		title: 'Docs',
		render,
		paramKey: PARAM_KEY,
	});

});


