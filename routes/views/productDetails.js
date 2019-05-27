var keystone = require('keystone');

module.exports = function(req,res){
    var params = {
        slug: req.params.slug
      }
    if (params.slug) {
        keystone.list('ProductSelf')
        .model
        .findOne({ 'slug': params.slug })
        .exec(function(err, products){
            try {
                res.send(products);
            } catch {
                console.log(err)
                res.send(err);
            }
        })
    } else {
        res.json({ message: 'You must provide a "slug" value into url parameter'});
    }
}