var keystone = require('keystone');
var categoryManipulator = require('./helpers/categoryManipulator');
var commonFunctions = require('./helpers/commonFunctions');
exports=module.exports=function(req,res){
	var view = new keystone.View(req,res);
	var locals = res.locals;
	var filtersData = {}, finalFilters = {}, optionalParams;
	var objQueryLength = commonFunctions.getObjectLength(req.query);
	if (objQueryLength > 1){
		filtersData = Object.assign({}, req.query);
		optionalParams = Object.assign({}, filtersData);
		delete optionalParams.page;
		optionalParams = commonFunctions.transformIntoQueriesUrl(optionalParams);
		commonFunctions.stringsOfObjPropsIntoArray(filtersData);
		delete filtersData.page;
		commonFunctions.predefinedQuery('$in', filtersData, finalFilters);
	}
	locals.section='prodCategories';
	locals.filters={
		productsSlug: req.params.categoryname,
		pathname: req._parsedUrl.pathname,
		optionalParams: optionalParams
	};
	locals.data={
		products:[]
	};
	view.on('init',function(next){
		categoryManipulator.specificCategBySlug(locals.filters.productsSlug,'ProductCategory')
		 .then(function(result){
			finalFilters.productCategory = result._id;
		 	keystone.list('ProductSelf')
		 	.paginate({
				page:req.query.page || 1,
				perPage:3,
				filters:finalFilters
			})
		 	.exec(function(err,products){
		 		locals.data.products=products;
				console.log(locals, req.query, filtersData, finalFilters, optionalParams)
		 		next(err);
		 	})
		 })
	});
	view.render('allProducts');
}
