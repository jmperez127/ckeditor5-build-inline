import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import axios from 'axios'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import removeIcon from './removebutton.svg';

export default class RemoveSectionUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add('removeSection', locale => {
			const button = new ButtonView(locale);

			button.isEnabled = true;
			button.label = t('Remove Section');
			button.icon = removeIcon;

			this.listenTo(button, 'execute', () => {
				if (confirm('Are you sure you want to remove this section?')) {

					const url = editor.config.get('removeSectionConfig.url');

					let elem = editor.sourceElement;

					axios.delete(url).then(response => {
						if(typeof(window.deleteSection) != 'undefined')
							window.deleteSection(elem);
						console.log("RESPONSE FROM CK", elem, response)
						console.log(elem.parentElement, elem.parentNode)
						editor.destroy()
						elem.parentNode.removeChild(elem);
						// elem.parentElement.removeChild(elem);


					}).catch((error) => {
						console.log(error)
						alert("sorry, there are no results for your search")
					})


				}
			});

			return button;
		});

	}
}
