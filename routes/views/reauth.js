// const keystone = require('keystone');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Client = keystone.list('Client');

// const generateToken = require('./helpers/commonFunctions').generateToken;
// const getCleanUser = require('./helpers/commonFunctions').getCleanUser;
// const sendJSONresponse = require('./helpers/commonFunctions').sendJSONresponse;

// exports=module.exports=function(req,res){
//     let token = req.headers['authorization'];
//     if (!token) return sendJSONresponse(res, 401, { message: 'Must pass token'});
//     token = token.replace('Bearer ', '');
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) throw err;
//         Client
//         .model()
//         .findOne({ email: user.email })
//         .exec((err, client) => {
//             if (err) throw err;
//             const cleanClient = getCleanUser(client);
//             const token = generateToken(client);
//             sendJSONresponse(res, 200, { client: cleanClient, token });

//         })
//     })
// }