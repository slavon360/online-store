const keystone = require('keystone');
const axios = require('axios');
const schedule = require('node-schedule');
const Currency = keystone.list('Currency');

const searched_id = process.env.CURRENCY_ID // each time we should override the same currency instance;

const makeCurrencyRequest = () => {
    schedule.scheduleJob('54 01 * * *', () => {
        axios
            .get(`https://free.currconv.com/api/v7/convert?q=EUR_UAH&compact=ultra&apiKey=${process.env.CURRCONV_KEY}`)
            .then(response => {
                const { data: { EUR_UAH } } = response;
                console.log(EUR_UAH);
                Currency.model.findOneAndUpdate(
                    { _id: searched_id },
                    { price: EUR_UAH },
                    { upsert: true },
                    function (error, currency) {
                        if (error) {
                            throw new Error(error);
                        }
                        console.log(currency);
                    });
            })
            .catch(error => {
                console.error(error);
            })
      })
};

module.exports = makeCurrencyRequest;