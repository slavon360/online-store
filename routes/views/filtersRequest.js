var keystone = require('keystone');
var mongoose = require('mongoose');
var predefinedQuery = require('./helpers/commonFunctions').predefinedQuery;
module.exports = function(req, res){
  var filters = req.body, queriedObj = {};
  var keyValues = Object.assign({}, filters);
      delete keyValues['_id'];
      console.log(keyValues)
      for (var k in keyValues){
        keyValues[k] = keyValues[k].join(',');
      }
  predefinedQuery('$in', filters, queriedObj);
  queriedObj.productCategory = filters['_id'][0];
  console.log(queriedObj);
  keystone.list('ProductSelf')
  .paginate({
    page:req.query.page || 1,
    perPage:3,
    filters:queriedObj
  })
  .populate('productCategory', 'slug')
  .exec(function(err, products){
    if (err){
      throw err;
    } else {
      products.queries = keyValues;
      res.send(products);
    }
  })
}
