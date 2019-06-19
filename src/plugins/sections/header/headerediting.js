import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class HeaderEditing extends Plugin {
	init() {
		this._defineSchema();
		this._defineConverters();

	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register('title', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,

			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block'
		});

		schema.register('subtitle', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,

			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block'
		});


		schema.register('header', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,

			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block'
		});

		schema.register('headerContainer', {
			allowAttributes: ['alt', 'data', 'data-type', 'class', 'classes'],
			// Behaves like a self-contained object (e.g. an image).
			// isLimit: true,
			isBlock: true,
			isObject: true,
			// isObject: true,
			allowIn: 'header',

			// Allow in places where other blocks are allowed (e.g. directly in the root).
			// allowWhere: '$block'
			allowContentOf: '$root'
		});


		schema.register('titlesContainer', {
			// Behaves like a self-contained object (e.g. an image).
			// isObject: true,
			isLimit: true,
			allowIn: 'headerContainer',

			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$root',
			// allowWhere: '$block',
		});


		schema.register('headerTitle', {
			// Cannot be split or left by the caret.
			isLimit: true,

			allowIn: 'titlesContainer',

			// Allow content which is allowed in blocks (i.e. text with attributes).
			allowContentOf: '$block'
		});

		schema.register('headerSubtitle', {
			// Cannot be split or left by the caret.
			isLimit: true,

			allowIn: 'titlesContainer',

			// Allow content which is allowed in blocks (i.e. text with attributes).
			allowContentOf: '$block'
		});

		schema.register('headerImage', {
			// Cannot be split or left by the caret.
			isLimit: true,

			allowIn: 'headerContainer',

			// Allow content which is allowed in the root (e.g. paragraphs).
			allowContentOf: '$root'
		});

	}


	_defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.elementToElement( {
            model: 'header',
            view: {
                name: 'section',
				classes: 'hero'
            }
        } );

		conversion.elementToElement( {
            model: 'headerContainer',
            view: {
				name: 'div',
                classes: 'title-column'
            }
		} );

		// conversion.elementToElement({
		// 	model: 'a4_portrait',
		// 	view: {
		// 		name: 'div',
		// 		classes: 'a4_portrait'
		// 	}
		// })

		conversion.elementToElement( {
            model: 'title',
            view: {
				name: 'h2',
                classes: 'title'
            }
		} );
		conversion.elementToElement( {
            model: 'subtitle',
            view: {
				name: 'h2',
                classes: 'subtitle'
            }
		} );

		// conversion.attributeToAttribute( {
		// 	model: {
		// 		key: 'alt',
		// 		values: [ 'test' ]
		// 	},
		// 	view: {
		// 		test: {
		// 			key: 'class',
		// 			value: 'test'
		// 		}
		// 	}
		// } );

		conversion.attributeToAttribute( {
			model: {
				key: 'class',
				values: [ 'title-column' ]
			},
			view: {
				'title-column': {
					key: 'style',
					value: 'color:red'
				}
			}
		} );


		conversion.elementToElement( {
            model: 'titlesContainer',
            view: {
                name: 'div',
				classes: 'showcase_info',
				styles: 'transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); opacity: 1; transform-style: preserve-3d;'
            }
        } );

        conversion.elementToElement( {
            model: 'headerTitle',
            view: {
                name: 'h1',
                classes: 'title'
            }
        } );

        conversion.elementToElement( {
            model: 'headerSubtitle',
            view: {
                name: 'h1',
                classes: 'subtitle'
            }
        } );

        conversion.elementToElement( {
            model: 'headerImage',
            view: {
                name: 'div',
				classes: 'main_image w-col w-col-8',
				styles: 'opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;'
            }
        } );
    }
}


{/* <div id="header" class="hero w-row">
    <div class="title-column w-col w-col-4">
      <div data-w-id="facc241e-7c55-957f-9a57-19a41afd0b30" style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); opacity: 1; transform-style: preserve-3d;" class="showcase_info">
        <h1 class="subtitle">March 2017</h1>
        <h1 class="title">BTS - Lease Proposal </h1>
      </div>
    </div>
    <div data-w-id="774acf5a-1e91-2b3a-64c6-da1eb1365d3f" style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;" class="main_image w-col w-col-8"><a href="#" class="tour_property w-button">Tour this property</a></div>
  </div> */}
