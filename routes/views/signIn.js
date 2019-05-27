const keystone = require('keystone');
const bcrypt = require('bcrypt');
const Client = keystone.list('Client');

const generateToken = require('./helpers/commonFunctions').generateToken;
const getCleanUser = require('./helpers/commonFunctions').getCleanUser;
const sendJSONresponse = require('./helpers/commonFunctions').sendJSONresponse;

exports=module.exports=function(req,res){
	const { firstName, lastName, city, phone, email, password } = req.body;
	//res.set('Access-Control-Allow-Headers', 'access-control-allow-origin');
	const hash = bcrypt.hashSync(password.trim(), 10);
	const client = new Client.model({
		firstName,
		lastName,
		city,
		phone,
		email,
		password: hash
	})
	client.save((err, clnt, next) => {
		if (process.env.ALLOWED_ORIGIN === req.headers.origin) {
			res.set('Access-Control-Allow-Credentials', 'true');
			res.set('Access-Control-Allow-Origin', req.headers.origin);

			if (err && err.name === 'MongoError' && err.code === 11000) {
				return sendJSONresponse(res, 409, { error: true, message: 'email must be unique' });
			} else {
				const token = generateToken(clnt);
				res.cookie('authJwtToken', token, { httpOnly: true });
				const cleanClient = getCleanUser(clnt);
				sendJSONresponse(res, 200, { client: cleanClient });
			}
		} else {
			sendJSONresponse(res, 404, { error: true, 'message': 'acces from this origin not allowed' });
		}
	})
}