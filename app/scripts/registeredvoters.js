
content = {};

content.baseMap = 'mayakreidieh.map-dfh9esrb';
content.textTemplateId = '#rv_text_overlay_template';

/* EN */
content.textEn =  {
	title: 'Voter Power',
	desc : ''
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

var options = {};
options.legend = {
	template : '#legend_template',
	colors : [
		{color: 'rgb(158,1,66)', label : '1.5'},
		{color: 'rgb(213,62,79)', label : '1.4'},
		{color: 'rgb(244,109,67)', label : '1.3'},
		{color: 'rgb(253,174,97)', label : '1.2'},
		{color: 'rgb(254,224,139)', label : '1.1'},
		{color: 'rgb(255,255,200)', label : '1.05'},
		{color: 'rgb(230,245,152)', label : '0.95'},
		{color: 'rgb(171,221,164)', label : '0.8'},
		{color: 'rgb(102,194,165)', label : '0.7'},
		{color: 'rgb(50,136,189)', label : '0.6'},
	]

}

voterPower = new Map(content, options);



$('document').ready(function(){
	voterPower.init();
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
