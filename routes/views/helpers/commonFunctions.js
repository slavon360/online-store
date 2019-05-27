var jwt = require('jsonwebtoken');

module.exports.deepCopyOfObject = function(obj){
  let copiedObj = Object.assign({}, obj);
	for (let key in obj){
  		if (copiedObj[key] instanceof Array && copiedObj[key].constructor.toString().indexOf("Array") >= 0) {
      	copiedObj[key] = obj[key].slice();
      }
      if (copiedObj[key] instanceof Object && copiedObj[key].constructor.toString().indexOf("Array") < 0) {
      	copiedObj[key] = Object.assign({}, obj[key])
      }
  }
  return copiedObj;
}
module.exports.allPropertiesExceptOne = function(obj,prop){
  var output={};
  for(var key in obj){
    if(obj.hasOwnProperty(key) && key !== prop){
      output[key]=obj[key];
    }
  }
}
module.exports.deleteSelectedProp = function(obj, props){
    var updObj = Object.assign({}, obj);
    for (var key in updObj){
      props.indexOf(key) >= 0 && delete updObj[key];
    }
    return updObj;
}
module.exports.predefinedQuery = function (clause, filters, queriedObj){
    for (var key in filters){
      var innerObj = {};
      key !== '_id' && isNaN(filters[key][0]/2) && (innerObj[clause] = filters[key]);
      key !== '_id' && isNaN(filters[key][0]/2) && !queriedObj[key] && (queriedObj[key] = innerObj);
      if (key !== '_id' && !isNaN(filters[key][0]/2)){
        filters[key].length === 1 && (innerObj['$lte'] = filters[key][0]);
        filters[key].length === 2 && (innerObj['$gte'] = filters[key][0]) && (innerObj['$lte'] = filters[key][1]);
        !queriedObj[key] && (queriedObj[key] = innerObj);
      }
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
module.exports.arraysOfObjPropsIntoString = function(obj){
    for (var k in obj){
      obj[k] instanceof Array && (obj[k] = obj[k].join(','));
    }
}
module.exports.transformIntoQueriesUrl = function(obj){
  var string='';
      for (var key in obj){
        string += '&' + key + '=' + obj[key];
      }
      return encodeURI(string);
}
module.exports.urlParamsToObject = function(params){
  if (params){
    var search = params.substring(1);
    var parsed = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    return parsed;
  }
}
module.exports.generateToken = function(user){
  const usr = {
    firstName: user.firstName,
    phone: user.phone,
    id: user._id
  }
  return token = jwt.sign(usr, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  })
}
module.exports.getCleanUser = function(user){
  const usr = {
    firstName: user.firstName,
    phone: user.phone,
    email: user.email
  }
  return usr;
}
module.exports.sendJSONresponse = function(res,status,content){
  res.status(status);
	res.json(content);
}