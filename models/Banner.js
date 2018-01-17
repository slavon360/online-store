var keystone = require('keystone');
var Types = keystone.Field.Types;
var Banner = new keystone.List('Banner',{
	map:{name:'категория'},
	singular:'Баннер',
	plural:'Баннеры',
    autokey:{path:'slug', from:'ссылка'}
});
    Banner.add({
    	image:{type:Types.CloudinaryImage},
    	'категория':{type:String},
    	'ссылка':{type:String},
    	'содержимое':{type: Types.Html, wysiwyg: true, height: 150 }
    })
    Banner.register();