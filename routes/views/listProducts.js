var keystone = require('keystone');

module.exports = function(req,res){
    var query = {
        page: req.query.page,
        subcategid: req.query.subcategid,
        categid: req.query.categid
      }
    var filters = { };
    var perPage = 16;
    var hideOnSite = 'Не отображать на сайте';

    if (query.categid) {
        filters = Object.assign(filters, { productCategory: query.categid });
    }
    if (query.subcategid) {
        filters = Object.assign(filters, { productSubCategory: query.subcategid });
    }
    if (query.categid || query.subcategid) {
        keystone.list('ProductSelf')
        .paginate({
            page: query.page || 1,
            perPage: perPage,
            filters: Object.assign(filters, {[hideOnSite]: { $ne: true }})
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
            'Цена',
            'Акционная цена',
            'Конец акции'
        ])
        .exec(function(err, products){
            try {
                console.log(products);
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