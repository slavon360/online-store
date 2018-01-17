module.exports.allPropertiesExceptOne=function(obj,prop){
  var output={};
  for(var key in obj){
    if(obj.hasOwnProperty(key) && key !== prop){
      output[key]=obj[key];
    }
  }
}
