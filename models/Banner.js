var keystone = require('keystone');
var Types = keystone.Field.Types;
var Banner = new keystone.List('Banner',{
	map: { name: 'название' },
	singular: 'Баннер',
	plural: 'Баннеры',
    autokey: { path: 'slug', from: 'ссылка' }
});
    Banner.add({
    	image: { type: Types.CloudinaryImage },
    	'название': { type: String },
    	'ссылка': { type: String },
		'описание': { type: String },
		'дополнительное описание': { type: String }
    })
    Banner.register();