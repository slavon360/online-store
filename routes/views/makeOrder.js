var keystone = require('keystone');
var ClientOrder = keystone.list('ClientOrder');

var sendJSONresponse = function(res,status,content){
	res.json(content);
	res.status(status);
}
exports=module.exports=function(req,res, next){
	var form=req.body.form;
	var products=req.body.products;
	var newClientOrder=new ClientOrder.model({'ФИО':form.customer_full_name,
                              email:form.customer_email,
                              'город':form.customer_city,
                              'отделение':form.clientpostsection,
                              'телефон':form.customer_phone,
                              'товары':products
         });
	newClientOrder.save(function(err,order){
		if(err){
			sendJSONresponse(res, 500, { error: 'Internal Server Error' });
			throw err;
		};
		sendJSONresponse(res,200,order);		
	})
}