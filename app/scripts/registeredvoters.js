
content = {};

content.baseMap = 'mayakreidieh.map-dfh9esrb';
content.textTemplateId = '#rv_text_overlay_template';

/* EN */
content.textEn =  {
	title: 'Registered Voters',
	desc : 'The White Ballot symbolizes a strong refusal of the political system and its ruling regime and the electoral law.'
}
/* AR */
content.textAr = {
	title : 'قوة <fh>الاقتراع بيضاء</fh>',
	desc : 'الاقتراع الأبيض يرمز إلى رفض قوي من النظام السياسي ونظام الحكم والقانون الانتخابي. أنه ليس لديه اعتراف الدينية وصوت الثابت الوحيد في لبنان.'
}

content.layers = [];
content.layers[0] =  L.mapbox.tileLayer('mayakreidieh.voter_power');

content.el = 'map';

content.templates = [
		" <div id='tloc'>fnasdklfja ksldfjaslkdfjalsd</div>",
		" <div id='tloc'>{{District}}</div> <div id='tnum'>{{blank_vote}}</div>",
		""
	]

content.legend = {
	template : '#legend_template',
	colors : [
		{color: 'rgba(158,1,66,0.65)', label : '1.5 >'},
		{color: 'rgba(213,62,79,0.65)', label : '1.4 < '},
		{color: 'rgba(244,109,67,0.65)', label : '1.3 < '},
		{color: 'rgba(253,174,97,0.65)', label : '1.2'},
		{color: 'rgba(254,224,139,0.65)', label : '1.1'},
		{color: 'rgba(255,255,200,0.65)', label : '1.05'},
		{color: 'rgba(230,245,152,0.65)', label : '0.95'},
		{color: 'rgba(171,221,164,0.65)', label : '0.8'},
		{color: 'rgba(102,194,165,0.65)', label : '0.7'},
		{color: 'rgba(50,136,189,0.65)', label : '0.6'},
	]

}

registeredVoters = new Map(content);



$('document').ready(function(){
	registeredVoters.init();
	// whiteBallots.init();
});



// 	layers : [
// 		'mayakreidieh.r5',
// 		'mayakreidieh.testt',
// // 		'mayakreidieh.t2'
// // 	], 
// content.templates : [
// 		" <div id='tloc'>{{blanc_2005}}</div> <div id='tnum'>{{blanc_20_1}}</div>",
// 		" <div id='tloc'>{{District}}</div> <div id='tnum'>{{blank_vote}}</div>",
// 		""
// 	]
// }

// Content of text overlay
/* EN */
