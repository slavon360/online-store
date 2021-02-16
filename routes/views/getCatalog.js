var keystone=require('keystone');
exports=module.exports=function(req,res){
	keystone
		.list('ProductCategory')
		.model
		.find()
		.sort({ 'Порядковый номер': 1 })
		.exec(function(err,categories){
		if(err){
			console.log(err);
			return false;
		}
		keystone
			.list('ProductSubCategory')
			.model
			.find()
			.sort({ 'Порядковый номер': 1 })
			.exec(function(err,subcategories){
				if(err){
					console.log(err);
					return false;
				}
				var catalog=categories.reduce(function(result,current,index){
					var categItem = {
									categName: current.title,
									categSlug: current.slug,
									categLink: '/product-exact-category/' + current.slug,
									_id: current._id,
									subCategNames: [],
									subCategSlug: [],
									subCategIds: [],
									index: index
								};
									result.push(categItem);
									return result;
				},[]);		
				catalog.map(function(item,index){
					subcategories.forEach(function(i){
						if (item._id && i.productCategory && item._id.toString()===i.productCategory.toString()) {
							item.subCategNames.push(i.title);
							item.subCategSlug.push(i.slug);
							item.subCategIds.push(i._id);
						};
					})
				});
				res.send(catalog);	
		})
	})
}