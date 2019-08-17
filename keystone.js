// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
// var handlebars = require('express-handlebars');
var cloudinary = require('cloudinary');
var mongo_instance = require('mongoose');

mongo_instance.connect(process.env.MONGO_URL, { useFindAndModify: false });
mongo_instance.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
mongo_instance.connection.on('open', function (ref) {
	console.log('REEF: ', ref);
})

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

cloudinary.config({
	cloud_name: 'dxnslfgii',
	api_key: '712556615644867',
	api_secret: '4nF764o7kB98DEbb0b9YPnAicrQ',
});

keystone.init({
	'mongoose': mongo_instance,
	'name': 'keystoneApp',
	'brand': 'keystoneApp',
	'sass': 'public',
	'static': ['public', 'landing'],
	// 'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	// 'view engine': '.hbs',
	'cookie secret': 'slavon-123',
	'cloudinary config': 'cloudinary://712556615644867:4nF764o7kB98DEbb0b9YPnAicrQ@dxnslfgii',
	// 'custom engine': handlebars.create({
	// 	layoutsDir: 'templates/views/layouts',
	// 	partialsDir: 'templates/views/partials',
	// 	defaultLayout: 'default',
	// 	helpers: new require('./templates/views/helpers')(),
	// 	extname: '.hbs',
	// }).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

keystone.set('cors allow origin', true);
keystone.set('cors allow methods', true);
keystone.set('cors allow headers', true);

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	users: 'users',
	'Продукция': ['product-categories','product-sub-categories','product-selves'],
	'Заказы':'client-orders',
	'Баннеры':'banners'
});

// Start Keystone to connect to your database and initialise the web server



keystone.start();
