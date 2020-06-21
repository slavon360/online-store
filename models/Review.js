var keystone = require('keystone');
var Types = keystone.Field.Types;

var Review = new keystone.List('Review', {
	singular: 'Отзыв',
	plural: 'Отзывы'
});
const Product = keystone.list('ProductSelf');

const updateTotalRate = rates => rates.reduce((result, current) => result += + current.split(' ')[1], 0) / rates.length;
const updateProductRateData = async doc => {
	const updatedProduct = await Product.model.findById(doc.product);
	updatedProduct.reviewRates = updatedProduct.reviewRates.filter(rate => !rate.includes(doc._id));

	if (!updatedProduct.reviewRates.length) {
		updatedProduct.totalRate = 0;
	} else {
		const totalRate = updateTotalRate(updatedProduct.reviewRates);

		updatedProduct.totalRate = Math.round(totalRate);
	}
	
	try {
		await updatedProduct.save();
	} catch (error) {
		throw new Error(error);
	}
}

Review.add({
	'имя': { type: String, required: true, default: '' },
	product: {
		type: Types.Relationship,
		ref: 'ProductSelf',
		index: true
	},
	email:{ type: Types.Email },
	'оценка': { type: String },
	'достоинства': { type: String },
	'недостатки': { type: String },
	'комментарий': { type: String, required: true, default: '' },
	active: { type: Boolean, default: false },
	'дата':{ type: Date, default: Date.now }
});

Review.schema.post('remove', function (doc) {
	updateProductRateData(doc);
});

Review.schema.post('save', async function (doc) {
	if (doc.active) {
		console.log(doc.active, doc);
		const updatedProductData = await Product.model.findById(doc.product);
		const updReviewRates = [...updatedProductData.reviewRates, `${doc._id} ${doc['оценка']}`];
		const totalRate = updateTotalRate(updReviewRates);

		updatedProductData.reviewRates = updReviewRates;
		updatedProductData.totalRate = Math.round(totalRate);
		
		try {
			await updatedProductData.save();
		} catch (error) {
			throw new Error(error);
		}
	} else if (!doc.active) {
		updateProductRateData(doc);
	}
});

Review.defaultSort = '-дата';
Review.defaultColumns = 'имя, email, дата';
Review.register();