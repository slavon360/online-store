var keystone = require('keystone');

module.exports = function(req,res){
	var query = {
		page: req.query.page,
		subcategid: req.query.subcategid,
		categid: req.query.categid,
		sort: req.query.sort
	  };
	var filters = { };
	var perPage = 16;
	var hideOnSite = 'Не отображать на сайте';
	var sortsForDB = null;
	var sortsForClient = [
		{ value: 'cheap', title: 'От дешевых к дорогим', checked: false },
		{ value: 'expensive', title: 'От дорогих к дешевым', checked: false },
		{ value: 'alphabethical', title: '[А - Я]', checked: true }
	];
	var boilersIncluded = [
		'603505e85f7e0932667fb2f5',
		'6037705a191a9d55aa34d3d0',
		'603609f45f7e0932667fb2f6',
		'5e1d9239553e78077854861e',
		'5e5678e47772df0803416450',
		'5e5f7fc3e641a34edd6f1648'
	].indexOf(query.categid) >= 0;

	if (query.categid) {
		filters = Object.assign(filters, { productCategory: query.categid });
	}
	if (query.subcategid) {
		filters = Object.assign(filters, { productSubCategory: query.subcategid });
	}
	if (boilersIncluded && !query.sort) {
		sortsForDB = {
			'Цена': 1
		};
		sortsForClient = sortsForClient.map(s => ({
			...s,
			checked: s.value === 'cheap'
		}));
	} else {
		switch (query.sort) {
			case 'expensive':
				sortsForDB = {
					'Цена': -1
				};
				sortsForClient = sortsForClient.map(s => ({
					...s,
					checked: s.value === query.sort
				}));
				break;
			case 'cheap':
				sortsForDB = {
					'Цена': 1
				};
				sortsForClient = sortsForClient.map(s => ({
					...s,
					checked: s.value === query.sort
				}));
				break;
			case 'alphabethical':
				sortsForDB = {
					titleWithoutSerialNumber: 1
				};
				sortsForClient = sortsForClient.map(s => ({
					...s,
					checked: s.value === query.sort
				}));
				break;
			default:
				sortsForDB = {
					titleWithoutSerialNumber: 1
				};
				break;
		}
	}
	if (query.categid || query.subcategid) {
		keystone.list('ProductSelf')
		.paginate({
			page: query.page || 1,
			perPage: perPage,
			filters: Object.assign(filters, {[hideOnSite]: { $ne: true }}),
			sort: sortsForDB
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
			'Конец акции',
			'Отображать цену в грн',
			'reviewRates',
			'totalRate'
		])
		.exec(function(err, products){
			try {
				var products = Object.assign(products, {
					sortsForClient
				});

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