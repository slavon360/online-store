var keystone = require('keystone');
var ClientOrder = keystone.list('ClientOrder');
const axios = require('axios');
const services = require('../../updates/services');

const token = process.env.TELEGRAM_TOKEN;
const chat_id = process.env.TELEGRAM_CHATID;

var sendJSONresponse = function(res,status,content){
	res.json(content);
	res.status(status);
}
exports=module.exports=function(req,res, next){
	var form=req.body.form;
	var browserInfo=req.body.browserInfo;
	var newClientOrder=new ClientOrder.model({
			'ФИО':form.customer_full_name,
			'телефон':form.customer_phone,
			'город':form.customer_city,
			'описание проблемы':form.customer_note,
			userAgent: browserInfo.userAgent,
			windowWidth: browserInfo.windowWidth
		 });
	newClientOrder.save(function(err,order){
		if(err){
			sendJSONresponse(res, 500, { error: 'Internal Server Error' });
			throw err;
		};
		sendJSONresponse(res,200,order);
		const orderLink = `<a href="http://voda-teplo-service.com/keystone/client-orders/${order._id}">New order</a>`;
		const mode = 'parse_mode=HTML';
		const botUrl = services.telegramBotUrl(token, chat_id, orderLink, mode);
		axios.post(botUrl)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			})
			// bot.sendMessage(251733133, JSON.stringify(order['товары']));
	})
}