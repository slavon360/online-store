(function(){
  Handlebars.registerHelper('multiply',function(val1,val2){
    var val1=val1 || 1;
    var val2=val2 || 1;
    return val1*val2;
  })
  Handlebars.registerHelper('ifGreaterThan',function(value1,value2,options){
    if(value1>value2){
      return options.fn(this);
    }else{
      return options.inverse(this);
    }
  })
  Handlebars.registerHelper('ifParent',function(subCategNames, options){
    return subCategNames.length ? options.fn(this) : options.inverse(this);
  })
  Handlebars.registerHelper('submenu',function(subCategNames, subCategSlug){
      var template=[];
      subCategNames.forEach(function(item,index){
       template.push('<div><a href="/product-categories/'+subCategSlug[index]+'">'+item+'</a></div>');
      });
      return template.join('');
  })
  Handlebars.registerHelper('getCategoryLink',function(linkArray, index){
   return linkArray[index];
  });
  Handlebars.registerHelper('ifContain',function(string, array, index, options) {
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
 Handlebars.registerHelper('totalPrice',function(price,quantity){
   return price*quantity;
 });
 Handlebars.registerHelper('totalSum',function(products,propName){
   var totalSum=0;
   products.forEach(function(item){
     totalSum+=item.quantity*item[propName];
   });
   return totalSum;
 });
})();
