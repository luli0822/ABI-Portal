/* eslint-disable react/jsx-props-no-spreading */
// disable this rule because eslint will complain to have @storybook/* as project dependency, not devDependency
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import TileSection from '../index';
import { defaultProps, defaultContent, defaultBlocks } from '../__mocks__/mockProps';

// The default export defines metadata about your component
export default {
	// The name it will show up in the storybook UI navigation panel. IT SHOULD BE UNIQUE
	title: 'Tile Section',
	// The name of the component you will write the story for
	component: TileSection,
	// You can set parameters at the component level (which will override global params)
	// The viewport add on params can be modified per story as the example below
	parameters: {
		// viewport: { defaultViewport: 'desktop' },
	},
	// You can set decorators at the component level (which will override global decorators)
	decorators: [
		// storyFn => <div style={{ border: '1px solid #000', textAlign: 'center' }}>{storyFn()}</div>,
	],
};

// non-Editable default props
export const defaultComponent = () => {
	return (
		<div>
			<TileSection {...defaultProps} />
		</div>
	);
};

/** Example of Editable knobs */
export const EditableComponent = () => {
	const groupId = 'Tiles Section';
	const editableProps = {
		content: {
			...defaultContent,
			title: text('Title', defaultContent.title, groupId),
			body: {
				...defaultContent.body,
				content: [
					{
						...defaultContent.body.content[0],
						content: [
							{
								...defaultContent.body.content[0].content[0],
								value: text('Body', defaultContent.body.content[0].content[0].value, groupId),
							},
						],
					},
				],
			},
			blocks: defaultBlocks.reduce((acc, cur, index) => {
				const curBlock = {
					...cur,
					body: {
						...cur.body,
						content: [
							{
								...cur.body.content[0],
								content: [
									{
										...cur.body.content[0].content[0],
										value: text('Body', cur.body.content[0].content[0].value, `Tile ${index + 1}`),
									},
								],
							},
						],
					},
					title: text('Title', cur.title, `Tile ${index + 1}`),
					primaryLink: cur.primaryMedia,
				};
				if (
					(index === 0 && boolean('Add Tile', true, `Tile 1`)) ||
					(index === 1 && boolean('Add Tile', true, `Tile 2`)) ||
					(index === 2 && boolean('Add Tile', true, `Tile 3`))
				) {
					acc.push(curBlock);
				}
				return acc;
			}, []),
		},
	};
	return (
		<div>
			<TileSection {...editableProps} />
		</div>
	);
};

defaultComponent.story = {
	name: 'Default Component',
	parameters: {
		CustomDocsAddon: defaultProps,
	},
	// You can set decorators at the individual story level (which will override global and component level decorators)
	// decorators: [
	// 	storyFn => <div style={{ backgroundColor: 'red', border: '1px solid red' }}>{storyFn()}</div>,
	// ],
};

EditableComponent.story = {
	name: 'Editable Component',
};
