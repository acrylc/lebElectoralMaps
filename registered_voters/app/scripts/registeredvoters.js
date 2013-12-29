
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
content.layers[0] =  L.mapbox.tileLayer('mayakreidieh.r5');

content.el = 'map';


registeredVoters = new Map(content);

// 	layers : [
// 		'mayakreidieh.r5',
// 		'mayakreidieh.testt',
// 		'mayakreidieh.t2'
// 	], 
// 	templates : [
// 		" <div id='tloc'>{{blanc_2005}}</div> <div id='tnum'>{{blanc_20_1}}</div>",
// 		" <div id='tloc'>{{District}}</div> <div id='tnum'>{{blank_vote}}</div>",
// 		""
// 	]
// }

// Content of text overlay
/* EN */
