var keystone = require('keystone');
var productProperties = require('./helpers/productProperties');

//mongoose.set('debug', true);
exports=module.exports=function(req,res){
	var view = new keystone.View(req,res);
	var locals = res.locals;
	locals.section = 'prodCategories';
	locals.filters={};
	req.query.dataslug ? locals.filters.productSlug=req.query.dataslug : locals.filters.productSlug=req.params.productself;
	locals.data={
		products:[]
	};
	view.on('init', function(next){
		keystone.list('ProductSelf')
		.model
		.findOne({'slug':locals.filters.productSelf || locals.filters.productSlug})
		.populate('productCategory')
		.exec(function(err,product){
			locals.data.product=product;
			locals.data.product.productsProps=productProperties.productsProps(product);
			//console.log(locals.data.product.productsProps);
			console.log(locals.data.product)
			next(err);
		});
	});
	view.render('productSelf');
}
