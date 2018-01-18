var keystone = require('keystone');
var categoryManipulator = require('./helpers/categoryManipulator');
exports=module.exports=function(req,res){
	var view = new keystone.View(req,res);
	var locals = res.locals;
	locals.section='prodCategories';
	locals.filters={
		productsSlug:req.params.categoryname,
		pathname:req._parsedUrl.pathname
	};
	locals.data={
		products:[]
	};
	view.on('init',function(next){
		categoryManipulator.specificCategBySlug(locals.filters.productsSlug,'ProductCategory')
		 .then(function(result){
		 	keystone.list('ProductSelf')
		 	.paginate({
				page:req.query.page || 1,
				perPage:8,
				filters:{
					'productCategory':result._id
				}
			})
		 	.exec(function(err,products){
		 		locals.data.products=products;
		 		next(err);
		 	})
		 })
	});
	view.render('allProducts');
}
