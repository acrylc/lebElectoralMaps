var baseMap = baseMap || {};

// The content of the map, including the tilemill layer
// and the template to fill the text overlay
baseMap.mapContent = {
	layers : [
		'mayakreidieh.map-dfh9esrb'
	], 
	templates : [
		" <div id='tloc'>{{blanc_2005}}</div> <div id='tnum'>{{blanc_20_1}}</div>",
		" <div id='tloc'>{{District}}</div> <div id='tnum'>{{blank_vote}}</div>",
		""
	]
}


baseMap.renderMap = function() {
	this.base_map = L.map('map').setView([33.9, 35], 9);
	this.base_map.addLayer( L.mapbox.tileLayer(this.mapContent.baseMap));
}

baseMap.renderText = function(){


}

baseMap.renderContents = function(){
	this.renderMap();
	this.renderText();
}

baseMap.init = function(){
	this.renderContents();
}