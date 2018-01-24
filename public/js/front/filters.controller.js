var catalogGridUpdate = require('./catalog-template').catalogGridUpdate;
var transformIntoQueriesUrl = require('../../../routes/views/helpers/commonFunctions').transformIntoQueriesUrl;
  function lastWordExtracter (obj, collection, divider){
    var endpoint, middlepoint, word;
    for (var key in obj){

      if (key && typeof key === 'string'){
        endpoint = key.length;
        middlepoint = key.indexOf(divider);
        word = key.slice(middlepoint+1, endpoint);
        collection.indexOf(word)<0 && collection.push(word);
      }
    }
  }
  function filtersCollectionToServerWrp (obj){
    return function filtersCollectionToServer (result, current, index){
          var index, value, name;
          current.indexOf('min_') < 0 && current.indexOf('max_') < 0 && current.indexOf('single_') < 0 && (result[current]=[]);
          if (current && current.indexOf('min_') >= 0 || current.indexOf('max_') >= 0 || current.indexOf('single_') >= 0){
            name = current.replace(/min_|max_|single_/gi, '');
            result[name] = [];
          }
          for (var key in obj){
            var val = parseFloat(obj[key]);
            var i = key.indexOf(current);
            if (i >= 0 && isNaN(val)){
              index = i;
              value = key.slice(0, index-1);
              (value != 'min' && value != 'max' && result[current] instanceof Array) && result[current].push(value);
            }
          }
          return result;
      }
  }
  function updateNumericFilters (objWithValues, updatedCollection){
      var name;
      for (var key in objWithValues){
        if (key.indexOf('min_') >= 0) {
          name = key.replace('min_', '');
          updatedCollection[name][0] = +objWithValues[key];
        }
        if (key.indexOf('max_') >= 0) {
          name = key.replace('max_', '');
          objWithValues[key] > 0 ? updatedCollection[name][1] = +objWithValues[key] : delete updatedCollection[name];
          !objWithValues[key] && delete updatedCollection[name];
        }
        if (key.indexOf('single_') >= 0) {
          name = key.replace('single_', '');
          objWithValues[key] > 0 ? updatedCollection[name][0] = +objWithValues[key] : delete updatedCollection[name];
        }
      }
  }
  module.exports.filterFormSubmit = function (form, $catalogGrid, $topPreloader, categoryId){
      form.submit(function(e){
        $topPreloader.show();
        var url = $(form).attr('action'),
            filtersData = $(form).serializeFormJSON(),
            collection = [];
            lastWordExtracter(filtersData, collection, '-');
            var updatedCollection = collection.reduce(filtersCollectionToServerWrp(filtersData),{});
            updateNumericFilters(filtersData, updatedCollection)
            updatedCollection['_id'] = [categoryId];
            console.log(collection, filtersData, updatedCollection)
        $.ajax({
	    		type:'POST',
	    		url:url,
	    		data:updatedCollection,
	    		success:function(response){
	    			response.queries = transformIntoQueriesUrl(response.queries);
            response.pathname = window.location.pathname;
            catalogGridUpdate(response, $catalogGrid, $topPreloader);
	    		},
          error:function(XMLHttpRequest, textStatus, errorThrow){
            console.log(XMLHttpRequest, textStatus, errorThrow);
            $topPreloader.hide();
          }
	    	});
        e.preventDefault();
      })
  }
