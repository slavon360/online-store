var keystone = require('keystone');
var mongoose = require('mongoose');
var filterForTemplate = require('./helpers/productProperties').filterForTemplate;

exports=module.exports=function(req,res){
  //var params=JSON.parse(req.query.params);
  var locals = res.locals;
  locals.filters={
		categId:req.query.category
  }
  console.log(locals.filters)
  keystone.list('ProductSelf')
  .model
  /*
  .find()
  .exec(function(err, products){
      products.forEach(function(product){
        console.log(product.productCategory === locals.filters.categId)
      })
  })
  */

  .aggregate(
    [ { $match: { "productCategory": mongoose.Types.ObjectId(locals.filters.categId) }},
      { $group:
      {
      _id:{"Производитель":"$Производитель"},
      "Тепловая мощность (кВт)":{$max:"$Тепловая мощность (кВт)"},
      "Цена":{$max:"$Цена"},
      "Способ установки":{$max:"$Способ установки"},
      "Страна производитель":{$max:"$Страна производитель"},
      "Назначение котла":{$max:"$Назначение котла"},
      "Материал теплообменника":{$max:"$Материал теплообменника"},
      "Емкость водонагревателя":{$max:"$Емкость водонагревателя"},
      "Тип насоса":{$max:"$Тип насоса"},
      "Глубина":{$max:"$Глубина"},
      "Ширина":{$max:"$Ширина"},
      "Высота":{$max:"$Высота"}
      }
    }],
    function(err, result){
      if(err){
        throw err;
      }
      //var recreatedResult=JSON.parse(JSON.stringify(result));
      console.log(result)
      var filtersKeyValues=filterForTemplate(result);
      res.send(filtersKeyValues)
    }
  )
}
