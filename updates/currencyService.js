const keystone = require('keystone');
const axios = require('axios');
// const schedule = require('node-schedule');
const Currency = keystone.list('Currency');
const Products = keystone.list('ProductSelf');

const searched_id = process.env.CURRENCY_ID // each time we should override the same currency instance;
const hideOnSite = 'Не отображать на сайте';

const telegramBotUrl = (token, chatId, link) => {
    return `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${link}&parse_mode=HTML`;
};

const updateDate = (_id, endDate) => {
    Products.model.findOneAndUpdate({ _id }, { 'Конец акции': endDate })
        .exec((err, res) => {
            if (err) {
                return console.error(err);
            }
        })
};

const findAndUpdateDates = (currentDate) => {
    const endOfProposition = currentDate.setDate(currentDate.getDate() + 2);

    Products.model
            .find({ 'Конец акции':{ $lte: currentDate } })
            .select({ _id: 1})
            .exec((err, products_ids) => {
                if (err) {
                    return console.error(err);
                }
                products_ids.forEach((id) => {
                    updateDate(id, endOfProposition);
                });
            });
};

const findProductsWithNonExistedImages = () => {
    Products.model
        .find({ 'image': { "$exists" : false }, [hideOnSite]: false })
        .select({ _id: 1, title: 1 })
        .exec((err, products) => {
            if (err) {
                return console.error(err);
            }
        });
};

const findEmptiesPrices = () => {
    Products.model
            .find({ 'Цена': { $lte: 0 }, [hideOnSite]: false })
            .select({ _id: 1, title: 1 })
            .exec((err, products) => {
                if (err) {
                    return console.error(err);
                }
            });
};

const makeCurrencyRequest = () => {
    axios
        .get(`http://free.currconv.com/api/v7/convert?q=EUR_UAH&compact=ultra&apiKey=${process.env.CURRCONV_KEY}`)
        .then(response => {
            const { data: { EUR_UAH } } = response;
            
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
};

const services = {
    makeCurrencyRequest,
    telegramBotUrl,
    findAndUpdateDates,
    findProductsWithNonExistedImages,
    findEmptiesPrices
};

module.exports = services;