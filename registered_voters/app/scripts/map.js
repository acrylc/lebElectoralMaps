Map = function( mapContent, contentEn, contentAr, containerElement ){
	this.mapContent = mapContent;
	this.contentEn = contentEn;
	this.contentAr = contentAr;
	this.el = containerElement;
};


Map.mapContent = {};

/* @desc 	Renders the text of the page using the templates and the corresponding text
 * 			Call this function to translate the text to another language
 * @param	lang 	An language, ar or en, defines which text object to display and how to 
 *					style the content (ex. left vs right alignment)
 */
Map.prototype._renderMap = function(  layerIndex  ){

	if (layerIndex == undefined){
		// init Map object, bind it to #map div
		this.map = L.map(this.el).setView([33.9, 35], 9);
		this.map.scrollWheelZoom.disable();

		// load each layer and add it to the map
		// note that the layer order matters, they overlay each other
		this.map.addLayer( L.mapbox.tileLayer(this.mapContent.baseMap));
		layerIndex = 0;
	}

	for (var i=0;i<this.mapContent.layers.length;i++){
		var layer = L.mapbox.tileLayer(this.mapContent.layers[i]);
		if ( (this.map.hasLayer(layer)) && i!==layerIndex){
			map.removeLayer(layer);
			console.log('removing layer');
		}
		if (!this.map.hasLayer(layer) && i==layerIndex){
			console.log('adding layer '+i);
			this.map.addLayer( layer );
			var tooltipTemplate = this.mapContent.templates[ layerIndex ];
			var gridLayer = L.mapbox.gridLayer( this.mapContent.layers[ layerIndex ] ).addTo(this.map);
			var gridControl = L.mapbox.gridControl(gridLayer, {template: tooltipTemplate, follow: false,}).addTo(this.map);
		}
	}

	this.renderMapCallback();
	
}

/* @desc 	Renders the text of the page using the templates and the corresponding text
 * 			Call this function to translate the text to another language
 * @param	lang 	An language, ar or en, defines which text object to display and how to 
 *					style the content (ex. left vs right alignment)
 */
Map.prototype._renderText = function( lang ){

	$('.text_overlay').html('');
	$('.text_overlay.ar').css({'display':'none'});
    var template = $("#text_overlay_template").html();
    var template2 = $("#time_section_template").html();

	if (lang == undefined)
		lang = 'en';
	$(".text_overlay.en").html(_.template( template,  this.contentEn));
	$(".text_overlay.ar").html(_.template( template,  this.contentAr));

	this.renderTextCallback();

}

Map.prototype._renderLegend = function(){

}

/* 
 * @desc 	Renders the contents of the HTML page by first
 *			displaying the map
 *			then loading the proper content (by lang) and dispalying it
 * @param	lang 	The language of the rendered content, 'en' renders English
 * 					'ar' renders arabic. Default language is English
 */
Map.prototype.renderContents = function( lang ){
	
	if (lang == undefined)
		lang = 'en';
	this._renderMap();
	this._renderText(lang);
	this._renderLengend();
}

/* 
 * @desc 	Translates the text content
 * @param	lang 	The language of the rendered content, 'en' translates to English
 * 					'ar' translates to arabic. Default is English
 */
Map.prototype.transText = function(lang){
	if (lang == 'ar'){
		$('#ar').html('EN');
		$('#ar').attr('id', 'en');
		$('.text_overlay.ar').fadeIn('10');
		$('.text_overlay.en').fadeOut('10');
	} else {
		$('#en').html('ع');
		$('#en').attr('id', 'ar');

		$('.text_overlay.ar').fadeOut('10');
		$('.text_overlay.en').fadeIn('10');
	}
}

Map.prototype.init = function(){
	this.renderContents();
	var that = this;

	$('.langbtn').on('click', function(e){
		that.transText($(e.toElement).attr('id'));
	});
}

