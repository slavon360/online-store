var keystone = require('keystone');
var mongoose = require('mongoose');
var filterForTemplate = require('./helpers/productProperties').filterForTemplate;

exports=module.exports=function(req,res){
  //var params=JSON.parse(req.query.params);
  var locals = res.locals;
  locals.filters={
		categId:req.query.category
  }
  //console.log(locals.filters)
  keystone.list('ProductSelf')
  .model
  .aggregate(
    [ { $match: { "productCategory": mongoose.Types.ObjectId(locals.filters.categId) }},
      { $group:
      {
      _id: {"Производитель":"$Производитель"},
      "Цена": {$max:"$Цена"},
      "Емкость водонагревателя (л)": {$max:"$Емкость водонагревателя (л)"},
      "Максимальная температура нагрева воды (°С)": {$max:"$Максимальная температура нагрева воды (°С)"},
      "Страна производитель": {$max:"$Страна производитель"},
      "Тип водонагревателя": {$max:"$Тип водонагревателя"},
			"Тип котла": {$max:"$Тип котла"},
      "Назначение котла": {$max:"$Назначение котла"},
      "Тип бака": {$max:"$Тип бака"},
      "Тепловая мощность (кВт)": {$max:"$Тепловая мощность (кВт)"},
      "Способ установки": {$max:"$Способ установки"},
      "Способ нагрева": {$max:"$Способ нагрева"},
      "Производительность (л/мин)": {$max:"$Производительность (л/мин)"},
      "Подводка": {$max:"$Подводка"},
      "Емкость водонагревателя": {$max:"$Емкость водонагревателя"},
      "Тип насоса": {$max:"$Тип насоса"},
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
      var filtersKeyValues=filterForTemplate(result);
      res.send(filtersKeyValues)
    }
  )
}
