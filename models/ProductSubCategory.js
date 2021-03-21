var keystone = require('keystone');
var Types = keystone.Field.Types;
var ProductSubCategory = new keystone.List('ProductSubCategory', {
	map:{ name: 'title' },
	singular: 'ProductSubCategory',
	plural: 'ProductSubCategories',
	autokey: { path: 'slug', from: 'title', unique: true }
});
  ProductSubCategory.add({
  	title: { type:String, required: true },
  	productCategory: {
  		type: Types.Relationship,
  		ref: 'ProductCategory'
	},
	image:{type:Types.CloudinaryImage},
	'Порядковый номер': { type: Number }
  })
  ProductSubCategory.register()
