
  module.exports.filterFormSubmit = function (form){
    console.log('filterFormSubmit')
      form.submit(function(e){
        var url = $(this).attr('action'),
            filtersData = $(this).serializeFormJSON();
        console.log(filtersData);
        $.ajax({
	    		type:'POST',
	    		url:url,
	    		data:filtersData,
	    		success:function(response){
	    			console.log(response);
	    		},
          error:function(XMLHttpRequest, textStatus, errorThrow){
            console.log(XMLHttpRequest, textStatus, errorThrow, 'vasya');
          }
	    	});
        e.preventDefault();
      })
  }
