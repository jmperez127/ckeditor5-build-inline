import CommonEditing from './commonediting';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Common extends Plugin {
	static get requires() {
		return [ CommonEditing ];
	}
}
