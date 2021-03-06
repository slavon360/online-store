var keystone = require('keystone');
var ClientOrder = keystone.list('ClientOrder');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '949146703:AAEX0hDtWofS-FMnQ-AOsuA1BhWX3ltajgw';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

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
		const a = `<a href="https://flaviocopes.com/node-http-post/${order._id}">New Order</a>`;
		axios.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=251733133&text=${a}&parse_mode=HTML`)
		.then((res) => {
			
		  })
		  .catch((error) => {
			  
		  })
		// bot.sendMessage(251733133, JSON.stringify(order['товары']));
	})
}