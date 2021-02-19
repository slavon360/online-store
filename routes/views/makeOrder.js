var keystone = require('keystone');
var ClientOrder = keystone.list('ClientOrder');
const axios = require('axios');
const services = require('../../updates/services');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN;
const chat_id = process.env.TELEGRAM_CHATID;

// Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   console.log(msg);

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(251733133, 'Received your message');
// });

var sendJSONresponse = function(res,status,content){
	res.json(content);
	res.status(status);
}
exports=module.exports=function(req,res, next){
	var form=req.body.form;
	var products=req.body.products;
	var browserInfo=req.body.browserInfo;
	var newClientOrder=new ClientOrder.model({'ФИО':form.customer_full_name,
                              email:form.customer_email,
                              'город':form.customer_city,
                              'отделение':form.clientpostsection,
                              'телефон':form.customer_phone,
                              'товары':products,
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