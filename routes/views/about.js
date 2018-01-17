var keystone = require('keystone');

exports=module.exports=function(req,res){
	var view = new keystone.View(req,res);
	var locals = res.locals;

	locals.section = 'about';

	view.query('abouts', keystone.list('About').model.find());

	view.render('about');
}