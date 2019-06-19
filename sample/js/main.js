
var editors = {}
function upcase(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

function createEditor(element) {
	return InlineEditor
		.create(document.querySelector(element))
		.then(editor => {

			editor.config.define('removeSectionConfig', { url: 'http://' + window.location.hostname + '/deals/1/webpages/1/sections' });

			editors[element] = editor;
			CKEditorInspector.attach(editor);
			editor.model.document.on('change:data', function (e, e2, e3) {
				if(!document.querySelector("#bookmark")) return;
				var elementId = editor.sourceElement.id
				var sectionIndex = parseInt(elementId.replace("section", "")) + 1;
				var textSelector = document.querySelector("#bookmark")
					.querySelector('a:nth-child(' + sectionIndex + ')')
					.querySelector('div:first-child')
				try {
					var content = editor.getData().match(/<h1.*<\/h1>/)
					content = content[0].replace(/<h1(\sclass="(.*)">|)/, '').replace("</h1>", "");
					textSelector.innerHTML = upcase(content);
				} catch (error) {
					textSelector.innerHTML = "";
					console.log(error)
				}
			});

			editor.ui.focusTracker.on('change:isFocused', (evt, name, isFocused) => {

				if (isFocused) {
					console.log(editor);

					// Do whatever you want with current editor data:
				}
			});
		})
		.catch(err => console.error(err.stack));
}

$('.footer-toolbar .minimize').click(function () {
	if ($(this).parent().hasClass('footer-toolbar-minimized'))
		$('.footer-toolbar').removeClass('footer-toolbar-minimized');
	else
		$('.footer-toolbar').addClass('footer-toolbar-minimized');
})

var counter = 1;
$("#add-section").click(function () {
	$("#main-container").append($('#new-section').html());
	$("#main-container .section").last().attr("id", "section" + counter);
	var elem = "#section" + counter;
	createEditor(elem);
	var title = $(elem + " h1").text();
	$('#bookmark').append(
		"<a href='" + elem + "' class='link-block w-inline-block'><div id='" + elem + "_menu' class='anchor_link'>" + title + "</div></a>"
	);
	$('html, body').animate({ scrollTop: $(elem).offset().top }, 1000);
	counter++;

	$(elem).on('.letter_title', function (e) {
		alert('Changed!')
	});
})

		// createEditor("#title");
		// createEditor("#letter");
