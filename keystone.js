// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
// var handlebars = require('express-handlebars');
// var mongo_instance = require('mongoose');

// mongo_instance.connect(process.env.MONGO_URL, { useFindAndModify: false });
// mongo_instance.connection.on('error', function () {
//   console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
//   process.exit(1);
// });
// mongo_instance.connection.on('open', function (ref) {
// 	console.log('REEF: ', ref);
// });

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

// cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET
// });

keystone.init({
	'less': ['public', 'public-app'],
	'port': process.env.NODE_ENV === 'development' ? 3000 : 80,
	// 'mongoose': mongo_instance,
	'name': 'keystoneApp',
	'brand': 'keystoneApp',
	'sass': 'public',
	'static': ['public', 'landing'],
	// 'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	// 'view engine': '.hbs',
	'cookie secret': 'slavon-123',
	'cloudinary config': `cloudinary://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@${process.env.CLOUDINARY_NAME}`,
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

if (process.env.NODE_ENV === 'development') {
	keystone.set('cors allow origin', true);
	keystone.set('cors allow methods', true);
	keystone.set('cors allow headers', true);
}

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});
keystone.set('adminui custom styles', './public/styles/keystone.less');

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	users: 'users',
	'Продукция': ['product-categories','product-sub-categories','product-selves'],
	'Заказы': 'client-orders',
	'Баннеры': 'banners',
	'Курс': 'currencies'
});

// Start Keystone to connect to your database and initialise the web server

console.log(process.env.MONGO_URL);

keystone.start();
