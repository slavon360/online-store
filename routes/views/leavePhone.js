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
	var products=req.body.products;
	var browserInfo=req.body.browserInfo;
	var newClientOrder=new ClientOrder.model({
			'ФИО':form.customer_full_name,
			'телефон':form.customer_phone,
			'товары':products,
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

// const saveProduct = (products, count) => {
// 	const current_product = products[count++];

// 	if (current_product) {
// 		axios.post(
// 			`http://localhost:3000/keystone/api/product-selves/${current_product.id}`,
// 			null,
// 			{
// 				headers: {
// 					Cookie: req.body.Cookie,
// 					'x-csrf-token': req.body.csrf
// 				}
// 			}
// 			)
// 			.then(res => {
// 				saveProduct(products, count);
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	}
// }
// 	axios.get(
// 		'http://localhost:3000/keystone/api/product-selves?filters=%7B%22productCategory%22%3A%7B%22inverted%22%3Afalse%2C%22value%22%3A%5B%22603609f45f7e0932667fb2f6%22%2C%226037705a191a9d55aa34d3d0%22%2C%22603505e85f7e0932667fb2f5%22%2C%225e1d9239553e78077854861e%22%2C%225e5f7fc3e641a34edd6f1648%22%2C%225e748fc8dfc87768ec999a2b%22%2C%225e5678e47772df0803416450%22%5D%7D%7D&limit=200',
// 		// null,
// 		{
// 			headers: {
// 				accept: 'application/json',
// 				Cookie: req.body.Cookie,
// 				'x-csrf-token': req.body.csrf
// 			},
// 			data: null
// 			// headers: {
// 			// 	'Accept': 'application/json;'
// 			// }
// 		}
// 		)
// 		.then((response) => {
// 			console.log('response: ', response);
// 			// const total_products_count = results.length;
// 			let count = 0;

// 			saveProduct(response.data.results, count);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});