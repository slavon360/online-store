var keystone = require('keystone');
var categoryManipulator = require('./helpers/categoryManipulator');
exports=module.exports=function(req,res){
	var view = new keystone.View(req,res);
	var locals = res.locals;
	locals.section='prodCategories';
	locals.filters={
		product:req.params.subcategory,
		pathname:req._parsedUrl.pathname
	};
	locals.data={
		products:[]
	};
	view.on('init',function(next){
		categoryManipulator.specificCategBySlug(locals.filters.product,'ProductSubCategory')
		.then(function(result){
	   keystone.list('ProductSelf')
		 .paginate({
		 	page:req.query.page || 1,
		 	perPage:8,
		 	filters:{
		 		'productSubCategory':result._id
		 	}
		 })
	   .exec(function(err,subcat){
	   	locals.data.products=subcat;
	   	next(err);
	   })
		});

	});
	   view.render('prod-sub-cat');
}
