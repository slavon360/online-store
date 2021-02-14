var keystone = require('keystone');
var searched_id = process.env.CURRENCY_ID;
var Currency = keystone.list('Currency');

var updatePriceValue = function(key, currencyRate, product) {
  const finalRate = !!product['Отображать цену в грн'] ? 1 : currencyRate;

  return finalRate ? Math.ceil(finalRate * product[key]) : product[key];
};

exports=module.exports=function(req,res){
    var query = {
      product: req.query.product,
      categid: req.query.categid,
      relevant_product_id: req.query.relevant_product_id
    }
    var hideOnSite = 'Не отображать на сайте';
    
    if(query.product){
      if(query.categid){
        keystone.list('ProductSelf')
        .model
        .find({ 'title':{"$regex":query.product,"$options":"i"},'productCategory':query.categid })
        .select({ title: 1, slug: 1, [hideOnSite]: 1, productCategory: 1, productSubCategory: 1 })
        .limit(10)
        .exec(function(err,products){
          if(err){
            throw err;
          }else{
            var showedProducts = products.filter(function (product) {
              return !product[hideOnSite] && product.productCategory.length && product.productSubCategory.length;
            });
            res.send(showedProducts);
          }
        })
      }else{
        var limit = query.relevant_product_id ? 10 : 20;
        var selectedFields = query.relevant_product_id ?
        {
          title: 1,
          slug: 1,
          productCategory: 1,
          productSubCategory: 1,
          image: 1,
          reviewRates: 1,
          totalRate: 1,
          'Цена': 1,
          'Отображать цену в грн': 1
        } :
        {
          title: 1,
          slug: 1,
          [hideOnSite]: 1,
          productCategory: 1,
          productSubCategory: 1,
        }

        Currency
          .model
          .findById(searched_id)
          .exec(function (err, item) {
            if (err) {
              throw err;
            } else {
              var currencyValue = item.price;

              keystone
                .list('ProductSelf')
                .model
                .find({'title':{"$regex":query.product,"$options":"i"}})
                .select(selectedFields)
                .limit(limit)
                .exec(function(err,products){
                  if(err){
                    throw err;
                  }else{
                    var showedProducts = products.filter(function (product) {
                      product._doc = Object.assign(product._doc, {
                        ['Цена']: updatePriceValue('Цена', currencyValue, product._doc)
                      });
                      return !product[hideOnSite] && product.productCategory.length && product.productSubCategory.length && product._id.toString() !== query.relevant_product_id;
                    });
                    console.log(showedProducts);
                    res.send(showedProducts);
                  }
                })
            }
          });
      }
    }else{
      res.send([]);
    }
}
