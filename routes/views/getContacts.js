var keystone = require('keystone');

module.exports = function(req,res){
    keystone.list('Contact')
    .model
    .find()
    .exec(function(err, contacts){
        try {
            res.send(contacts);
        } catch {
            console.log(err)
            res.send(err);
        }
    })
}