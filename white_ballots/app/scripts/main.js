
var whiteBallots = whiteBallots || {};


/* The text content of the page in English */
whiteBallots.contentEn = {
	title : 'The <fc>Power</fc> of the <fh>White Ballot</fh>',
	desc : 'The White Ballot symbolizes a strong refusal of the political system and its ruling regime and the electoral law. It doesn’t have a religious confession and is the only constant voice across Lebanon. ',
	content: [
		{
			ttime : '2005',
			time_desc : 'The white ballot does not have an electoral voice.'
			// need to add map layer
		},
		{
			ttime : '2005',
			time_desc : 'The Lebanese government recognizes the white ballot as an electoral voice.'
			// need to add map layer
		},
		{
			ttime : '2013',
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
			ttime : '2005',
			time_desc : 'The white ballot does not have an electoral voice.'
			// need to add map layer
		},
		{
			ttime : '2005',
			time_desc : 'The Lebanese government recognizes the white ballot as an electoral voice.'
			// need to add map layer
		},
		{
			ttime : '2013',
			time_desc : ' What role will the white ballot play in the upcoming elections? '
			// need to add map layer
		}
	]
}

whiteBallots.map = {
	baseMap : 'mayakreidieh.map-dfh9esrb', 
	layers : [
		'mayakreidieh.t1',
		'mayakreidieh.t1',
		'mayakreidieh.t1'
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
    var template2 = $("#time_section_template").html();

	if (lang == undefined)
		lang = 'en';
	$(".text_overlay.en").html(_.template( template,  this.contentEn));
	$(".text_overlay.ar").html(_.template( template,  this.contentAr));

    for (var i=0;i<this.contentEn.content.length;i++){
	    $(".text_overlay.en").append(_.template( template2, { text : this.contentEn.content[i], layer : this.map.layers[i]} ));
	    $(".text_overlay.ar").append(_.template( template2, { text : this.contentAr.content[i], layer : this.map.layers[i]} ));
    }

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

whiteBallots.init = function(){
	whiteBallots.renderContents();
	var that = this;

	$('.langbtn').on('click', function(e){
		that.transText($(e.toElement).attr('id'));
	});
}

whiteBallots.transText = function(lang){
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


$('document').ready(function(){
	whiteBallots.init();
});

