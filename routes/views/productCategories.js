var keystone = require('keystone');

exports=module.exports=function(req,res){
	var view = new keystone.View(req,res);
	var locals = res.locals;
	locals.section='prodCategories';
	/*
	keystone.list('ProductSubCategory').model.find().exec(function(err,subcat){
		if(err){
			console.log(err);
			return false;
		}
		locals.subCategories=subcat;
		view.query('productCategories', keystone.list('ProductCategory').model.find());
		
	});
	*/
	view.render('product-categories');
	
}