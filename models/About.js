var keystone = require('keystone');
var Types = keystone.Field.Types;
var About = new keystone.List('About',{
	map:{name:'title'},
	singular:'About',
	plural:'Abouts',
	autokey: {path:'slug', from:'title', unique:true}
})

About.add({
	title:{type:String, required:true},
	image:{type: Types.CloudinaryImage},
	mainInfo:{type:Types.Html, height: 500},
	contacts:{type:String}
})

About.register();