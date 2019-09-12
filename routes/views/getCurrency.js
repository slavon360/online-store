var keystone = require('keystone');
var searched_id = process.env.CURRENCY_ID;
const axios = require('axios');

const token = '949146703:AAEX0hDtWofS-FMnQ-AOsuA1BhWX3ltajgw';

module.exports = function(req, res){
    keystone.list('Currency')
    .model
    .findById(searched_id)
    .exec(function(err, currency){
        try {
            axios.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=251733133&text=searched_id:${searched_id}currency:${currency}&parse_mode=HTML`)
                .then((res) => {
                    
                })
                .catch((error) => {
                    
                })
            res.send(currency);
        } catch {
            axios.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=251733133&text=error:${err}&parse_mode=HTML`)
                .then((res) => {
                    
                })
                .catch((error) => {
                    
                })
            console.log(err)
            res.send(err);
        }
    });
}