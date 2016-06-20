var store = require("./store.min.js");
var _night;

if(!(_night = store.get("night"))){
	store.set("night",false);
}

_night = store.get("night");

module.exports = {
	set:function () {
		store.set("night",_night = !_night);
	},
	get:function () {
		 return _night; 
	}
}