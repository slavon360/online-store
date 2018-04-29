var catalogGridUpdate = require('./catalog-template').catalogGridUpdate;
var activeTemplateSingle = require('./catalog-template').activeTemplateSingle;
var activeTemplatePlural = require('./catalog-template').activeTemplatePlural;
var addToCartHandler = require('./shoppingCart.controller').addToCartHandler;
var transformIntoQueriesUrl = require('../../../routes/views/helpers/commonFunctions').transformIntoQueriesUrl;
var deleteSelectedProp = require('../../../routes/views/helpers/commonFunctions').deleteSelectedProp;
var getObjectLength = require('../../../routes/views/helpers/commonFunctions').getObjectLength;
var deepCopyOfObject = require('../../../routes/views/helpers/commonFunctions').deepCopyOfObject;
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
  function updateExistedMeasureFilter(filter, comparedFilter, key){
      var index, result = []
      if (filter) {
        different = filter.filter(function(item, i, arr){
            var updItem = typeof this[0] === 'string' ? item.toString() : (+item);
            this.indexOf(updItem) < 0 && (result[i] = updItem);
            if (result.length) {
              this.length > 1 && i === 0 && !index && (index = i + 1);
              this.length > 1 && i === this.length-1 && !index && (index = i - 1);
            }
          }, comparedFilter);
        if (result.length) {
          result = result.filter(function(item){ return item });
          index === 0 && result.unshift(filter[index]);
          index === 1 && result.push(filter[index]);
          result.unshift(key);
          return result;
        }
    }
  }
  function getDifferentFilter(filters, comparedFilters){
      var different;
      for (var key in filters){
        if (!comparedFilters[key] && typeof filters[key][0] !== 'string') {
          var values = filters[key].slice();
          values.unshift(key)
          return values;
        };
        if (!comparedFilters[key]) return filters[key];
        if (filters[key] && comparedFilters[key] && filters[key].length > comparedFilters[key].length) {
          different = filters[key].filter(function(item){ return this.indexOf(item) < 0 }, comparedFilters[key]);
          return different;
        }
        if (filters[key] && comparedFilters[key] && filters[key].length < comparedFilters[key].length) {
          different = comparedFilters[key].filter(function(item){ return this.indexOf(item) < 0 }, filters[key]);
          return different;
        }
        if (filters[key] && comparedFilters[key] && typeof filters[key][0] !== 'string') {
          different = updateExistedMeasureFilter(filters[key], comparedFilters[key], key);
          if (different) return different;
        }
      }
  }
  function getDifferentFilterElement(initialCollection, updatedCollection){
    var initialCollectionLength = getObjectLength(initialCollection), updatedCollectionLength = getObjectLength(updatedCollection);
    var differentFilter = initialCollectionLength > updatedCollectionLength ? getDifferentFilter(initialCollection, updatedCollection) :
                                  getDifferentFilter(updatedCollection, initialCollection);
    return differentFilter;
  }
  function checkForEmptiness(arr){
    var empty;
    arr.forEach(function(item, index){
      empty = index > 0 && (!item || item === '0') ? true : false;
    })
    return empty;
  }
  function isIdentic(initialObject, differentFilter){
    var filterParams = differentFilter.slice(1, differentFilter.length);
    var identic = true;
    initialObject[differentFilter[0]].forEach(function(item, index){
      identic = item === filterParams[index] && identic ? true : false;
    });
    console.log('identic: ', identic);
    return identic;
  }
  function setActiveTemplateSingle(differentFilter, newActiveFilter){
    var updDifferentFilter = differentFilter.slice();
    updDifferentFilter.splice(0, 1);
    newActiveFilter = activeTemplateSingle(differentFilter[0], updDifferentFilter);
  }
  function filterSectionUpdate(reupdatedCollection, generalInitialFilterParams, selectors){
    var updatedInitialFilterParams = deleteSelectedProp(generalInitialFilterParams, '_id page');
    var differentFilter = getDifferentFilterElement(updatedInitialFilterParams, reupdatedCollection);
    var selector = differentFilter && typeof differentFilter[0] === 'string' ? differentFilter[0].replace(/ |\(|\)|\°/g, '') : null;
    var activeFilter = selector ? $('[data-active-filter=' + selector + ']')[0] : null;
  //  console.log(activeFilter, differentFilter);
  //  differentFilter && console.log(generalInitialFilterParams[differentFilter[0]]);
    if (activeFilter){
      differentFilter.length === 1 && activeFilter.remove();
      differentFilter.length > 1 && !isIdentic(generalInitialFilterParams, differentFilter);
      differentFilter.length > 1 && checkForEmptiness(differentFilter) && activeFilter.remove();
      activeFilter = null;
      return;
    }
    if (!activeFilter && differentFilter){
      var newActiveFilter;
      differentFilter.length === 1 && (newActiveFilter = activeTemplatePlural(differentFilter));
      if (differentFilter.length > 1){
        setActiveTemplateSingle(differentFilter, newActiveFilter);
      }
      selectors.activeFilters.append(newActiveFilter);
      //console.log(updDifferentFilter)
    }
  }
  module.exports.filterFormSubmit = function (form, selectors, categoryId, initialFilterParams){
      var generalInitialFilterParams = deepCopyOfObject(initialFilterParams);
      $(document).on("keypress", form, function(event) {
          return event.keyCode != 13;
      });
      form.submit(function(e){
        selectors.topPreloader.show();
        var url = $(form).attr('action'),
            filtersData = $(form).serializeFormJSON(),
            collection = [];
            lastWordExtracter(filtersData, collection, '-');
            var updatedCollection = collection.reduce(filtersCollectionToServerWrp(filtersData),{});
            updatedCollection['_id'] = [categoryId];
            updateNumericFilters(filtersData, updatedCollection);
            var reupdatedCollection = deleteSelectedProp(updatedCollection, '_id page');
            filterSectionUpdate(reupdatedCollection, generalInitialFilterParams, selectors);
            generalInitialFilterParams = deepCopyOfObject(reupdatedCollection);
      $.ajax({
    	    		type:'POST',
    	    		url:url,
    	    		data:updatedCollection,
    	    		success:function(response){
    	    			response.queries = transformIntoQueriesUrl(response.queries);
                response.pathname = window.location.pathname;
                catalogGridUpdate(response, selectors);
                $('.addToCart').click({$shoppingIndicator: selectors.shoppingIndicator}, addToCartHandler);
    	    		},
              error:function(XMLHttpRequest, textStatus, errorThrow){
                console.log(XMLHttpRequest, textStatus, errorThrow);
                selectors.topPreloader.hide();
              }
    	    	});
        e.preventDefault();
      })
  }
