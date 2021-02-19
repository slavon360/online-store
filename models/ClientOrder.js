var keystone = require('keystone');
var Types = keystone.Field.Types;

var ClientOrder = new keystone.List('ClientOrder',{
	nocreate:true
})
  ClientOrder.add({
  	'ФИО':{type:String, required:true},
  	email:{type:Types.Email},
  	'телефон':{type:String, required:true},
  	'город':{type:String},
  	'отделение':{type:String},
  	'статус':{type:Types.Select, 
  		options:['Ожидание', 'В обработке', 'Отправлено', 'Отменено', 'Возврат', 'Сделка завершена'],
  	    default:'Ожидание'},
  	'товары':{type:Types.Html, wysiwyg:true},
  	'дата':{type:Date,default:Date.now},
	userAgent:{type:String},
	windowWidth:{type:String}
  });
  ClientOrder.defaultSort = '-дата';
  ClientOrder.defaultColumns = 'ФИО, email, телефон, статус, дата';
  ClientOrder.register();