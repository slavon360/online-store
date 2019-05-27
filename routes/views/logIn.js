const keystone = require('keystone');
const bcrypt = require('bcrypt');
const Client = keystone.list('Client');

const generateToken = require('./helpers/commonFunctions').generateToken;
const getCleanUser = require('./helpers/commonFunctions').getCleanUser;
const sendJSONresponse = require('./helpers/commonFunctions').sendJSONresponse;

exports=module.exports=function(req,res){
	const { email, password } = req.body;
    Client
    .model
    .findOne({ email })
    .exec((err, client) => {
        if (process.env.ALLOWED_ORIGIN === req.headers.origin){
            res.set('Access-Control-Allow-Credentials', 'true');
            res.set('Access-Control-Allow-Origin', req.headers.origin);
            if (err) throw err;
            if (!client) {
                return sendJSONresponse(res, 404, { error: true, message: 'Username or Password is Wrong' });
            }
            bcrypt.compare(password, client.password, (err, valid) => {
                if (err) throw err;
                if (!valid) {
                    return sendJSONresponse(res, 404, { error: true, message: 'Username or Password is Wrong' });
                }
                const token = generateToken(client);
                res.cookie('authJwtToken', token, { httpOnly: true });
                const cleanClient = getCleanUser(client);
                sendJSONresponse(res, 200, { client: cleanClient });
            });
        } else {
			sendJSONresponse(res, 404, { error: true, 'message': 'acces from this origin not allowed' });
		}
    })
}