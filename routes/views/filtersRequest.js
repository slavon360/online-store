var keystone = require('keystone');
var predefinedQuery = require('./helpers/commonFunctions').predefinedQuery;
var arraysOfObjPropsIntoString = require('./helpers/commonFunctions').arraysOfObjPropsIntoString;
module.exports = function(req, res){
  var filters = req.body, queriedObj = {};
  var keyValues = Object.assign({}, filters);
      delete keyValues['_id'];
  arraysOfObjPropsIntoString(keyValues);
  predefinedQuery('$in', filters, queriedObj);
  console.log('queriedObj: ', queriedObj, 'filters: ', filters);
  queriedObj.productCategory = filters['_id'][0];
  keystone.list('ProductSelf')
  .paginate({
    page:req.query.page || 1,
    perPage:6,
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
