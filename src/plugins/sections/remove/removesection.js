import RemoveSectionUI from './removesectionui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class RemoveSection extends Plugin {
	static get requires() {
		return [ RemoveSectionUI ];
	}
}
