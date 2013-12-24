Map = function( mapContent, contentEn, contentAr, renderMapFunc ){
	this.mapContent = mapContent;
	this.contentEn = contentEn;
	this.contentAr = contentAr;
	this.renderMap = renderMapFunc;
}



Map.mapContent = {};


/* @desc 	Renders the text of the page using the templates and the corresponding text
 * 			Call this function to translate the text to another language
 * @param	lang 	An language, ar or en, defines which text object to display and how to 
 *					style the content (ex. left vs right alignment)
 */
Map.prototype.renderText = function( lang ){

	$('.text_overlay').html('');
	$('.text_overlay.ar').css({'display':'none'});
    var template = $("#text_overlay_template").html();
    var template2 = $("#time_section_template").html();

	if (lang == undefined)
		lang = 'en';
	$(".text_overlay.en").html(_.template( template,  this.contentEn));
	$(".text_overlay.ar").html(_.template( template,  this.contentAr));

}


/* @desc 	Renders the contents of the HTML page by first
 *			displaying the map
 *			then loading the proper content (by lang) and dispalying it
 */
Map.prototype.renderContents = function( lang ){
	
	if (lang == undefined)
		lang = 'en';
	this.renderMap();
	this.renderText(lang);
}

Map.prototype.init = function(){
	this.renderContents();
	var that = this;

	$('.langbtn').on('click', function(e){
		that.transText($(e.toElement).attr('id'));
	});
}

Map.prototype.transText = function(lang){
	if (lang == 'ar'){
		$('#ar').html('EN');
		$('#ar').attr('id', 'en');
		$('.text_overlay.ar').fadeIn('200');
		$('.text_overlay.en').fadeOut('150');
	} else {
		$('#en').html('ع');
		$('#en').attr('id', 'ar');

		$('.text_overlay.ar').fadeOut('150');
		$('.text_overlay.en').fadeIn('200');
	}
}
