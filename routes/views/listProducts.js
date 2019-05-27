var keystone = require('keystone');

module.exports = function(req,res){
    var query = {
        page: req.query.page,
        subcategid: req.query.subcategid,
        categid: req.query.categid
      }
    var filters = {
        productCategory: query.categid
    }
    var perPage = 4;
    if (query.categid || query.subcategid) {
        keystone.list('ProductSelf')
        .paginate({
            page: query.page || 1,
            perPage: perPage,
            filters: filters
        })
        .select([
            'productCategory',
            'slug',
            'title',
            'image',
            'Тепловая мощность (кВт)',
            'Назначение котла',
            'Тип котла',
            'Тип водонагревателя',
            'Максимальная температура нагрева воды (°С)',
            'Цена'
        ])
        .exec(function(err, products){
            try {
                res.send(products);
            } catch {
                console.log(err)
                res.send(err);
            }
        })
    } else {
        res.json({ message: 'You must provide either "categid" or "subcategid" query params' });
    }
}