Map = function( content, options ){
	this.content = content;
	options = options || {};
	this.control = options.control || function(){};
};

/* @desc 	Renders the text of the page using the templates and the corresponding text
 * 			Call this function to translate the text to another language
 * @param	lang 	An language, ar or en, defines which text object to display and how to 
 *					style the content (ex. left vs right alignment)
 */
Map.prototype._renderMap = function(  layerIndex  ){

	if (layerIndex == undefined){
		// init Map object, bind it to #map div
		this.map = L.map(this.content.el).setView([33.9, 35], 9);
		this.map.scrollWheelZoom.disable();

		// load each layer and add it to the map
		// note that the layer order matters, they overlay each other
		this.map.addLayer( L.mapbox.tileLayer(this.content.baseMap));
		layerIndex = 0;
	}

	// Add first infographic layer
	this.map.addLayer(this.content.layers[0]);


	// for (var i=0;i<this.content.layers.length;i++){
	// 	var layer = L.mapbox.tileLayer(this.content.layers[i]);
	// 	if ( (this.map.hasLayer(layer)) && i!==layerIndex){
	// 		map.removeLayer(layer);
	// 		console.log('removing layer');
	// 	}
	// 	if (!this.map.hasLayer(layer) && i==layerIndex){
	// 		console.log('adding layer '+i);
	// 		this.map.addLayer( layer );
	// 		var tooltipTemplate = this.content.templates[ layerIndex ];
	// 		var gridLayer = L.mapbox.gridLayer( this.content.layers[ layerIndex ] ).addTo(this.map);
	// 		var gridControl = L.mapbox.gridControl(gridLayer, {template: tooltipTemplate, follow: false,}).addTo(this.map);
	// 	}
	// }
	
}

/* @desc 	Renders the text of the page using the templates and the corresponding text
 * 			Call this function to translate the text to another language
 * 			Calls an optional control() after rendering to add any control to the text overlay
 * @param	lang 	An language, ar or en, defines which text object to display and how to 
 *					style the content (ex. left vs right alignment)
 */
Map.prototype._renderText = function( lang ){

	$('.text_overlay').html('');
	$('.text_overlay.ar').css({'display':'none'});
    var template = $( this.content.textTemplateId ).html();

	if (lang == undefined)
		lang = 'en';
	$(".text_overlay.en").html(_.template( template,  this.content.textEn));
	$(".text_overlay.ar").html(_.template( template,  this.content.textAr));

	this.control();

}

Map.prototype._renderLegend = function(){
    var template = $( '#legend_template' ).html();

	for (var i = 0;i<this.content.legend.colors.length;i++){
		console.log(this.content.legend.colors[i]);
		$('.legend.inner').append(_.template( template,  this.content.legend.colors[i]));
	}
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
	this._renderLegend();
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

