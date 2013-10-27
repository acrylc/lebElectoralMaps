
var whiteBallots = whiteBallots || {};


/* The text content of the page in English */
whiteBallots.contentEn = {
	title : 'The <fc>Power</fc> of the <fh>White Ballot</fh>',
	desc : 'The White Ballot symbolizes a strong refusal of the political system and its ruling regime and the electoral law. It doesn’t have a religious confession and is the only constant voice across Lebanon. ',
	content: [
		{
			time : '2005',
			time_desc : 'The white ballot does not have an electoral voice.'
			// need to add map layer
		},
		{
			time : '2005',
			time_desc : 'The Lebanese government recognizes the white ballot as an electoral voice.'
			// need to add map layer
		},
		{
			time : '2013',
			time_desc : ' What role will the white ballot play in the upcoming elections? '
			// need to add map layer
		}
	]
}

/* The text content of the page in Arabic */
whiteBallots.contentAr = {
	title : 'قوة <fh>الاقتراع بيضاء</fh>',
	desc : 'الاقتراع الأبيض يرمز إلى رفض قوي من النظام السياسي ونظام الحكم والقانون الانتخابي. أنه ليس لديه اعتراف الدينية وصوت الثابت الوحيد في لبنان.',
	content: [
		{
			time : '2005',
			time_desc : 'The white ballot does not have an electoral voice.'
			// need to add map layer
		},
		{
			time : '2005',
			time_desc : 'The Lebanese government recognizes the white ballot as an electoral voice.'
			// need to add map layer
		},
		{
			time : '2013',
			time_desc : ' What role will the white ballot play in the upcoming elections? '
			// need to add map layer
		}
	]
}

/* @desc 
 */
whiteBallots.renderMap = function(){
	// init Map object, bind it to #map div
	var map = L.map('map').setView([33.9, 35], 9);

	// load each layer and add it to the map
	// note that the layer order matters, they overlay each other
	var layerUrls = ['mayakreidieh.map-dfh9esrb', 'mayakreidieh.t1'];
	for (var i=0;i<layerUrls.length;i++){
		var layer = L.mapbox.tileLayer(layerUrls[i]);
		map.addLayer(layer);
	}

}

/* @desc 	Renders the text of the page using the templates and the corresponding text
 * 			Call this function to translate the text to another language
 * @param	lang 	An language, ar or en, defines which text object to display and how to 
 *					style the content (ex. left vs right alignment)
 */
whiteBallots.renderText = function( lang ){

	$('.text_overlay').html('');
	$('.text_overlay.ar').css({'display':'none'});
    var template = $("#text_overlay_template").html();

	if (lang == undefined)
		lang = 'en';
	    $(".text_overlay.en").html(_.template( template,  this.contentEn));
	    $(".text_overlay.ar").html(_.template( template,  this.contentAr));


	// if (lang=='en'){
	//     $(".text_overlay").html(_.template( template,  this.contentEn));
	//     $('.text_overlay').removeClass('ar');
	//     $('.text_overlay').addClass('en');
	// } else {
	//     $(".text_overlay").html(_.template( template,  this.contentAr));
	//     $('.text_overlay').removeClass('en');
	//     $('.text_overlay').addClass('ar');
	// }


}

/* @desc 	Renders the contents of the HTML page by first
 *			displaying the map
 *			then loading the proper content (by lang) and dispalying it
 */
whiteBallots.renderContents = function( lang ){
	
	if (lang == undefined)
		lang = 'en';
	this.renderMap();
	this.renderText(lang);

}

whiteBallots.init= function(){
	whiteBallots.renderContents();
	var that = this;

	$('.langbtn').on('click', function(e){
		console.log( $(e.toElement).attr('id'));
		that.transText($(e.toElement).attr('id'));
	});
}

whiteBallots.transText = function(lang){
	if (lang == 'ar'){
		$('.text_overlay.ar').fadeIn('200');
		$('.text_overlay.en').fadeOut('150');
	} else {
		$('.text_overlay.ar').fadeOut('150');
		$('.text_overlay.en').fadeIn('200');

	}
}

