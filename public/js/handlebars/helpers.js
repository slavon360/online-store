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

  Handlebars.registerHelper('pageUrl', helpers.pageUrl);
  Handlebars.registerHelper('paginationPreviousUrl', helpers.paginationPreviousUrl);
  Handlebars.registerHelper('paginationNextUrl', helpers.paginationNextUrl);
  Handlebars.registerHelper('paginationNavigation', helpers.paginationNavigation);
  Handlebars.registerHelper('checkedAttr', function(val){
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
    return checked;
  })
  Handlebars.registerHelper('multiply', function(val1,val2){
    var val1=val1 || 1;
    var val2=val2 || 1;
    return val1*val2;
  })
  Handlebars.registerHelper('ifGreaterThan', function(value1,value2,options){
    if(value1>value2){
      return options.fn(this);
    }else{
      return options.inverse(this);
    }
  })
  Handlebars.registerHelper('ifParent', function(subCategNames, options){
    return subCategNames.length ? options.fn(this) : options.inverse(this);
  })
  Handlebars.registerHelper('submenu', function(subCategNames, subCategSlug){
      var template=[];
      subCategNames.forEach(function(item,index){
       template.push('<div><a href="/product-categories/'+subCategSlug[index]+'">'+item+'</a></div>');
      });
      return template.join('');
  })
  Handlebars.registerHelper('getCategoryLink', function(linkArray, index){
   return linkArray[index];
  });
  Handlebars.registerHelper('ifContain', function(string, array, index, options) {
     if(string.indexOf(array[index])>=0){
       return options.fn(this);
     }else{
       return options.inverse(this);
     }
 });
 Handlebars.registerHelper('getTotalSum', function(products){
   var sum=products.reduce(function(result,current){
     result+=current.quantity*current['Цена'];
     return result;
   },0);
   return sum;
 });
 Handlebars.registerHelper('totalPrice', function(price,quantity){
   return price*quantity;
 });
 Handlebars.registerHelper('totalSum', function(products,propName){
   var totalSum=0;
   products.forEach(function(item){
     totalSum+=item.quantity*item[propName];
   });
   return totalSum;
 });

module.exports=helpers;
