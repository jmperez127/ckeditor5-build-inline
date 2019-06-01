import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';

import titlesIcon from '../../theme/icons/code.svg';

const TITLES = 'titles';

export default class TitlesUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;
		const titlesNames = editor.config.get( 'titlesConfig.types' );

		editor.ui.componentFactory.add( TITLES, locale => {
			const dropdownView = createDropdown( locale );

			// // Populate the list in the dropdown with items.
			addListToDropdown( dropdownView, getDropdownItemsDefinitions( titlesNames ) );

			dropdownView.buttonView.set( {
					// The t() function helps localize the editor. All strings enclosed in t() can be
					// translated and change when the language of the editor changes.
					label: t( 'Titles' ),
					tooltip: true,
					withText: true
			} );

			// Execute the command when the dropdown item is clicked (executed).
			this.listenTo( dropdownView, 'execute', evt => {
					editor.execute( 'titles', { value: evt.source.commandParam } );
					editor.editing.view.focus();
			} );

			return dropdownView;


			const command = editor.commands.get( TITLES );
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Title' ),
				// icon: titlesIcon,
				withText: true,
				keystroke: 'CTRL+B',
				tooltip: true
			} );

			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			// Execute command.
			this.listenTo( view, 'execute', () => editor.execute( TITLES ) );

			return view;
		} );
	}
}


function getDropdownItemsDefinitions( titlesNames ) {
	const itemDefinitions = new Collection();

	for ( const name of titlesNames ) {
			const definition = {
					type: 'button',
					model: new Model( {
							commandParam: name,
							label: name,
							withText: true
					} )
			};

			// Add the item definition to the collection.
			itemDefinitions.add( definition );
	}

	return itemDefinitions;
}
