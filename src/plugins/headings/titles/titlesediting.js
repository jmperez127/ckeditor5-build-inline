/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module basic-styles/titles/titlesediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import AttributeCommand from '../attributecommand';

const TITLES = 'titles';

export default class TitlesEditing extends Plugin {

	init() {
		const editor = this.editor;
		// Allow titles attribute on text nodes.
		editor.model.schema.extend('$text', { allowAttributes: TITLES });
		editor.model.schema.setAttributeProperties(TITLES, { isFormatting: true });

		console.log(editor.model.schema, "SCHEMA")

		// Build converter from model to view for data and editing pipelines.
		this.editor.config.define('titlesConfig', { types: ['Title', 'Subtitle', 'None'] });

		editor.conversion.attributeToElement({
			model: {
				key: TITLES,
				values: [
					'Title', 'Subtitle', 'HeaderTitle',
					'HeaderSubtitle', 'DescriptionParagraph',
					'BrokerName', 'BrokerEmail'
				],
				name: '$text'
			},
			view: {
				Title: {
					name: 'h1',
					classes: 'letter_title'
				},
				Subtitle: {
					name: 'h1',
					classes: 'section_first_subtitle'
				},
				HeaderTitle: {
					name: 'h1',
					classes: 'title'
				},
				HeaderSubtitle: {
					name: 'h1',
					classes: 'subtitle'
				},
				DescriptionParagraph: {
					name: 'p',
					classes: 'description'
				},
				BrokerName: {
					name: 'p',
					classes: 'broker_name'
				},
				BrokerEmail: {
					name: 'p',
					classes: 'broker_email'
				}
			},
			// upcastAlso: [
			// 	'b',
			// 	{
			// 		styles: {
			// 			'font-weight': 'titles'
			// 		}
			// 	}
			// ]
		});

		// editor.conversion.attributeToElement({
		// 	model: 'TITLES',
		// 	view: {
		// 		name: 'h1',
		// 		classes: 'teal'
		// 	},
		// 	upcastAlso: [
		// 		'b',
		// 		{
		// 			styles: {
		// 				'font-weight': 'titles'
		// 			}
		// 		}
		// 	]
		// });

		// Create titles command.
		editor.commands.add(TITLES, new AttributeCommand(editor, TITLES));

		// Set the Ctrl+B keystroke.
		editor.keystrokes.set('CTRL+B', TITLES);
	}
}
