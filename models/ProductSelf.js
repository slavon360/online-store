
var keystone = require('keystone');
var Types = keystone.Field.Types;
var ProductSelf = new keystone.List('ProductSelf',{
	map:{name:'title'},
	singular:'Продукт',
	plural:'Продукты',
	autokey:{path:'slug',from:'title',unique:true}
});
    ProductSelf.add({
    	title:{type:String,required:true},
    	productSubCategory:{
    		type:Types.Relationship,
    		ref:'ProductSubCategory',
        index:true
    	},
      productCategory:{
            type:Types.Relationship,
            ref:'ProductCategory',
            index:true
        },
      image:{type: Types.CloudinaryImage},
    	'Производитель':{type:String},
    	'Артикул':{type:String},
    	'Тепловая мощность (кВт)':{type:Number},
      'Цена':{type:Number},
			'Страна производитель':{type:String},
			'Назначение котла':{type:String},
			'Способ установки':{type:String},
			'Материал теплообменника':{type:String},
			'Емкость водонагревателя':{type:Number},
			'Тип насоса':{type:String},
			'Глубина':{type:Number},
			'Ширина':{type:Number},
			'Высота':{type:Number},
      'Описание':{type: Types.Html, height: 400},
			createdAt:{ type: Date, default: Date.now() }
    });
    ProductSelf.register();
