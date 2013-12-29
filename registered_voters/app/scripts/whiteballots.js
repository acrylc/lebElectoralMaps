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

whiteBallots = new Map(mapContent, contentEn, contentAr, 'map');

whiteBallots.renderTextCallback = function(){
    var template2 = $("#time_section_template").html();

    var ids=['2005text', '2009text']
    for (var i=0;i<this.contentEn.content.length;i++){

	    $(".text_overlay.en").append(_.template( template2, { id : ids[i] , text : this.contentEn.content[i], layer : this.mapContent.layers[i]} ));
	    $(".text_overlay.ar").append(_.template( template2, { id : ids[i] , text : this.contentAr.content[i], layer : this.mapContent.layers[i]} ));
    }

    $('#2005text.time_section').append('<div class="control" id="2005"></div>');
    $('#2009text.time_section').append('<div class="control" id="2009_invalid">INVALID</div>');
    $('#2009text.time_section').append('<div class="control" id="2009_white">WHITE</div>');

    var that = this;
    $('#2005.control').on('click', function(){
    	that.map.removeLayer(that.markers[1]);
    	that.map.removeLayer(that.markers[2]);
    	that.map.addLayer(that.markers[0]);
    })    
    $('#2009_invalid.control').on('click', function(){
    	that.map.removeLayer(that.markers[0]);
    	that.map.removeLayer(that.markers[2]);
    	that.map.addLayer(that.markers[1]);
    })
    $('#2009_white.control').on('click', function(){
    	that.map.removeLayer(that.markers[0]);
    	that.map.removeLayer(that.markers[1]);
    	that.map.addLayer(that.markers[2]);
    	console.log('clicked');
    })

};

var featuresToMarkerLayer = function(features, category){

   var max = 1700;
   var min = features[0].properties[category];

  
	for (var i=0;i<features.length;i++){
		if (features[i].properties[category] > max)
			max = features[i].properties[category];
		if (features[i].properties[category] < min)
			min = features[i].properties[category];
	}

	markers = new L.markerClusterGroup(({
	
	iconCreateFunction: function(cluster) {
		console.log(cluster.getAllChildMarkers()[0].data );
		var total = 0;
		for(var i=0;i<cluster.getAllChildMarkers().length;i++){
			total += Number(cluster.getAllChildMarkers()[i].data);
		}
		var col = ((total-min)/(max-min)*-1*(66-0)+66);
		if (col < 0 )col = 0;
    	return new L.DivIcon({ html: '<p style ="background-color:hsla('+ col +',75%,45%,0.7);border-color:hsla('+ col +',40%,35%,0.6)" ><span>' + total + '</span></p>' , className:'my-div-icon2'});
	}
	}));

	for (var i=0;i<features.length;i++){
		geojsonFeature = features[i];
		var myIcon =  L.divIcon({
			className: 'my-div-icon',
			html: '<p style="background-color:hsla('+ ((features[i].properties[category]-min)/(max-min)*-1*(66-0)+66) +',75%,45%,0.6)"><span>'+features[i].properties[category]+'</span></p>'
		});

		var marker = new L.marker(new  L.latLng( [geojsonFeature.geometry.coordinates[1],geojsonFeature.geometry.coordinates[0]]), {icon:myIcon});
		marker.data = features[i].properties[category];
		markers.addLayer(marker);
	}
	return markers;
}



whiteBallots.renderMapCallback = function(){

	whiteBallots.markers = [];

	// Get 2005 invalid votes, set marker layer  0
	// And display marker layer
	$.getJSON('assets/2005.geojson', function(response){
		whiteBallots.markers[0] = featuresToMarkerLayer(response.features, "invalid_votes");
		whiteBallots.map.addLayer(whiteBallots.markers[0]);
	});

	// Get 2009 white votes, set marker layer 1
	$.getJSON('2009_white_ballots.geojson', function(response){
		whiteBallots.markers[1] = featuresToMarkerLayer(response.features, "blank_vote");
	});

	// Get 2009 invalid votes, set marker layer 2
	$.getJSON('2009_white_ballots.geojson', function(response){
		whiteBallots.markers[2] = featuresToMarkerLayer(response.features, "invalid_vote");
	});



}
