var keystone = require('keystone');
var mongoose = require('mongoose');
module.exports = function(req, res){
  var filters = req.body, queriedObj = {};
  var predefinedQuery = function (clause, filters){
      for (var key in filters){
        var innerObj = {};
        key !== '_id' && (innerObj[clause] = filters[key]);
        key !== '_id' && !queriedObj[key] && (queriedObj[key] = innerObj);
      }
  }
  predefinedQuery('$in', filters);
  keystone.list('ProductSelf')
  .model
  .find(queriedObj)
  .where('productCategory',filters['_id'][0])
  .populate('productCategory', 'slug')
  .limit(10)
  .exec(function(err, products){
    if (err){
      throw err;
    } else {
      res.send(products);
    }
  })
}
