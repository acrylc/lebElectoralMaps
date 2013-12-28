mapContent = {
	baseMap : 'mayakreidieh.map-dfh9esrb', 
	layers : [
		// 'mayakreidieh.t7',
		// 'mayakreidieh.testt',
		// 'mayakreidieh.t2'
	], 
	templates : [
		" <div id='tloc'>{{blanc_2005}}</div> <div id='tnum'>{{blank_vote}}</div>",
		" <div id='tloc'>{{District}}</div> <div id='tnum'>{{blank_vote}}</div>",
		""
	]
}

/* The text content of the page in English */
contentEn = {
	// title : 'The <fc>Power</fc> of the <fh>White Ballot</fh>',
	// title: '<span style="font-family: serif !important;font-weight:700;font-size:0.8em"> The power of the </span><br> <span style="font-family:Helvetica Neue;font-weight: 100">W H I T E  .  B A L L O T</span>',
	title: '<span style="font-family: Helvetica Neue !important;font-weight:700;font-size:0.8em"> THE POWER OF THE </span><br> <span style="font-family:Helvetica Neue;font-weight: 100">W H I T E  .  B A L L O T</span>',
	desc : 'The White Ballot symbolizes a strong refusal of the political system and its ruling regime and the electoral law. It doesn’t have a religious confession and is the only constant voice across Lebanon. ',
	content: [
		{
			ttime : '2005',
			time_desc : 'The white ballot does not have an electoral voice.'
			// need to add map layer
		},
		{
			ttime : '2009',
			time_desc : 'The Lebanese government recognizes the white ballot as an electoral voice.'
			// need to add map layer
		}
	]
}

/* The text content of the page in Arabic */
contentAr = {
	title : 'قوة <fh>الاقتراع بيضاء</fh>',
	desc : 'الاقتراع الأبيض يرمز إلى رفض قوي من النظام السياسي ونظام الحكم والقانون الانتخابي. أنه ليس لديه اعتراف الدينية وصوت الثابت الوحيد في لبنان.',
	content: [
		{
			ttime : '2005',
			time_desc : 'The white ballot does not have an electoral voice.'
			// need to add map layer
		},
		{
			ttime : '2009',
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

whiteBallots = new Map(mapContent, contentEn, contentAr);

whiteBallots.renderTextCallback = function(){
	    var template2 = $("#time_section_template").html();

	    for (var i=0;i<this.contentEn.content.length;i++){
	    $(".text_overlay.en").append(_.template( template2, { text : this.contentEn.content[i], layer : this.mapContent.layers[i]} ));
	    $(".text_overlay.ar").append(_.template( template2, { text : this.contentAr.content[i], layer : this.mapContent.layers[i]} ));
    }

    // On clicking a new year, display the map layer or data for that year
    $(".time_section").on('click', function(e){
    	var layerUrl = $(e.currentTarget).data(); 
    	console.log(layer);
		var layer = L.mapbox.tileLayer(layerUrl);
		this.map.addLayer(layer);
    });
};

whiteBallots.renderMapCallback = function(){

	$.getJSON('2009_white_ballots.geojson', function(response){
       whiteBallotData = response;
       whiteBallots.min = 0;
       whiteBallots.max = 13994;


       var max = 13994/4;
       var min = whiteBallotData.features[0].properties.blank_vote;

      
		for (var i=0;i<whiteBallotData.features.length;i++){
			if (whiteBallotData.features[i].properties.blank_vote > max)
				max = whiteBallotData.features[i].properties.blank_vote;
			if (whiteBallotData.features[i].properties.blank_vote < min)
				min = whiteBallotData.features[i].properties.blank_vote;
		}

              markers = new L.markerClusterGroup(({
			iconCreateFunction: function(cluster) {
				console.log(cluster.getAllChildMarkers()[0].data );
				var total = 0;
				for(var i=0;i<cluster.getAllChildMarkers().length;i++){
					total += Number(cluster.getAllChildMarkers()[i].data);
				}
				var col = ((total-min)/(max-min)*(360-220)+220);
				if (col >= 360 )col = 360;
		    	return new L.DivIcon({ html: '<p style ="background-color:hsla('+ col +',70%,55%,0.6);border-color:hsla('+ col +',40%,25%,0.6)" ><span>' + total + '</span></p>' , className:'my-div-icon2'});
			}
		}));

		for (var i=0;i<whiteBallotData.features.length;i++){
       	// whiteBallotData.features[i].geometry.type = "Point";
       	// whiteBallotData.features[i].geometry.coordinates = whiteBallotData.features[i].geometry.coordinates[0][0];
       	geojsonFeature = whiteBallotData.features[i];
       	var myIcon =  L.divIcon({
       		className: 'my-div-icon',
       		html: '<p style="background-color:hsla('+ ((whiteBallotData.features[i].properties.blank_vote-min)/(max-min)*(360-220)+220) +',70%,55%,0.6)"><span>'+whiteBallotData.features[i].properties.blank_vote+'</span></p>'
       	});
  
       	var marker = new L.marker(new  L.latLng( [geojsonFeature.geometry.coordinates[1],geojsonFeature.geometry.coordinates[0]]), {icon:myIcon});
       	marker.data = whiteBallotData.features[i].properties.blank_vote;
       	markers.addLayer(marker);

       	       // L.geoJson(geojsonFeature).addTo(whiteBallots.map);

       }
       whiteBallots.map.addLayer(markers);
       whiteBallots.data = whiteBallotData;





	})

}
