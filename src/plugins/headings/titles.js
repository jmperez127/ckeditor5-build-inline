
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import TitlesEditing from './titles/titlesediting';
import TitlesUI from './titles/titlesui';

export default class Titles extends Plugin {

	static get requires() {
		return [ TitlesEditing, TitlesUI ];
	}

	static get pluginName() {
		return 'Titles';
	}
}
