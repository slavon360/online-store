var keystone = require('keystone');
var Currency = new keystone.List('Currency', {
	nocreate:true
});
Currency.add({
    'price': { type: Number }
})
Currency.register();