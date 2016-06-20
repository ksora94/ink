var store = require("./store.min.js");
var ischanged = true;
var _collect;
var _values = [];

function reset() {
    store.set("collect", _collect = {});
    ischanged = true;
}

function updateValues() {
    for (var i in _collect) {
        var c = _collect[i];
        _values.push({
        	newsid: i,
            newstype: c.newstype,
            title: c.title,
            origin: c.origin,
            time: c.time,
            image: c.image
        });
    };
}
if (!(_collect = store.get("collect"))) {
    reset();
}
updateValues();
module.exports = {
	values:function () {
		 return _values; 
	},
    get: function() {
        return _collect;
    },
    add: function(news) {
        _values.push(_collect[news.newsid] = {
        	newsid: news.newsid,
            newstype: news.newstype,
            title: news.title,
            origin: news.origin,
            time: news.time,
            image: news.image
        });
        store.set("collect", _collect);
    },
    remove: function(newsid) {
        delete _collect[newsid];
        _values = _values.filter(function (v) {
        	 return v.newsid != newsid;
        });
        store.set("collect", _collect);
    },
    iscollected: function(newsid) {
        return !!_collect[newsid];
    }
};