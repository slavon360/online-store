var keystone = require('keystone');
var Currency = new keystone.List('Currency', {
	nocreate:true,
	noedit:true
});
Currency.add({
    'price': { type: Number }
})
Currency.register();