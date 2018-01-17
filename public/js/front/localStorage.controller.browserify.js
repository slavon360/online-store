(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
  function showCatalog(dataCatalog){
    var catalogTemplate='   <div>\
    <h1>КАТАЛОГ</h1>\
    {{# each catalogNames}}\
    <div class="category-name">\
    <label class="categ-name-check" for="categ-name-check-{{categName}}"><img src="/images/catalog/{{categSlug}}/icon-{{categSlug}}.png">{{categName}}</label>\
    <input type="checkbox" id="categ-name-check-{{categName}}">\
    <span {{#ifParent subCategNames}}class="item-menu-arrow"{{else}}{{/ifParent}}></span>\
    <div class="categ-submenu">{{{submenu subCategNames subCategSlug}}}</div>\
    </div>\
    {{/each}}\
    </div>';
    var catalogNames=dataCatalog;
    var template=Handlebars.compile(catalogTemplate);
    var data=template({catalogNames:catalogNames});
    $('#catalog').append(data);
  };
  function showFooterCatalog(dataCatalog){
    var catalogTemplate='{{# each catalogItems}}<div><a class="category-link" href="{{categLink}}">{{categName}}</a></div>{{/each}}';
    var templateCatalog=Handlebars.compile(catalogTemplate);
    var data=templateCatalog({catalogItems:dataCatalog});
    $('#footer-catalog').html(data);
    return true;
  };
  function showNavbar(dataCatalog){
    var $customNavbar = $('#customNavbar');
    var catalog=dataCatalog,
    currentPath=$customNavbar.attr('data-categ-slug') || window.location.pathname,
    exactCatalog;
    catalog.forEach(function(item){
      if(currentPath.indexOf(item.categSlug)>-1){
        exactCatalog=item;
      }
    });
    var navbarTemplate='<div class="custom-navbar">\
    <div class="navbar-categ-name">\
    <h3><a href="/product-exact-category/{{exactCatalog.categSlug}}">{{exactCatalog.categName}}</a></h3>\
    </div>\
    <div class="navbar-subcat">\
    {{# each exactCatalog.subCategNames}}\
    <div class="subcat-link-wrapper">\
    <span class="subcat-link">&#9670;</span>\
    <a\
    href="/product-categories/{{{getCategoryLink ../exactCatalog.subCategSlug @index}}}"\
    {{#ifContain ../currentPath ../exactCatalog.subCategSlug @index}}class="active-navbar-link"{{else}}{{/ifContain}}\
    >\
    {{this}}\
    </a>\
    </div>\
    {{/each}}\
    </div>\
    </div>';
    var templateNavbar=Handlebars.compile(navbarTemplate);
    var dataNavbar=templateNavbar({exactCatalog:exactCatalog, currentPath:currentPath});
    $customNavbar.html(dataNavbar);
  }
  function showHoverableCatalog(dataCatalog){
    var catalogTemplate='{{# each dataCatalog}}\
    <ul class="catalog-categ">\
    <li class="catalog-categ-item">\
    <a class="catalog-categ-anchor" href="{{categLink}}">{{categName}}\
    <span class="catalog-categ-angle"><i class="fa fa-angle-right" aria-hidden="true"></i></span>\
    </a>\
    <ul class="catalog-subcateg">\
    {{# each subCategNames}}\
    <li class="catalog-subcateg-item">\
    <a class="catalog-subcateg-anchor" href="/product-categories/{{lookup ../subCategSlug @index}}">{{this}}</a>\
    </li>\
    {{/each}}\
    </ul>\
    </li>\
    </ul>\
    {{/each}}';
    var templateCatalog=Handlebars.compile(catalogTemplate);
    var dataCatalog=templateCatalog({dataCatalog:dataCatalog});
    $('.root-submenu-wrp').html(dataCatalog);
  }
  function showRightCatalog(dataCatalog){
    var navbarTemplate='<h3>КАТАЛОГ</h3>\
    {{# each dataCatalog}}\
    <div class="catalog-right-section-list-item col-md-6 padding-0">\
    <div class="category-image-wrapper">\
    <a class="category-image" href="{{categLink}}"><img src="/images/catalog/{{categSlug}}/{{categSlug}}.jpg"/></a>\
    </div>\
    <div class="categ-subcateg-wrapper">\
    <a class="categ-link-name" href="{{categLink}}">{{categName}}</a>\
    <div class="links-wrapper-subcateg">\
    {{{submenu subCategNames subCategSlug}}}\
    </div>\
    </div>\
    </div>\
    {{/each}}';
    var templateNavbar=Handlebars.compile(navbarTemplate);
    var dataNavbar=templateNavbar({dataCatalog:dataCatalog});
    $('#right-catalog').html(dataNavbar);
  }
  function filterCatalog(filterObject){
    var filterTemplate='<div class="filter-wrp">\
          {{# each filterObject}}\
          <div class="filter-wrp-item">\
          <label title="{{@key}}" class="filter-key categ-name-check" for="categ-name-check-{{@key}}">\
            <span class="filter-key-inner">{{@key}}</span>\
            </label>\
            <input id="categ-name-check-{{@key}}" class="hidden" type="checkbox"/>\
            <span class="item-menu-arrow item-menu-arrow-filter"></span>\
          <input class="hidden roll-unroll-checkbox" type="checkbox" id="roll-{{@key}}"/>\
          <div class="filter-container"{{#ifGreaterThan this.length 4}}style="height:120px"{{else}}style="height:{{multiply this.length 30}}px"{{/ifGreaterThan}}>\
            {{#if this.length}}\
            <ul class="filter-values">\
              {{# each this}}\
                <li class="filter-value">\
                  <input type="checkbox" id="{{this}}-{{@index}}"/>\
                  <label title="{{this}}" for="{{this}}-{{@index}}">{{this}}</label>\
                </li>\
              {{/each}}\
            </ul>\
            {{else}}\
            <p>not iterable</p>\
            {{/if}}\
          </div>\
          {{#ifGreaterThan this.length 4}}\
          <label for="roll-{{@key}}" class="roll-unroll"></label>\
          {{else}}\
          {{/ifGreaterThan}}\
          </div>\
          {{/each}}\
          </div>';
    var templateFilter=Handlebars.compile(filterTemplate);
    var dataFilter=templateFilter({filterObject:filterObject});
    $('#catalog-filter').html(dataFilter);
  }
  function searchCatalog(data){
    var currentIndex=-1, inputPosition=0;
    var catalogTemplate='<div class="choose-category-btn-wrp">\
    <span class="choose-category-btn" data-categ-id="" id="choose-category-btn">По всем категориям</span>\
    <span class="choose-category-btn-arrow"><i class="fa fa-angle-down" aria-hidden="true"></i></span>\
    </div>\
    <ul class="categories-list">\
    <li class="categ" data-categ-id="">По всем категориям</li>\
    {{# each data}}\
    <li class="categ" data-categ-id="{{_id}}">{{categName}}</li>\
    {{/each}}\
    </ul>';
    var templateCatalog=Handlebars.compile(catalogTemplate);
    var dataCatalog=templateCatalog({data:data});
    $('#category').html(dataCatalog);
    var $chCatBtn=$('#choose-category-btn'),
    $categList=$('.categories-list'),
    $searchInput=$('.search-input'),
    $searchForm=$('.search-form'),
    $dataSlug=$('#dataSlug'),
    $productsList=$('.products-list');
    $('.choose-category-btn-wrp').on('click',function(e){
      $productsList.css('display')==='block' ? $productsList.css('display','none') : '';
      $categList.css('display')==='block' ? $categList.css('display','none') : $categList.css('display','block');
    });
    $categList.find('li').on('click',function(e){
      $chCatBtn.text(e.target.innerHTML);
      $chCatBtn.attr('data-categ-id',e.target.getAttribute('data-categ-id'));
      $categList.css('display','none');
    });
    $searchInput.on('input',function(e){
      currentIndex=-1;
      inputPosition=this.selectionStart;
      $.get('/search?categid='+$chCatBtn.attr('data-categ-id')+'&product='+this.value)
      .done(function(res){
        var data=res;
        console.log(data);
        $categList.css('display') === 'block' ? $categList.css('display','none') : '';
        $productsList.css('display') === 'none' ? $productsList.css('display','block') : '';
        if(data.length){
          $productsList.html('<ul class="categories-list searched">'+productsList(data)+'</ul>');
        }else{
          $productsList.html('<ul class="categories-list searched">\
            <li class="no-products">По вашему запросу ничего не найдено. Уточните свой запрос</li>\
            </ul>');
        }
        $('.listed-product').on('click',function(e){
          $productsList.css('display','none');
          $searchInput.val(e.target.innerHTML);
          $searchInput.focus();
          $dataSlug.val(e.target.getAttribute('data-slug'));
        })
      })
      .fail(function(err){
        throw err;
      })
    })

    $searchInput.keyup(function(e){
      var $listedProduct=$('.listed-product'),
      listedProductArr=$listedProduct.toArray();
      if(e.key === 'ArrowUp'){
        this.selectionStart>inputPosition ? inputPosition=this.selectionStart : this.selectionStart=inputPosition;
        if(currentIndex>0){
          console.log('ArrowUp')
          currentIndex--;
          listedProductArr.some(function(item,index){
            if(currentIndex === index){
              $dataSlug.val(item.getAttribute('data-slug'));
              item.className+=' active-listed-product';
              $listedProduct[currentIndex+1].className=$listedProduct[currentIndex+1].className.replace('active-listed-product','');
              return true;
            }
          })
        }
      }
      if(e.key === 'ArrowDown'){
        if(currentIndex<$listedProduct.length-1){
          console.log('ArrowDown')
          currentIndex++;
          listedProductArr.some(function(item,index){
            if(currentIndex === index){
              $dataSlug.val(item.getAttribute('data-slug'));
              item.className+=' active-listed-product';
              currentIndex>0 && ($listedProduct[currentIndex-1].className=$listedProduct[currentIndex-1].className.replace('active-listed-product',''));
              return true;
            }
          })
        };
      }
    })
    $(window).on('click',function(e){
      if(e.target.id !== 'search-input' && e.target.className !== 'choose-category-btn-wrp' && e.target.className !== 'choose-category-btn'){
        $categList.css('display','none');
        $productsList.css('display','none');
      }
    })
    return true;
  }

  var catalogTemplateModule = module.exports={
    showCatalog:showCatalog,
    showNavbar:showNavbar,
    showRightCatalog:showRightCatalog,
    showFooterCatalog:showFooterCatalog,
    searchCatalog:searchCatalog,
    showHoverableCatalog:showHoverableCatalog,
    filterCatalog:filterCatalog
  }
  function productsList(list){
    return list.map(function(item){
      return '<li class="listed-product categ" data-slug="'+item.slug+'">'+item.title+'</li>';
    }).join('');
  }
})();

},{}],2:[function(require,module,exports){

(function(){
	var shoppingCart=require('./shoppingCart.controller');
	var makePurchase=require('./makePurchase.controller');
	var catalogTemplate=require('./catalog-template');
	var $shoppingIndicator=$('#shoppingCart .shopping-indicator');
	var $purchaseFormWrp=$('#purchaseFormWrp');
	var $cartAreaWrp=$('#cart-area-wrp');
	var catalog=JSON.parse(localStorage.getItem('catalog'));
	var predefinedFilters=JSON.parse(localStorage.getItem('predefined-filters'));
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
	if(!predefinedFilters){
		$.ajax({
			url:'/predefined-filters',
			type:'GET',
			success:function(data){
				console.log(data);
				localStorage.setItem('predefined-filters',JSON.stringify(data));
				if(document.getElementById('catalog')){
					catalogTemplate.filterCatalog(data);
				}
			},
			error:function(err){
				throw err;
			}
		})
	}
	predefinedFilters && catalogTemplate.filterCatalog(predefinedFilters);

	//--------------------CATALOG sidebar--------------------//
	if(!catalog){
		$.ajax({
				url:'/getCatalog',
				type:'GET',
				success:function(data){
					localStorage.setItem('catalog',JSON.stringify(data));
					catalogTemplate.showHoverableCatalog(data);
					catalogTemplate.showFooterCatalog(data);
					catalogTemplate.searchCatalog(data);
					if(document.getElementById('catalog')){
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
	if(catalog && document.getElementById('catalog')){
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
})();

},{"./catalog-template":1,"./makePurchase.controller":3,"./shoppingCart.controller":4}],3:[function(require,module,exports){
(function ($) {
    $.fn.serializeFormJSON = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);
var ordersTable=function(products){
	var rawTable='<table style="border:1px solid #000">\
	<tr><th style="border:1px solid #000;padding:3px 5px;">название</th>\
	<th style="border:1px solid #000;padding:3px 5px;">цена(грн.)</th>\
	<th style="border:1px solid #000;padding:3px 5px;">количество</th>\
	<th style="border:1px solid #000;padding:3px 5px;">сумма(грн.)</th></tr>\
	{{# each products}}\
	<tr><td style="border:1px solid #000;padding:3px 5px;">{{productTitle}}</td>\
	<td style="border:1px solid #000;padding:3px 5px;">{{price}}</td>\
	<td style="border:1px solid #000;padding:3px 5px;">{{quantity}}</td>\
	<td style="border:1px solid #000;padding:3px 5px;">{{{totalPrice price quantity}}}</td></tr>\
	{{/each}}\
	<tr><td style="border:1px solid transparent;padding:3px 5px;"></td>\
	<td style="border:1px solid transparent;padding:3px 5px;"></td>\
	<td style="border:1px solid transparent;padding:3px 5px;">Итого:</td>\
	<td style="border:1px solid transparent;padding:3px 5px;">{{{totalSum products "price"}}}<span> грн.</span></td>\
	</tr>\
	</table>',
	tableTemplate=Handlebars.compile(rawTable),
	table=tableTemplate({products:products});
	return table;
}
module.exports.purchaseForm=function(domElement,products,shoppingIndicator,shoppingCartModule){

	var rawForm='<div id="purchaseForm" class="purchase-wrp">\
	<div class="purchase-content-wrp-parent">\
	<div class="purchase-content-wrp">\
	<div class="purchase-content-inline">\
	  	<div class="purchase-content">\
	<div class="form-content">\
	<h1>Оформление заказа</h1>\
	<div class="dropdown">\
    <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">\
    <span id="kind"><i class="fa fa-truck fa-truck-custom" aria-hidden="true"></i>Самовывоз</span>\
    <span class="caret caret-custom"></span></button>\
    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">\
      <li class="delivery-kind" data-kind="buyInStore-wrp" role="presentation">\
      <i class="fa fa-truck fa-truck-custom" aria-hidden="true"></i>Самовывоз</li>\
      <li class="delivery-kind" data-kind="buyInNovaPoshta-wrp" role="presentation">\
      <img class="img-novaposhta" src="/images/icons/novaposhta.png"/>Нова Пошта</li>\
    </ul>\
    </div>\
	<form method="post" id="form-store" action="/make-order" name="form-store" class="buy-wrp wrp-show" data-kind="buyInStore-wrp">\
    <input type="text" name="clientname" class="purchase-input" placeholder="ФИО" required="required">\
	<input type="email" name="clientmail" class="purchase-input" placeholder="Email">\
	<div class="phone-wrp">\
	<input type="text" name="clientPhone" class="purchase-input phone" placeholder="Мобильный телефон" \
	required="required">\
	<div class="phone-number-example">Пример: +38 098 1234567</div>\
	</div>\
	<div class="payment-type-wrp">\
	<input type="radio" class="payment-input" id="in-store1" name="paying_type" value="inStore" checked="checked">\
	<label class="payment-label" for="in-store1">Оплата на месте</label><br/>\
	<input type="radio" class="payment-input" id="liqPay1" name="paying_type" value="liqPay">\
	<label class="payment-label" for="liqPay1">LiqPay</label>\
	</div>\
	<div class="make-purchase-btn-wrp">\
	<button class="make-purchase-btn btn_st border-outline-0" type="submit">Оформить заказ</button>\
	</div>\
  <div class="make-purchase-btn-wrp">\
  <div id="close" class="close-button">Продолжить покупки</div>\
  </div>\
	</form>\
	<form method="post" name="form-novaposhta" id="form-novaposhta" action="/make-order" class="buy-wrp wrp-hide" data-kind="buyInNovaPoshta-wrp">\
    <input type="text" name="clientname" class="purchase-input" placeholder="ФИО" required="required">\
	<input type="email" name="clientmail" class="purchase-input" placeholder="Email">\
	<input type="text" name="clientcity" class="purchase-input" placeholder="Город" required="required">\
	<input type="text" name="clientpostsection" class="purchase-input" placeholder="Отделение" \
	required="required">\
	<div class="phone-wrp">\
	<input type="text" name="clientPhone" class="purchase-input phone" placeholder="Мобильный телефон" \
	required="required">\
	<div class="phone-number-example">Пример: +38 098 1234567</div>\
	</div>\
	<div class="warning">Дополнительно оплачивается доставка по тарифам НОВОЙ ПОЧТЫ.</div>\
	<div class="payment-type-wrp">\
	<input type="radio" class="payment-input" id="in-store" name="paying_type" value="inStore" checked="checked">\
	<label class="payment-label" for="in-store">Оплата на месте</label><br/>\
	<input type="radio" class="payment-input" id="liqPay" name="paying_type" value="liqPay">\
	<label class="payment-label" for="liqPay">LiqPay</label>\
	</div>\
	<div class="make-purchase-btn-wrp">\
	<button class="make-purchase-btn btn_st" type="submit">Оформить заказ</button>\
	</div>\
  <div class="make-purchase-btn-wrp">\
  <div id="close" class="close-button">Продолжить покупки</div>\
	</div>\
  </div>\
	</form>\
	<div class="products-content">\
	{{# each products}}\
	 <div data-cart-item="product-{{title}}" class="product-item">\
	   <div class="img-wrp"><img src="{{{image.secure_url}}}"/></div>\
	   <div class="info-container">\
	    <h3><a href="/product-exact-category/{{parentSlug}}/{{slug}}">{{title}}</a></h3>\
	    <div class="price"><span class="number" >{{Цена}} грн.</span></div>\
	    <div class="quantity">Количество (шт.)</div>\
	    <div class="quantity-picker">\
         <input data-product-title="{{title}}" type="text" class="input-number" value="{{quantity}}">\
         <div class="btns-wrp">\
          <div data-product-title="{{title}}" class="more-btn"><i class="fa fa-caret-up" aria-hidden="true"></i></div>\
          <div data-product-title="{{title}}" class="less-btn"><i class="fa fa-caret-down" aria-hidden="true"></i></div>\
         </div> \
	    </div>\
	    <div data-product-title="{{title}}" class="delete-item">✖</div>\
	   </div>\
	 </div>\
	 {{/each}}\
	 <div class="total-sum">\
	  <span class="word">К оплате:</span><span id="number" data-product-title="{{title}}" class="number">{{getTotalSum products}}</span> грн.\
	 </div>\
	</div>\
	</div>\
	</div>\
	</div>\
	</div>\
	</div>',
        formTemplate=Handlebars.compile(rawForm),
	    form=formTemplate({products:products});
	    domElement.html(form);
	    var $buyWrp=$('.buy-wrp'),
	    $purchaseForm=$('#purchaseForm'),
	    $deliveryKind=$('.dropdown .delivery-kind'),
	    $shoppingIndicator=shoppingIndicator,
	    $numberSum=$('#number'),
	    productsToBuy=JSON.parse(localStorage.getItem('shoppingCart'));
	    $('#form-store').submit(function(e){
	    	var url=$(this).attr('action'),
	    	    dataClient={form:$(this).serializeFormJSON(),
	    	    	products:ordersTable(productsToBuy)
	    	    };
	    	$.ajax({
	    		type:'POST',
	    		url:url,
	    		data:dataClient,
	    		success:function(response){
	    			$purchaseForm.hide();
	    			$('#notification').css('display','block')
	    			.delay(1500)
	    			.fadeOut(1500, function() { $(this).css('display','none'); });
	    		}
	    	});
	    	e.preventDefault();
	    });
	    $('#form-novaposhta').submit(function(e){
	    	var url=$(this).attr('action'),
	    	    dataClient={form:$(this).serializeFormJSON(),
	    	    	products:ordersTable(productsToBuy)
	    	    };
	    	$.ajax({
	    		type:'POST',
	    		url:url,
	    		data:dataClient,
	    		success:function(response){
	    			$purchaseForm.hide();
	    			$('#notification').css('display','block')
	    			.delay(1500)
	    			.fadeOut(1500, function() { $(this).css('display','none'); });
	    		}
	    	});
	    	e.preventDefault();
	    });
	    $('.input-number').on('input',function(e){
		  		var oldProducts=JSON.parse(localStorage.getItem('shoppingCart')),
		  		    productTitle=$(this).attr('data-product-title'),
		  		    price=shoppingCartModule.getPrice(products,productTitle),
		  			newValue=this.value,
		  			updatedProducts=shoppingCartModule.updateQuantity(oldProducts,productTitle,newValue);
		  			$numberSum.text(shoppingCartModule.updateTotalSum(updatedProducts));
		  			$(this).attr('value',newValue);
		  		    localStorage.setItem('shoppingCart',JSON.stringify(updatedProducts));
		  	});
	    $('.more-btn').click(function(){
	    	var oldProducts=JSON.parse(localStorage.getItem('shoppingCart')),
		    productTitle=$(this).attr('data-product-title'),
		    currentNumber=shoppingCartModule.currentQuantity(oldProducts,productTitle),
		    price=shoppingCartModule.getPrice(products,productTitle);
		    $(this).parent().prev().attr('value',currentNumber+=1);
		    var updatedProducts=shoppingCartModule.updateQuantity(oldProducts,productTitle,currentNumber);
		    $(this).parent().prev().val(currentNumber);
		  	$('.total-sum .number[data-product-title="'+productTitle+'"]').text(price*currentNumber);
		  	$numberSum.text(shoppingCartModule.updateTotalSum(updatedProducts));
		  	localStorage.setItem('shoppingCart',JSON.stringify(updatedProducts));
	    });
	    $('.less-btn').click(function(){
	    	var oldProducts=JSON.parse(localStorage.getItem('shoppingCart')),
		    productTitle=$(this).attr('data-product-title'),
		    currentNumber=shoppingCartModule.currentQuantity(oldProducts,productTitle),
		    price=shoppingCartModule.getPrice(products,productTitle);
		    $(this).parent().prev().attr('value',currentNumber-=1);
		    var updatedProducts=shoppingCartModule.updateQuantity(oldProducts,productTitle,currentNumber);
		    $(this).parent().prev().val(currentNumber);
		  	$('.total-sum .number[data-product-title="'+productTitle+'"]').text(price*currentNumber);
		  	$numberSum.text(shoppingCartModule.updateTotalSum(updatedProducts));
		  	localStorage.setItem('shoppingCart',JSON.stringify(updatedProducts));
	    });
	    $('.delete-item').click(function(){
	    	var products=JSON.parse(localStorage.getItem('shoppingCart')),
		    productTitle=$(this).attr('data-product-title'),
		    updatedProducts=shoppingCartModule.deleteProduct(products,productTitle,'productTitle');
		    localStorage.setItem('shoppingCart',JSON.stringify(updatedProducts));
		    $numberSum.text(shoppingCartModule.updateTotalSum(updatedProducts));
		    $shoppingIndicator.text(updatedProducts.length);
		    $('.product-item[data-cart-item="product-'+productTitle+'"]').remove();
	    })
	    $('.purchase-content-wrp').click(function(e){
	    	if(e.target.className === 'purchase-content-wrp' || e.target.className === 'close-button'){
	    		$purchaseForm.hide();
	    	}
	    })
	    $deliveryKind.click(function(){
	    	var delKind=$(this);
             $buyWrp.each(function(index,item){
             	if($(item).attr('data-kind') === delKind.attr('data-kind')){
             		$('#kind').html(delKind.html());
             		$(item).addClass('wrp-show');
             		$(item).removeClass('wrp-hide');
             	}else{
             		$(item).addClass('wrp-hide');
             		$(item).removeClass('wrp-show');
             	}
             })
	    })
}

},{}],4:[function(require,module,exports){
var makePurchase = require('./makePurchase.controller');
var createAndAddToCart=function(productTitle,productPrice){
	localStorage.setItem('shoppingCart',JSON.stringify([{productTitle:productTitle,quantity:1,price:parseInt(productPrice)}]));
	return 1;
}
var addToCart=function(productTitle,productPrice){
	var cart=JSON.parse(localStorage.getItem('shoppingCart')),
	edited;
	var newCart=cart.map(function(item){
		if(item.productTitle===productTitle){
			item.quantity++;
			item.price=parseInt(productPrice);
			edited=true;
		}
		return item
	});
	if(!edited){
		newCart.push({productTitle:productTitle,quantity:1,price:parseInt(productPrice)});
	}
	localStorage.setItem('shoppingCart',JSON.stringify(newCart));
	return newCart;
}
var productsQuantity=function(){
	var cart=JSON.parse(localStorage.getItem('shoppingCart'));
	return cart ? cart.length : '0';
}
var updateQuantity=function(allProducts,productTitle,newValue){
	return allProducts.map(function(item){
		item.productTitle === productTitle ? item.quantity=parseInt(newValue) : '';
		return item;
	});
}
var getPrice=function(data,productTitle){
	return data.filter(function(item){
		return item.title===productTitle;
	})[0]['Цена']
}
var deleteProduct=function(products,productTitle,title){
	return products.filter(function(item){
		return item[title] !== productTitle;
	});
}
var updateTotalSum=function(products){
	var sum=0;
	products.forEach(function(item){
		if(item.quantity.toString() === 'NaN' || item.quantity.toString()<0){
			item.quantity=0;
		}
		sum+=item.price*item.quantity;
	});
	return sum
};
var updateSum=function(price,value){
	if(value<0 || (price*parseInt(value)).toString() === 'NaN'){
		return 0;
	}
	return price*parseInt(value);
}
var currentQuantity=function(products, productTitle){
	return products.filter(function(item){
		return item.productTitle === productTitle;
	})[0].quantity
}
var productsWholeInfo=function(products,allProducts){
	return products.map(function(item){
		var founded=allProducts.filter(function(i){
			return i.productTitle === item.title;
		});
		item.quantity=parseInt(founded[0].quantity);
		return item;
	});
}
var shoppingCartHandler=function(event){
	var allProducts=JSON.parse(localStorage.getItem('shoppingCart'));

	var $shoppingIndicator=event.$shoppingIndicator || event.data.$shoppingIndicator,
	$purchaseFormWrp=event.$purchaseFormWrp || event.data.$purchaseFormWrp,
	$cartAreaWrp=event.$cartAreaWrp || event.data.$cartAreaWrp;
	$cartAreaWrp.show();
	cartTemplate($cartAreaWrp,allProducts,$shoppingIndicator,$purchaseFormWrp);

}
var addToCartHandler=function(event){
	var cart=localStorage.getItem('shoppingCart'),
	$shoppingIndicator=event.$shoppingIndicator || event.data.$shoppingIndicator,
	productTitle=$(this).attr('data-product-title') || event.productTitle,
	productPrice=$(this).attr('data-product-price') || event.productPrice;
	if(cart){
		$shoppingIndicator
		.html(addToCart(productTitle,productPrice).length)
		.css('visibility','visible')
		.css('transform','scale(.8)')
	}else{
		$shoppingIndicator
		.html(createAndAddToCart(productTitle,productPrice))
		.css('visibility','visible')
		.css('transform','scale(.8)')
	}
}
var shoppingCartModule=module.exports={
	productsWholeInfo:productsWholeInfo,
	currentQuantity:currentQuantity,
	updateSum:updateSum,
	updateTotalSum:updateTotalSum,
	deleteProduct:deleteProduct,
	getPrice:getPrice,
	updateQuantity:updateQuantity,
	productsQuantity:productsQuantity,
	addToCart:addToCart,
	createAndAddToCart:createAndAddToCart,
	cartTemplate:cartTemplate,
	addToCartHandler:addToCartHandler,
	shoppingCartHandler:shoppingCartHandler
}
function cartInvocation(cart,data,cartAreaWrp){
	console.log(data)
	var cartTemplate=Handlebars.compile(cart);
	var shoppingCart=cartTemplate({shoppingCartProducts:data});
	cartAreaWrp.html(shoppingCart);
}
function hideCart(cartAreaInnerWrp){
	cartAreaInnerWrp.click(function(e){
				if(e.target.className === 'close-button' || e.target.className === 'make-order back-to-store btn_st' || e.target.className === 'make-order back-to-store-sm btn_st'){
					$(this).hide();
				}
				if(e.target.className === 'cart-area-inner-wrp'){
					$(this).hide();
				}
			});
}
function cartTemplate(cartAreaWrp, allProducts, $shoppingIndicator, $purchaseFormWrp){

	var cart='\
	<div class="cart-area-inner-wrp">\
	<div class="cart-area">\
	<div class="close-button">✖</div>\
	<div class="cart-header col-md-7 col-sm-12">Корзина</div>\
	<div class="cart-price-quantity col-md-5 hidden-xs hidden-sm">\
	<div class="inline-item price-cart">Цена</div>\
	<div class="inline-item quantity-cart">Количество</div>\
	<div class="inline-item total-price-cart">Сумма</div>\
	</div>\
	{{#if shoppingCartProducts}}\
	{{# each shoppingCartProducts}}\
	<div class="product-cart-item col-xs-12" data-cart-item="product-{{title}}">\
	<div class="product-left-side col-md-5 col-sm-12">\
	<div class="inline-item product-cart-image"><img src="{{{image.secure_url}}}"/></div>\
	<div class="inline-item product-cart-title"><a href="/product-exact-category/{{parentSlug}}/{{slug}}">{{title}}</a></div>\
	</div>\
	<div class="product-right-side col-md-5 col-md-offset-2 col-sm-12">\
	<div class="inline-item product-price-cart">{{Цена}} грн.<span class="visible-xs visible-sm product-price-cart-x">X</span></div>\
	<div class="inline-item product-quantity-cart">\
	<div class="minus-quantity">-</div>\
	<input class="quantity-input" data-product-title="{{title}}" type="text" value="{{quantity}}" />\
	<div class="plus-quantity">+</div>\
	</div>\
	<div class="inline-item total-sum">{{{totalPrice Цена quantity}}} </div><span> грн.</span>\
	<button class="delete-btn" data-product-title="{{title}}"></button>\
	</div>\
	</div>\
	{{/each}}\
	<div class="clearfix"></div>\
	<div class="total-wrp">Итого: <span class="total-number">{{{totalSum shoppingCartProducts "Цена"}}}</span>грн</div>\
	<div class="make-order-wrp"><div class="make-order order-bnt btn_st">Оформить заказ</div></div>\
	<div class="make-order-wrp"><div class="make-order back-to-store-sm btn_st">Закрыть</div></div>\
	<div class="clearfix"></div>\
	{{else}}\
	<div class="empty-cart">Ваша корзина пуста</div>\
	<div class="make-order-wrp"><div class="make-order back-to-store btn_st">Продолжить покупки</div></div>\
	{{/if}}\
	</div>\
	</div>';
	if(allProducts && allProducts.length>0){
		var uniqProducts=allProducts.map(function(item){
			return item.productTitle;
		});
		$.get('/shopping-cart',{allProducts:uniqProducts})
		.done(function(data){
			console.log(uniqProducts)
			console.log('done')
			var data=data;
			data=productsWholeInfo(data,allProducts);
			cartInvocation(cart,data,cartAreaWrp);
			var $totalWrpTotalNumber=$('.total-wrp .total-number');
			var $cartAreaInnerWrp=$('.cart-area-inner-wrp');
			var productsToBuy=localStorage.getItem('shoppingCart');
			$('.quantity-input').on('input',function(e){
				var oldProducts=JSON.parse(localStorage.getItem('shoppingCart')),
				productTitle=$(this).attr('data-product-title'),
				price=getPrice(data,productTitle),
				newValue=this.value,
				products=updateQuantity(oldProducts,productTitle,newValue);
				$(this).attr('value',newValue);
				$(this).parent().next().text(updateSum(price,newValue));
				$totalWrpTotalNumber.text(updateTotalSum(products));
				productsToBuy=JSON.stringify(products);
				localStorage.setItem('shoppingCart',productsToBuy);
			});
			$('.plus-quantity').click(function(e){
				var oldProducts=JSON.parse(localStorage.getItem('shoppingCart')),
				productTitle=$(this).prev().attr('data-product-title'),
				currentNumber=currentQuantity(oldProducts,productTitle),
				price=getPrice(data,productTitle);
				$(this).prev().attr('value',currentNumber+=1);
				var products=updateQuantity(oldProducts,productTitle,currentNumber);
				$(this).prev().val(currentNumber);
				$(this).parent().next().text(price*currentNumber);
				$totalWrpTotalNumber.text(updateTotalSum(products));
				productsToBuy=JSON.stringify(products);
				localStorage.setItem('shoppingCart',productsToBuy);
			});
			$('.minus-quantity').click(function(){
				var oldProducts=JSON.parse(localStorage.getItem('shoppingCart')),
				productTitle=$(this).next().attr('data-product-title'),
				currentNumber=currentQuantity(oldProducts,productTitle),
				price=getPrice(data,productTitle);
				$(this).next().attr('value',currentNumber-=1);
				var products=updateQuantity(oldProducts,productTitle,currentNumber);
				$(this).next().val(currentNumber);
				$(this).parent().next().text(price*currentNumber);
				$totalWrpTotalNumber.text(updateTotalSum(products));
				productsToBuy=JSON.stringify(products);
				localStorage.setItem('shoppingCart',productsToBuy);
			});
			$('.delete-btn').click(function(){
				var products=JSON.parse(localStorage.getItem('shoppingCart')),
				productTitle=$(this).attr('data-product-title'),
				updatedProducts=deleteProduct(products,productTitle,'productTitle');
				data=deleteProduct(data,productTitle,'title');
				$totalWrpTotalNumber.text(updateTotalSum(updatedProducts));
				productsToBuy=JSON.stringify(updatedProducts);
				localStorage.setItem('shoppingCart',productsToBuy);
				$shoppingIndicator.text(updatedProducts.length);
				$('.product-cart-item[data-cart-item="product-'+productTitle+'"]').remove();
			})
			$('.make-order.order-bnt').click(function(){
				$cartAreaInnerWrp.hide();
				var updatedProducts=productsWholeInfo(data,JSON.parse(productsToBuy));
				makePurchase.purchaseForm($purchaseFormWrp,updatedProducts,$shoppingIndicator,shoppingCartModule);
			})
			hideCart($cartAreaInnerWrp)
		})
	}
	if(!allProducts || allProducts.length===0){
		console.log('empty');
		cartInvocation(cart,false,cartAreaWrp);
		var $cartAreaInnerWrp=$('.cart-area-inner-wrp');
		hideCart($cartAreaInnerWrp)
	}
}

},{"./makePurchase.controller":3}]},{},[2]);
