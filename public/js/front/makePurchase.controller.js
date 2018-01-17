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
