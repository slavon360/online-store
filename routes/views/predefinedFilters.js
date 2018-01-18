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
      _id: {"Производитель":"$Производитель"},
      "Тепловая мощность (кВт)": {$max:"$Тепловая мощность (кВт)"},
      "Цена": {$max:"$Цена"},
      "Способ установки": {$max:"$Способ установки"},
      "Способ нагрева": {$max:"$Способ нагрева"},
      "Производительность (л/мин)": {$max:"$Производительность (л/мин)"},
      "Емкость водонагревателя (л)": {$max:"$Емкость водонагревателя (л)"},
      "Максимальная температура нагрева воды (°С)": {$max:"$Максимальная температура нагрева воды (°С)"},
      "Тип бака": {$max:"$Тип бака"},
      "Подводка": {$max:"$Подводка"},
      "Страна производитель": {$max:"$Страна производитель"},
      "Назначение котла": {$max:"$Назначение котла"},
      "Емкость водонагревателя": {$max:"$Емкость водонагревателя"},
      "Тип насоса": {$max:"$Тип насоса"},
      "Тип водонагревателя": {$max:"$Тип водонагревателя"},
			"Тип котла": {$max:"$Тип котла"},
      "Тип розжига": {$max:"$Тип розжига"},
      "Тип управления": {$max:"$Тип управления"},
      "Тип камеры сгорания": {$max:"$Тип камеры сгорания"},
      "Площадь обогрева (кв м)": {$max:"$Площадь обогрева (кв м)"},
      "КПД (%)": {$max:"$КПД (%)"},
      "Топливо": {$max:"$Топливо"},
      "Принцип работы газового котла": {$max:"$Принцип работы газового котла"},
      "Принцип работы твердотопливного котла": {$max:"$Принцип работы твердотопливного котла"},
      "Вес (кг)": {$max:"$Вес (кг)"}
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
