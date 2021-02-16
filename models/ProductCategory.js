var keystone = require('keystone');
var Types = keystone.Field.Types;
var ProductCategory = new keystone.List('ProductCategory',{
	map:{name:'title'},
	singular:'ProductCategory',
	plural:'ProductCategories',
	autokey:{path:'slug', from:'title',unique:true}
});
ProductCategory.add({
	title:{type:String,required:true},
	image:{type:Types.CloudinaryImage},
	'Порядковый номер': { type: Number }
});
ProductCategory.relationship({ref:'ProductSelf',path:'title',refPath:'productCategory'})
ProductCategory.register();
