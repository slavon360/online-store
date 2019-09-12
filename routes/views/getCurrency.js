var keystone = require('keystone');
var searched_id = process.env.CURRENCY_ID;

module.exports = function(req, res){
    keystone.list('Currency')
    .model
    .findById(searched_id)
    .exec(function(err, currency){
        try {
            res.send(currency);
        } catch {
            console.log(err)
            res.send(err);
        }
    });
}