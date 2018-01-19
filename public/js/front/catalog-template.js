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
    var filterTemplate='<form action="/do-filter" method="post" id="filter-form" class="filter-wrp">\
          <button type="submit">Submit</button>\
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
                  <button type="submit">\
                    <input type="checkbox" id="{{this}}-{{@index}}"/>\
                    <label title="{{this}}" for="{{this}}-{{@index}}">{{this}}</label>\
                  </button>\
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
        </form>';
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
  function getCurrentCategoryId(location, categories){
    var pathname = location.pathname, categId;
    categories.find(function(categ){
      if (pathname.indexOf(categ.categSlug) >= 0){
        categId=categ._id;
        return true;
      }
    });
    return categId;
  }
  var catalogTemplateModule = module.exports={
    showCatalog:showCatalog,
    showNavbar:showNavbar,
    showRightCatalog:showRightCatalog,
    showFooterCatalog:showFooterCatalog,
    searchCatalog:searchCatalog,
    showHoverableCatalog:showHoverableCatalog,
    filterCatalog:filterCatalog,
    getCurrentCategoryId:getCurrentCategoryId
  }
  function productsList(list){
    return list.map(function(item){
      return '<li class="listed-product categ" data-slug="'+item.slug+'">'+item.title+'</li>';
    }).join('');
  }
})();
