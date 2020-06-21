const keystone = require('keystone');
const ClientReview = keystone.list('Review');

const sendJSONresponse = function(res,status,content){
	res.json(content);
	res.status(status);
};

exports = module.exports = async function(req, res, next) {
    try {
        const reviews = await ClientReview.model.find({ product: req.query.product_id });

        sendJSONresponse(res, 200, reviews);
    } catch (error) {
        sendJSONresponse(res, 500, { error });
    }
};