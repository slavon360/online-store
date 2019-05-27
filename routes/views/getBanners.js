var keystone = require('keystone');

module.exports = function(req,res){
    keystone.list('Banner')
    .model
    .find()
    .exec(function(err, banners){
        try {
            res.send(banners);
        } catch {
            console.log(err)
            res.send(err);
        }
    })
}