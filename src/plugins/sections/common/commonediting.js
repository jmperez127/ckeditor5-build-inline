/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */


import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class CommonEditing extends Plugin {

	init() {
		const editor = this.editor;

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

		allowedClasses.forEach((c)=>{
			let name = c.split(' ')[0];
			attrs['model']['values'].push(name)
			attrs['view'][name] = { name: 'div', key: 'class', value: c.split(' ')}
		})

		editor.conversion.attributeToAttribute(attrs);

	}
}
