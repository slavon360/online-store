module.exports.allPropertiesExceptOne = function(obj,prop){
  var output={};
  for(var key in obj){
    if(obj.hasOwnProperty(key) && key !== prop){
      output[key]=obj[key];
    }
  }
}
module.exports.predefinedQuery = function (clause, filters, queriedObj){
    for (var key in filters){
      var innerObj = {};
      key !== '_id' && isNaN(filters[key][0]/2) && (innerObj[clause] = filters[key]);
      key !== '_id' && isNaN(filters[key][0]/2) && !queriedObj[key] && (queriedObj[key] = innerObj);
    }
}
module.exports.getObjectLength = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
module.exports.stringsOfObjPropsIntoArray = function(obj){
    for (var key in obj){
      typeof obj[key] === 'string' && (obj[key] = obj[key].split(','));
    }
};
module.exports.transformIntoQueriesUrl = function(obj){
  var string='';
      for (var key in obj){
        string += '&' + key + '=' + obj[key];
      }
      return encodeURI(string);
}
