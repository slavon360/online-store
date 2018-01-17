var keystone = require('keystone');
var Types = keystone.Field.Types;

var ClientMessage=new keystone.List('ClientMessage',{
	nocreate:true,
	noedit:true
});

ClientMessage.add({
	name:{type:String,required:true},
	email:{type:Types.Email,required:true},
	phone:String,
	message:{type:Types.Markdown,required:true},
	createdAt:{type:Date,default:Date.now}
});
ClientMessage.defaultSort='-createdAt';
ClientMessage.defaultColumns='name, email, createdAt';
ClientMessage.register();