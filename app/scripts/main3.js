
var registeredVoters = registeredVoters || {};

registeredVoters.mapContent = {
	baseMap : 'mayakreidieh.map-dfh9esrb', 
	layers : [
		'mayakreidieh.r3',
		'mayakreidieh.testt',
		'mayakreidieh.t2'
	], 
	templates : [
		" <div id='tloc'>{{blanc_2005}}</div> <div id='tnum'>{{blanc_20_1}}</div>",
		" <div id='tloc'>{{District}}</div> <div id='tnum'>{{blank_vote}}</div>",
		""
	]
}

/* @desc 
 */
registeredVoters.renderMap = function(  yearIndex ){

	if (yearIndex == undefined){
		// init Map object, bind it to #map div
		this.map = L.map('map2').setView([33.9, 35], 9);
		this.map.scrollWheelZoom.disable();

		// load each layer and add it to the map
		// note that the layer order matters, they overlay each other
		this.map.addLayer( L.mapbox.tileLayer(this.mapContent.baseMap));
		this.map.addLayer( L.mapbox.tileLayer(this.mapContent.layers[0]));
		var tooltipTemplate = " <div id='tloc'>{{blanc_2005}}</div> <div id='tnum'>{{blanc_20_1}}</div>"
		var gridLayer = L.mapbox.gridLayer('mayakreidieh.t4').addTo(this.map);
		var gridControl = L.mapbox.gridControl(gridLayer, {template: tooltipTemplate, follow: false,}).addTo(this.map);

	} else {

		for (var i=0;i<this.mapContent.layers.length;i++){
			var layer = L.mapbox.tileLayer(this.mapContent.layers[i]);
			console.log(layer);
			console.log(this.map);
			console.log(this.map.hasLayer(layer));
			if ( (this.map.hasLayer(layer)) && i!==yearIndex){
				map.removeLayer(layer);
				console.log('removing layer');
			}
			if (!this.map.hasLayer(layer) && i==yearIndex){
				this.map.addLayer( layer );
				var tooltipTemplate = this.mapContent.templates[ yearIndex ];
				var gridLayer = L.mapbox.gridLayer( this.mapContent.layers[ yearIndex ] ).addTo(this.map);
				var gridControl = L.mapbox.gridControl(gridLayer, {template: tooltipTemplate, follow: false,}).addTo(this.map);
			}
		}
	}
}

//ok
/* @desc 	Renders the text of the page using the templates and the corresponding text
 * 			Call this function to translate the text to another language
 * @param	lang 	An language, ar or en, defines which text object to display and how to 
 *					style the content (ex. left vs right alignment)
 */
registeredVoters.renderText = function( lang ){

	$('.text_overlay').html('');
	$('.text_overlay.ar').css({'display':'none'});
    var template = $("#text_overlay_template").html();
    var template2 = $("#time_section_template").html();

	if (lang == undefined)
		lang = 'en';
	$(".text_overlay.en").html(_.template( template,  this.contentEn));
	$(".text_overlay.ar").html(_.template( template,  this.contentAr));

}

//ok
/* @desc 	Renders the contents of the HTML page by first
 *			displaying the map
 *			then loading the proper content (by lang) and dispalying it
 */
registeredVoters.renderContents = function( lang ){
	
	if (lang == undefined)
		lang = 'en';
	this.renderMap();
	this.renderText(lang);
}

//ok
registeredVoters.init = function(){
	registeredVoters.renderContents();
	var that = this;

	$('.langbtn').on('click', function(e){
		that.transText($(e.toElement).attr('id'));
	});
}

//ok
registeredVoters.transText = function(lang){
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
	baseMap.init();
	registeredVoters.init();
});

