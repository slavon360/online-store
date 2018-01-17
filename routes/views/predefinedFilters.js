var keystone = require('keystone');
var filterForTemplate = require('./helpers/productProperties').filterForTemplate;

exports=module.exports=function(req,res){
  //var params=JSON.parse(req.query.params);
  keystone.list('ProductSelf')
  .model
  .aggregate(
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
    },
    function(err, result){
      if(err){
        throw err;
      }
      //var recreatedResult=JSON.parse(JSON.stringify(result));
      var filtersKeyValues=filterForTemplate(result);
      res.send(filtersKeyValues)
    }
  )
}
