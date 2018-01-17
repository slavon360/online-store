var keystone = require('keystone'),
categoryManipulator = require('./helpers/categoryManipulator'),
searchedParam={};
exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res),
	locals = res.locals;
	locals.data={products:[]};
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmit = false;
	categoryManipulator.allItems('Banner','banners',locals);
	categoryManipulator.allItems('ProductCategory','categories',locals,
		function(categid,sync){
			categoryManipulator.mainPageProducts('ProductSelf','products',locals,
			{path:'/',viewName:'index',view:view},categid,
			{searchedKey:'productCategory',localsDataItem:locals.data.categories,localsDataName:'categories'},sync);
			});
	categoryManipulator.allItems('ProductSubCategory','subcategories',locals);	
};
