
import Command from '@ckeditor/ckeditor5-core/src/command';
import { isBoolean } from 'util';

export default class AttributeCommand extends Command {
	
	constructor( editor, attributeKey ) {
		super( editor );

		this.attributeKey = attributeKey;
		this.prevVal= null;

	}

	refresh() {
		const model = this.editor.model;
		const doc = model.document;

		this.value = this._getValueFromFirstAllowedNode();
		
		this.isEnabled = model.schema.checkAttributeInSelection( doc.selection, this.attributeKey );
	}

	execute( options = {} ) {
		this.value = this._getValueFromFirstAllowedNode();
		const model = this.editor.model;
		const doc = model.document;
		const selection = doc.selection;
		const boolValue = ( options.forceValue === undefined ) ? !this.value : options.forceValue;
		const value = options.value;

		let self = this;

		model.change( writer => {
			if ( selection.isCollapsed ) {
				if ( value ) {
					writer.setSelectionAttribute( this.attributeKey, false );
				} else {
					writer.removeSelectionAttribute( this.attributeKey );
				}
			} else {
				const ranges = model.schema.getValidRanges( selection.getRanges(), this.attributeKey );

				for ( const range of ranges ) {
					if ( value ) {

						if ( typeof(selection.getAttribute("titles")) == 'undefined')
							writer.setAttribute( this.attributeKey, value, range );
						else if(self.prevVal == value )
							writer.clearAttributes(range)
						else
							writer.setAttribute( this.attributeKey, value, range );
					} else {
						writer.removeAttribute( this.attributeKey, range );
					}

					self.prevVal = value; 
				}
			}
			
		} );
	}

	_getValueFromFirstAllowedNode() {
		const model = this.editor.model;
		const schema = model.schema;
		const selection = model.document.selection;

		if ( selection.isCollapsed ) {
			return selection.hasAttribute( this.attributeKey );
		}

		for ( const range of selection.getRanges() ) {
			for ( const item of range.getItems() ) {
				if ( schema.checkAttribute( item, this.attributeKey ) ) {
					return item.hasAttribute( this.attributeKey );
				}
			}
		}

		return false;
	}
}
