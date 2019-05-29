import HeaderEditing from './headerediting';
import HeaderUI from './headerui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Header extends Plugin {
	static get requires() {
		return [ HeaderEditing, HeaderUI ];
	}
}
