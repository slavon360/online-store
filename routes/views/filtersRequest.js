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
  queriedObj.productCategory = filters['_id'][0];
  console.log(queriedObj)
  keystone.list('ProductSelf')
  .paginate({
    page:req.query.page || 1,
    perPage:9,
    filters:queriedObj
  })
  //.model
  //.find(queriedObj)
//  .where('Производитель','Ariston')
  //.where('productCategory',filters['_id'][0])
  .populate('productCategory', 'slug')
  .exec(function(err, products){
    if (err){
      throw err;
    } else {
      console.log(products)
      res.send(products);
    }
  })
}
