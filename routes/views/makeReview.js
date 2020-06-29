const keystone = require('keystone');
const ClientReview = keystone.list('Review');
// const Product = keystone.list('ProductSelf');

const sendJSONresponse = function(res,status,content){
	res.status(status);
	res.json(content);
}
exports = module.exports = function(req, res, next) {
	const incomingReview = req.body.review;
	const Review = new ClientReview.model({
		'имя': incomingReview.name,
		email: incomingReview.email,
		product: incomingReview.product_id,
		'оценка': incomingReview.rating,
		'достоинства': incomingReview.pros,
		'недостатки': incomingReview.cons,
		'комментарий': incomingReview.comment
	});

	Review.save(function (err, review) {
		if (err) {
			sendJSONresponse(res, 500, { error: err });
			throw err;
		};

		try {
			// const updatedProductData = await Product.model.findById(incomingReview.product_id);
			// const updReviewRates = [...updatedProductData.reviewRates, `${review._id} ${incomingReview.rating}`];
			// const totalRate = updReviewRates.reduce((result, current) => result += + current.split(' ')[1], 0) / updReviewRates.length;

			// updatedProductData.reviewRates = updReviewRates;
			// updatedProductData.totalRate = Math.round(totalRate);
			// await updatedProductData.save();
			sendJSONresponse(res, 200, review);
		} catch (error) {
			res.send(error);
		}
	});
};