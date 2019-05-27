var keystone = require('keystone');
var Types = keystone.Field.Types;

var Client = new keystone.List('Client');

Client.add({
    firstName: { type: String, index: true },
    lastName: { type: String, index: true },
    phone: { type: String, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
    password: { type: String },
    city: { type: String, initial: true, required: true }
});

Client.register();
