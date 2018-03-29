
(function(){
	var helpers=require('../handlebars/helpers');
	var urlParamsToObject=require('../../../routes/views/helpers/commonFunctions').urlParamsToObject;
	var stringsOfObjPropsIntoArray=require('../../../routes/views/helpers/commonFunctions').stringsOfObjPropsIntoArray;
	var shoppingCart=require('./shoppingCart.controller');
	var makePurchase=require('./makePurchase.controller');
	var filtersActions=require('./filters.controller');
	var catalogTemplate=require('./catalog-template');
	var $shoppingIndicator=$('#shoppingCart .shopping-indicator');
	var $purchaseFormWrp=$('#purchaseFormWrp');
	var $cartAreaWrp=$('#cart-area-wrp');
	var catalogFilterBlock=document.getElementById('catalog-filter');
	var catalog=JSON.parse(localStorage.getItem('catalog'));
	var predefinedFilters=JSON.parse(localStorage.getItem('predefined-filters'));
	var catalogNavBar=document.getElementById('catalog');
	var currentCategoryId;
	var $topPreloader=$('#top-preloader');
	var $activeFilters=$('#active-filters');
	var $catalogGrid=$('#catalog-grid');
	//---------------------MAIN Page-------------------------//
	if(document.getElementById('banners')){
		$('#banners').slick({
			arrows:false,
			dots:true
		});
		$('.categ-carousel').slick({
			slidesToShow:4,
			autoplay:true,
			responsive:[
				{
					breakpoint:991,
					settings:{
					slidesToShow:3
				}
			},
				{
					breakpoint:767,
					settings:{
					slidesToShow:2
				}
			},
				{
					breakpoint:480,
					settings:{
					slidesToShow:1
				}
				}
			]
		})
	}
	//--------------------keys for filter--------------------//
	if(catalogFilterBlock && catalog){
		currentCategoryId = catalogTemplate.getCurrentCategoryId(window.location, catalog);
		getPredefinedFilters(currentCategoryId);
	}
	//--------------------CATALOG sidebar--------------------//
	if(!catalog){
		$.ajax({
				url:'/getCatalog',
				type:'GET',
				success:function(data){
					if (!currentCategoryId && catalogFilterBlock){
						currentCategoryId = catalogTemplate.getCurrentCategoryId(window.location, data);
						getPredefinedFilters(currentCategoryId);
					}
					localStorage.setItem('catalog',JSON.stringify(data));
					catalogTemplate.showHoverableCatalog(data);
					catalogTemplate.showFooterCatalog(data);
					catalogTemplate.searchCatalog(data);
					if(catalogNavBar){
						catalogTemplate.showCatalog(data);
						catalogTemplate.showNavbar(data);
						catalogTemplate.showRightCatalog(data);
					}
				},
				error:function(err){
					console.log(err);
				}
			})
	}
	catalog && catalogTemplate.showFooterCatalog(catalog) && catalogTemplate.searchCatalog(catalog) && catalogTemplate.showHoverableCatalog(catalog);
	if(catalog && catalogNavBar){
		catalogTemplate.showCatalog(catalog);
		catalogTemplate.showNavbar(catalog);
		if(document.getElementById('right-catalog')){
			catalogTemplate.showRightCatalog(catalog);
		}
	}
	/*
	if(window.location.pathname === '/product-categories'){
		var rawCategNames=document.getElementsByClassName("categ-name-check"),
		rawSubCategNames=document.getElementsByClassName("categ-submenu"),
		rawArraySubCategNames=Array.prototype.slice.call(rawSubCategNames,0),
		rawArrayCategNames=Array.prototype.slice.call(rawCategNames,0);
		var collectionSubCategNames=rawArraySubCategNames.reduce(function(result,current,index,array){
			if(current.innerText){
				var links=Array.prototype.slice.call(current.getElementsByTagName('a'),0);
				current.innerText.trim().split('\n').forEach(function(item){
					result.push(item);
				});
				links.map(function(item){
					result.push(item.pathname)
				});
			}
			if(index === array.length-1){
				return result
			}
			return result;
		},[]);
		var arrayCatalog=rawArrayCategNames.map(function(item){
			var obj={};
			obj.categName=item.innerText;
			obj.categSlug=item.getAttribute('slug');
			obj.categLink='/product-exact-category/'+obj.categSlug;
			obj.subCategNames=collectionSubCategNames.filter(function(item){
				return item.indexOf(obj.categName)>-1;
			});
			obj.subCategSlug=collectionSubCategNames.filter(function(item){
				return item.indexOf(obj.categSlug)>-1;
			})
			return obj;
		});
		var arrayCatalogStr=JSON.stringify(arrayCatalog);
		localStorage.setItem('catalog',arrayCatalogStr);
	}
	*/
     //----------------SHOPPING CART--------------------//
	//click events//

	$('.addToCart').click({$shoppingIndicator:$shoppingIndicator},shoppingCart.addToCartHandler);
	//click events//
	$('.shopping-cart').click({$shoppingIndicator:$shoppingIndicator,
		                         $purchaseFormWrp:$purchaseFormWrp,
		                         $cartAreaWrp:$cartAreaWrp},
		                          shoppingCart.shoppingCartHandler);
	$('#buy').click(function(){
		shoppingCart.addToCartHandler({$shoppingIndicator:$shoppingIndicator,
                                         $purchaseFormWrp:$purchaseFormWrp,
                                         $cartAreaWrp:$cartAreaWrp,
                                         productTitle:$(this).attr('data-product-title'),
                                         productPrice:$(this).attr('data-product-price')});
		shoppingCart.shoppingCartHandler({$shoppingIndicator:$shoppingIndicator,
			                                          $cartAreaWrp:$cartAreaWrp,
		                                   $purchaseFormWrp:$purchaseFormWrp})
	})
	if(document.getElementById('shoppingCart') && catalog){
		$shoppingIndicator
		.html(shoppingCart.productsQuantity())
		.css('visibility','visible')
		.css('transform','scale(.8)');
	}
	function getPredefinedFilters(currentCategoryId){
		$.ajax({
			url:'/predefined-filters?category=' + currentCategoryId,
			type:'GET',
			success:function(data){
				var search = window.location.search;
				var checkedFilterParams = decodeURIComponent(search);
				var urlParamsObj = urlParamsToObject(search);
				stringsOfObjPropsIntoArray(urlParamsObj);
				localStorage.setItem('predefined-filters',JSON.stringify(data));
				catalogTemplate.filterCatalog(data, checkedFilterParams, urlParamsObj);
				var selectors = {
						catalogGrid: $catalogGrid,
						topPreloader: $topPreloader,
						shoppingIndicator: $shoppingIndicator,
						activeFilters: $activeFilters
				}
				filtersActions.filterFormSubmit($('#filter-form'), selectors, currentCategoryId, urlParamsObj);
				catalogTemplate.activeFilters(0, urlParamsObj);
			},
			error:function(err){
				throw err;
			}
		})
	}
})();
