  var _each = require('lodash').each;
  var linkTemplate = require('lodash').template('<a href="<%= url %>"><%= text %></a>');
  var helpers = {};

  helpers.pageUrl = function (pageNumber, pathname, options) {
    if(pathname){
      return pathname + '?page=' + pageNumber + (options || '');
    }
    return '/blog?page=' + pageNumber;
  };

  helpers.paginationPreviousUrl = function (previousPage, totalPages, pathname, options) {
		if (previousPage === false) {
			previousPage = 1;
		}
		return helpers.pageUrl(previousPage, pathname, options);
	};
  helpers.paginationNextUrl = function (nextPage, totalPages, pathname, options) {
		if (nextPage === false) {
			nextPage = totalPages;
		}
		return helpers.pageUrl(nextPage, pathname, options);
	};
  helpers.showAdditionalInfo = function (productInfo, options){
    var needed = options.hash.needed.split(','), data='';
		if (needed) {
			needed.forEach(function(item){
				if (productInfo[item] && productInfo[item] !== 'выбрать вариант'){
					data += '<div class="additional-info">\
										<span class="additional-info-key">'+item+': </span>\
										<span class="additional-info-value">'+productInfo[item]+'</span>\
									 </div>';
				}
			})
			return new Handlebars.SafeString(data);
		}
  };
  helpers.isFilterChecked = function(item, checkedFilterParams){
    if (checkedFilterParams && checkedFilterParams.indexOf(item) >= 0){
      return 'checked';
    } else {
      return '';
    }
  };
  helpers.paginationNavigation = function (pages, currentPage, totalPages, pathname, options) {
		var html = '';
		// pages should be an array ex.  [1,2,3,4,5,6,7,8,9,10, '....']
		// '...' will be added by keystone if the pages exceed 10
		_each(pages, function (page, ctr) {
			// create ref to page, so that '...' is displayed as text even though int value is required
			var pageText = page;
			// create boolean flag state if currentPage
			var isActivePage = ((page === currentPage) ? true : false);
			// need an active class indicator
			var liClass = ((isActivePage) ? ' class="active-page-btn"' : '');
			// if '...' is sent from keystone then we need to override the url
			if (page === '...') {
				// check position of '...' if 0 then return page 1, otherwise use totalPages
				page = ((ctr) ? totalPages : 1);
			}

			// get the pageUrl using the integer value
			var pageUrl = helpers.pageUrl(page, pathname, options);
			// wrapup the html
			html += '<li' + liClass + '>' + linkTemplate({ url: pageUrl, text: pageText }) + '</li>\n';
		});
		return html;
	};
  helpers.textFilterBuilder = function(key, value, urlParamsObj){
      var values = extractFilterNumbers(key, urlParamsObj);
      var units = extractUnitsOfMeasurement(key);
      if (key.indexOf('Максимальн') >= 0){
        return new Handlebars.SafeString('<input class="border-outline-0" min="0" name="single_'+key+'" type="number" value="'+values+'" /> <span>'+units+'</span><button class="submit-filter-numbers border-outline-0" type="submit">OK</button>');
      } else {
        values = values && values.length === 2 ? values : ['',''];
        return new Handlebars.SafeString('<input class="border-outline-0" min="0" name="min_'+key+'" type="number" value="'+values[0]+'" /> <span> - </span><input class="border-outline-0" min="0" name="max_'+key+'" type="number" value="'+values[1]+'" /> <span>'+units+'</span><button class="submit-filter-numbers border-outline-0" type="submit">OK</button>');
      }
  };
  helpers.checkedAttr = function(val, urlParamsObj){
    var checked;
    switch (val) {
      case 'Производитель':
        checked='';
        break;
      case 'Цена':
        checked='';
        break;
      case 'Емкость водонагревателя (л)':
        checked='';
        break;
      case 'Максимальная температура нагрева воды (°С)':
        checked='';
        break;
      case 'Страна производитель':
        checked='';
        break;
      case 'Тип водонагревателя':
        checked='';
        break;
      case 'Тип котла':
        checked='';
        break;
      case 'Назначение котла':
        checked='';
        break;
      default:
        checked='checked';
    }
    if (urlParamsObj && urlParamsObj[val]) {
      return '';
    }
    return checked;
  };
  helpers.multiply = function(val1,val2){
    var val1=val1 || 1;
    var val2=val2 || 1;
    return val1*val2;
  };
  helpers.ifGreaterThan = function(value1,value2,options){
    if(value1>value2){
      return options.fn(this);
    }else{
      return options.inverse(this);
    }
  };
  helpers.ifParent = function(subCategNames, options){
    return subCategNames.length ? options.fn(this) : options.inverse(this);
  };
  helpers.submenu = function(subCategNames, subCategSlug){
      var template=[];
      subCategNames.forEach(function(item,index){
       template.push('<div><a href="/product-categories/'+subCategSlug[index]+'">'+item+'</a></div>');
      });
      return template.join('');
  };
  helpers.getCategoryLink = function(linkArray, index){
   return linkArray[index];
  };
  helpers.ifContain = function(string, array, index, options) {
    if(string.indexOf(array[index])>=0){
      return options.fn(this);
    }else{
      return options.inverse(this);
    }
  };
  helpers.getTotalSum = function(products){
    var sum=products.reduce(function(result,current){
      result+=current.quantity*current['Цена'];
      return result;
    },0);
    return sum;
  };
  helpers.totalPrice = function(price,quantity){
    return price*quantity;
  };
  helpers.totalSum = function(products,propName){
    var totalSum=0;
    products.forEach(function(item){
      totalSum+=item.quantity*item[propName];
    });
    return totalSum;
  };
  helpers.haveMeasure = function(key, template){
      if ( key === 'Цена' || key.indexOf('(') > 0 ) {
        return template.single(key);
      } else {
        return template.plural;
      }
  }
  function extractFilterNumbers(currentKey, urlParamsObj){
      var values = '';
      for (var key in urlParamsObj){
        if (key === currentKey){
          values = urlParamsObj[key];
          return values;
        }
      }
      return values;
  }
  function extractUnitsOfMeasurement(key){
    var startPoint = key.indexOf('(');
    var endPoint = key.indexOf(')');
    var units = endPoint === key.length-1 ? key.slice(startPoint, endPoint+1) : 'грн';
    return units;
  }

  Handlebars.registerHelper('pageUrl', helpers.pageUrl);
  Handlebars.registerHelper('paginationPreviousUrl', helpers.paginationPreviousUrl);
  Handlebars.registerHelper('paginationNextUrl', helpers.paginationNextUrl);
  Handlebars.registerHelper('paginationNavigation', helpers.paginationNavigation);
  Handlebars.registerHelper('showAdditionalInfo', helpers.showAdditionalInfo);
  Handlebars.registerHelper('isFilterChecked', helpers.isFilterChecked);
  Handlebars.registerHelper('textFilterBuilder', helpers.textFilterBuilder);
  Handlebars.registerHelper('checkedAttr', helpers.checkedAttr);
  Handlebars.registerHelper('multiply', helpers.multiply);
  Handlebars.registerHelper('ifGreaterThan', helpers.ifGreaterThan);
  Handlebars.registerHelper('ifParent', helpers.ifParent);
  Handlebars.registerHelper('submenu', helpers.submenu);
  Handlebars.registerHelper('getCategoryLink', helpers.getCategoryLink);
  Handlebars.registerHelper('ifContain', helpers.ifContain);
  Handlebars.registerHelper('getTotalSum', helpers.getTotalSum);
  Handlebars.registerHelper('totalPrice', helpers.totalPrice);
  Handlebars.registerHelper('totalSum', helpers.totalSum);
  Handlebars.registerHelper('haveMeasure', helpers.haveMeasure);

module.exports=helpers;
