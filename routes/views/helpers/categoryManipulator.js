	var keystone = require('keystone'),
	ClientMessage = keystone.List('ClientMessage');
	function showErr(err){
		console.log(err);
		return false;
	};
	module.exports.specificCategBySlug=function(name,categType){
		var categ=keystone.list(categType).model.findOne({slug:name});
		return categ.exec(function(err,result){
			if(err){
				console.log(err);
			}
		})
	}
	module.exports.allCateg=function(modelName){
		var categories=keystone.list(modelName).model.find();
		return categories.select('slug').exec(function(err,result){
			if(err){
				console.log(err);
			}
		})
	}
	module.exports.allItems=function(modelName,prop,locals,callback,viewObj){
		keystone.list(modelName).model.find().exec(function(err,list){
			err ? showErr(err) : '';
			locals.data[prop]=list;
			if(callback){
				list.forEach(function(item,index,array){
					if(index !== array.length-1){
						callback(item._id);
					}
					if(index === array.length-1){
						callback(item._id,true);
					};
				});
			}})}
		module.exports.mainPageProducts=function(modelName,prop,locals,viewObj,searchedParam,suppliedParam,sync){
		var key=suppliedParam.searchedKey,
		searchedObj={};
		searchedObj[key]=searchedParam;
		keystone.list(modelName).model.find(searchedObj).exec(function(err,list){
			err ? showErr(err) : '';
			suppliedParam.localsDataItem.forEach(function(item,index){
				if(item._id.toString() === searchedParam.toString()){
					var returnedItem={_id:item._id,
						slug:item.slug,
						title:item.title,
						quantity:list.length};
						locals.data[suppliedParam.localsDataName][index]=returnedItem;
					}
				});
			locals.data[prop]=locals.data[prop].concat(list.slice(0,5));
			if(sync){
				viewObj.view.on('post',{action:viewObj.path}, function(next){
					var newClientMessage = new ClientMessage.model();
				});
				viewObj.view.render(viewObj.viewName);
			}
		});
	}
