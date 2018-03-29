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
	console.log(event)
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
