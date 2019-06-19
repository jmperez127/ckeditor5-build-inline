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

		// editor.model.schema.register('GenericDiv', {
		// 	inheritAllFrom: '$block',
		// 	allowAttributesOf: '$block',
		// 	isLimit: true,
		//  });
		//  editor.conversion.elementToElement({
		// 	model: 'GenericDiv',
		// 	view: 'div',
		// 	converterPriority: 'low'
		// });

		 editor.model.schema.register('Section', {
			// inheritAllFrom: '$block',
			// isLimit: true,
			isBlock: true,
			allowContentOf: ['$root', '$text', '$block'],

			allowIn: ['$root', '$text', '$block'],
			// allowAttributesOf: '$block',
			allowAttributes: ['class'],
			// isLimit: true
		 });
		editor.conversion.elementToElement({
			model: 'Section',
			view: 'div',
			converterPriority: 'high'
		});
		// editor.model.schema.extend( 'div', {
			// allowAttributes: 'class'
		// } );

		const allowedClasses = ["a4_portrait w-clearfix", "pdf-container", "main_cover", "cover_logo",
		"title_and_broker", "subtitle", "gradient", "attachments_image_first",
		"footer", "cover_footer w-clearfix", "full_address", "header", "page-subtitle",
		"header_spec", "attachments_image_second", "summary w-clearfix", "left_column",
		"space-profile", "summary_title account_color", "summary_row w-clearfix",
		"left-column", "summary_spec_title", "right-column", "value_spec", "right_column w-clearfix",
		"property-overview", "features", "highlight_bullet", "footer_normal w-clearfix", "one_photo_row",
		"attachments_image_third", "two_photo_row w-clearfix", "attachments_image_fourth",
		"attachments_image_fifth", "gallery_section w-clearfix", "interior_photo_1", "interior_photo_2",
		"interior_photo_3", "interior_photo_4", "interior_photo_5", "interior_photo_6", "title-1",
		"attachments_layout", "map_area", "map", "attachments_aerial", "footer-toolbar",
		"section summary_section w-row ckeditor"]

		let attrs = {
			model: {
				name: 'Section',
				key: 'class',
				values: []
			},
			view: {}
		}

		classes.forEach((c)=>{
			let name = c.split(' ')[0];
			attrs['model']['values'].push(name)
			attrs['view'][name] = { name: 'div', key: 'class', value: c.split(' ')}
		})

		console.log("ATTRS", attrs)
		editor.conversion.attributeToAttribute(attrs);

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
