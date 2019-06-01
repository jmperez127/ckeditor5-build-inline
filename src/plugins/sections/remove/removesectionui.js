import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import removeIcon from './removebutton.svg';

export default class RemoveSectionUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;
		// const titlesNames = editor.config.get( 'titlesConfig.types' );
		// const url = editor.config.get('removeSectionConfig.url');



		editor.ui.componentFactory.add('removeSection', locale => {
			// alert("TSTS")
			const button = new ButtonView(locale);

			button.isEnabled = true;
			button.label = t('Remove Section');
			button.icon = removeIcon;
			// button.keystroke = linkKeystroke;
			// button.tooltip = true;

			// // Bind button to the command.
			// button.bind( 'isOn', 'isEnabled' ).to( linkCommand, 'value', 'isEnabled' );

			// // Show the panel on button click.
			// this.listenTo( button, 'execute', () => this._showUI( true ) );
			this.listenTo(button, 'execute', () => {
				if (confirm('Are you sure you want to remove this section?')) {
					// this.editor.config.define('titlesConfig', { types: ['Title', 'Subtitle', 'None'] });
					const url = editor.config.get('removeSectionConfig.url');

					let elem = editor.sourceElement;

					console.log(url, "URL")
					fetch(url, {
						method: 'POST',
						headers: { "Content-Type": "application/json; charset=utf-8" }
					})
						.then(response => response.json())
						.then(response => {
							if (response.success == "true") {
								editor.destroy()
								elem.parentNode.removeChild(elem);
							}

						})
						.catch(err => {
							console.log("u")
							alert("sorry, there are no results for your search")
						});


				}
			});

			return button;
		});

	}
}
