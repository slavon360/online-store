var keystone = require('keystone');
var categoryManipulator = require('./helpers/categoryManipulator');
exports=module.exports=function(req,res){
	var locals = res.locals;
	locals.filters={
		allProducts:req.query.allProducts
	};
	locals.data={};
		keystone.list('ProductSelf')
		.model
		.find({'title':{$in:locals.filters.allProducts}})
		.exec(function(err,products){
			console.log(products)
			categoryManipulator.allCateg('ProductCategory').then(
				function(categories){
					var updatedProducts=products.map(function(item){
						for(var i=0;i<categories.length;i++){
							if(item.productCategory.toString() === categories[i]._id.toString()){
									var obj=JSON.parse(JSON.stringify(item));
									obj.parentSlug=categories[i].slug;
								return obj;
							}
						}
					});
					res.send(updatedProducts);
				})
		});

}
