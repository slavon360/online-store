var keystone = require('keystone');
exports=module.exports=function(req,res){
    var query = {
      product:req.query.product,
      categid:req.query.categid
    }
    if(query.product){
      if(query.categid){
        keystone.list('ProductSelf')
        .model
        .find({'title':{"$regex":query.product,"$options":"i"},'productCategory':query.categid})
        .select('title slug')
        .limit(10)
        .exec(function(err,products){
          if(err){
            throw err;
          }else{
            res.send(products);
          }
        })
      }else{
        keystone.list('ProductSelf')
        .model
        .find({'title':{"$regex":query.product,"$options":"i"}})
        .select('title slug')
        .limit(10)
        .exec(function(err,products){
          if(err){
            throw err;
          }else{
            res.send(products);
          }
        })
      }
    }else{
      res.send([]);
    }
}
