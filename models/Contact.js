var keystone = require('keystone');
var Types = keystone.Field.Types;
var Contact = new keystone.List('Contact', {
    label: 'Контакты',
	map: { name: 'телефон' },
	singular: 'Контакты',
	plural: 'Контакты'
});
    Contact.add({
    	image: { type: Types.CloudinaryImage },
    	'телефон': { type: String },
    	'email': { type: Types.Email },
		'дополнительная информация': { type: String }
    });
    Contact.defaultColumns = 'телефон, email';

    Contact.register();