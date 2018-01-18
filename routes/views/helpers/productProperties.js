function isEmptyObj (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}
module.exports.productsProps=function(obj){
	var newObj={};
	for(var key in obj){
		if(/[А-Я]/.test(key[0]) && obj[key] && key!=='Цена' && key!=='Описание'){
		newObj[key]=obj[key]
		}
	}
	return newObj;
}
module.exports.propsAssigner=function(obj,val){
	var newObj={};
	for (var key in obj){
		if(obj.hasOwnProperty(key)){
			newObj[key] = val || key;
		}
	}
	return newObj;
}
function filterValues (obj,key,currObj,end){
  (typeof obj[key] === 'number' && obj[key] < currObj[key]) && (obj[key] = currObj[key]);
  (typeof obj[key] === 'string' && typeof currObj[key] === 'string' && obj[key].indexOf(currObj[key])<0)
  && (obj[key]+=', '+currObj[key]);
  (end && typeof obj[key] === 'string') && (obj[key]=obj[key].split(', ').sort());
}
function getReadyForFilterObj (obj,result,end){
	for (var key in obj){
		if(obj.hasOwnProperty(key)){
			if(typeof obj[key] === 'object' && obj[key] !== null){
				getReadyForFilterObj(obj[key],result,end)
			}else{
        result[key] ? filterValues(result,key,obj,end) : (result[key] = obj[key]);
			}
		}
	}
	return result;
}
function excludeNeedlessProps (obj){
  for (var key in obj) {
    var index;
    obj[key] && obj[key] instanceof Array && (index = obj[key].indexOf('выбрать вариант'));
    !obj[key] || obj[key] == 'выбрать вариант' && delete obj[key];
    obj[key] && obj[key] instanceof Array && index >= 0 && obj[key].splice(index, 1);
  }
}
module.exports.filterForTemplate=function(arr){
	//console.log(arr)
	var result = arr.reduce(function(result,current,index,array){
		if(result instanceof Object && isEmptyObj(result)){
			result=getReadyForFilterObj(current,result);
      //console.log(result)
		}else{
      result=getReadyForFilterObj(current,result,index===array.length-1);
		}
    //console.log(result)
    return result;
	},{});
  excludeNeedlessProps(result);
  console.log(result);
  return result;
}
