var keystone = require('keystone');
exports=module.exports=function(req,res){
    var query = {
      product:req.query.product,
      categid:req.query.categid
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
        keystone.list('ProductSelf')
        .model
        .find({'title':{"$regex":query.product,"$options":"i"}})
        .select({ title: 1, slug: 1, [hideOnSite]: 1, productCategory: 1, productSubCategory: 1 })
        .limit(20)
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
      }
    }else{
      res.send([]);
    }
}
