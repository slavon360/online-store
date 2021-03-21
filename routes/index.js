/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var path = require('path');
var appDir = path.dirname(require.main.filename);
const schedule = require('node-schedule');

var services = require('../updates/services');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

var sendHomePage = function (req, res, next) {
	res.sendFile(appDir + '/public/index.html');
};
var cors_middleware = function (req, res, next) {
	return process.env.NODE_ENV === 'development' ? keystone.middleware.cors(req, res, next) : next();
};

schedule.scheduleJob('30 02 * * *', () => {
	const currentDate = new Date();

	services.findEmptiesPrices();
    services.findProductsWithNonExistedImages();
    services.findAndUpdateDates(currentDate);
	services.makeCurrencyRequest();
});


// Setup Route Bindings
exports = module.exports = function (app) {

	// Views
	app.get('/', sendHomePage);
	
	// app.post('/client-log-in', keystone.middleware.cors, routes.views.logIn);
	// app.get('/re-authenticate', keystone.middleware.cors, routes.views.reauth);
	// app.post('/client-sign-in', keystone.middleware.cors, routes.views.signIn);

	app.get('/getBanners', cors_middleware, routes.views.getBanners);
	app.get('/getCatalog', cors_middleware, routes.views.getCatalog);
	app.get('/list-products', cors_middleware, routes.views.listProducts);
	app.get('/api/product-details/:slug', cors_middleware, routes.views.productDetails);
	app.get('/product-details/:slug', sendHomePage);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.get('/products', routes.views.products);
	app.get('/products/:product', routes.views.product);
	app.get('/about', routes.views.about);
	app.get('/product-categories', routes.views.productCategories);
	app.get('/product-categories/:subcategory', routes.views.productSubCategories);
	app.get('/product-categories/:subcategory/:productself',routes.views.productSelf);
	app.get('/product-exact-category/:categoryname', routes.views.allProducts);
	app.get('/product-exact-category/:categoryname/:productself', routes.views.productSelf);
	app.get('/product-categories/customer-search/search?', routes.views.productSelf);

//  app.post('/product-exact-category/:categoryname', routes.views.addToCart);

	app.get('/shopping-cart', sendHomePage);
	app.get('/order', sendHomePage);
	app.get('/repair', sendHomePage);
	app.post('/make-order', cors_middleware, routes.views.makeOrder);
	app.post('/leave-phone-number', cors_middleware, routes.views.leavePhone);
	app.post('/make-review', cors_middleware, routes.views.makeReview);
	app.get('/list-reviews', cors_middleware, routes.views.listReviews);
	app.get('/search?', cors_middleware, routes.views.searchProducts);

	//app.get('/get-model-props', routes.views.getModelProps);

	app.get('/predefined-filters', routes.views.predefinedFilters);
	app.post('/do-filters-request', routes.views.filtersRequest);
	app.get('/getContacts', cors_middleware, routes.views.getContacts);
	app.get('/services', function (req, res) {
		res.sendFile(appDir + '/landing/index.html');
	});
	app.get('/get-currency-data', cors_middleware, routes.views.getCurrency);

	// keystone.redirect('/landing', './services.html');
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
