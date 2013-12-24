
// Map content contains 
// @baseMap 	The base map layer (grayscale map)
// @layers		An array The infographic layers
// @templates 	An array of templates that might be called
//				in renderMap or renderText
mapContent = {
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


renderMap = function(  yearIndex ){

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

// Content of text overlay, could include 
//		Title
//		Description
//		Map control details
/* EN */
contentEn = {
	// title : 'The <fc>Power</fc> of the <fh>White Ballot</fh>',
	// title: '<span style="font-family: serif !important;font-weight:700;font-size:0.8em"> The power of the </span><br> <span style="font-family:Helvetica Neue;font-weight: 100">W H I T E  .  B A L L O T</span>',
	title: 'REGISTERED VOTERS',
	desc : 'The White Ballot symbolizes a strong refusal of the political system and its ruling regime and the electoral law. It doesn’t have a religious confession and is the only constant voice across Lebanon. '
}

/* AR */
contentAr = {
	title : 'قوة <fh>الاقتراع بيضاء</fh>',
	desc : 'الاقتراع الأبيض يرمز إلى رفض قوي من النظام السياسي ونظام الحكم والقانون الانتخابي. أنه ليس لديه اعتراف الدينية وصوت الثابت الوحيد في لبنان.'
}

registeredVoters = new Map(mapContent, contentEn, contentAr, renderMap);

$('document').ready(function(){
	// baseMap.init();
	registeredVoters.init();
});

