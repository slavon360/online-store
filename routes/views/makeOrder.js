var keystone = require('keystone');
var ClientOrder = keystone.list('ClientOrder');

var sendJSONresponse = function(res,status,content){
	res.json(content);
	res.status(status);
}
exports=module.exports=function(req,res){
	var form=req.body.form;
	var products=req.body.products;
	var newClientOrder=new ClientOrder.model({'ФИО':form.clientname,
                              email:form.clientmail,
                              'город':form.clientcity,
                              'отделение':form.clientpostsection,
                              'телефон':form.clientPhone,
                              'товары':products
         });
	newClientOrder.save(function(err,order){
		if(err){
			throw err;
		};
		sendJSONresponse(res,200,order);		
	})
}