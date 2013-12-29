
// Map content contains 
// @baseMap 	The base map layer (grayscale map)
// @layers		An array The infographic layers
// @templates 	An array of templates that might be called
//				in renderMap or renderText
mapContent = {
	baseMap : 'mayakreidieh.map-dfh9esrb', 
	layers : [
		'mayakreidieh.r5',
		'mayakreidieh.testt',
		'mayakreidieh.t2'
	], 
	templates : [
		" <div id='tloc'>{{blanc_2005}}</div> <div id='tnum'>{{blanc_20_1}}</div>",
		" <div id='tloc'>{{District}}</div> <div id='tnum'>{{blank_vote}}</div>",
		""
	]
}

// Content of text overlay, could include 
//		Title
//		Description
//		Map control detail
/* EN */
contentEn = {
	// title : 'The <fc>Power</fc> of the <fh>White Ballot</fh>',
	// title: '<span style="font-family: serif !important;font-weight:700;font-size:0.8em"> The power of the </span><br> <span style="font-family:Helvetica Neue;font-weight: 100">W H I T E  .  B A L L O T</span>',
	title: 'Registered Voters',
	desc : 'The White Ballot symbolizes a strong refusal of the political system and its ruling regime and the electoral law.'
}
/* AR */
contentAr = {
	title : 'قوة <fh>الاقتراع بيضاء</fh>',
	desc : 'الاقتراع الأبيض يرمز إلى رفض قوي من النظام السياسي ونظام الحكم والقانون الانتخابي. أنه ليس لديه اعتراف الدينية وصوت الثابت الوحيد في لبنان.'
}


registeredVoters = new Map(mapContent, contentEn, contentAr, 'map');

registeredVoters.renderMapCallback = function(){};

$('document').ready(function(){
	// registeredVoters.init();
	 whiteBallots.init();
});

