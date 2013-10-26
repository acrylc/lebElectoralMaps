

	// init Map object, bind it to #map div
	var map = L.map('map').setView([33.9, 35], 9);

	// load each layer and add it to the map
	// note that the layer order matters, they overlay each other
	var layerUrls = ['mayakreidieh.map-dfh9esrb', 'mayakreidieh.t1'];
	for (var i=0;i<layerUrls.length;i++){
		var layer = L.mapbox.tileLayer(layerUrls[i]);
		map.addLayer(layer);
	}
