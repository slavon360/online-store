var catalogGridUpdate = require('./catalog-template').catalogGridUpdate;

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
          var index, value;
          result[current]=[];
          for (var key in obj){
            var i = key.indexOf(current);
            if (i >= 0){
              index = i;
              value = key.slice(0, index-1);
              result[current].push(value);
            }
          }
          return result;
      }
  }
  module.exports.filterFormSubmit = function (form, $catalogGrid, $topPreloader, categoryId){
      form.submit(function(e){
        $topPreloader.show();
        var url = $(this).attr('action'),
            filtersData = $(this).serializeFormJSON(),
            collection = [];
            lastWordExtracter(filtersData, collection, '-');
            var updatedCollection = collection.reduce(filtersCollectionToServerWrp(filtersData),{});
            updatedCollection['_id'] = [categoryId];
            console.log(updatedCollection)
        $.ajax({
	    		type:'POST',
	    		url:url,
	    		data:updatedCollection,
	    		success:function(response){
	    			console.log(response);
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
