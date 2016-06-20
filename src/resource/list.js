var _type;
var _url = (tp, pz) => `http://api.dagoogle.cn/news/get-news?tableNum=${tp}&pagesize=${pz}&callback=?&justList=1`;
var _count = 0;
var _cache = [];
function reset() {
    _count = 0;
    _cache = [];
}

function compare(key, data) {
    var i = 0;
    while (i < data.length) {
        if (!_cache[0] || data[i][key] == _cache[0].newsid) {
            return i;
        }
        i++;
    }
    return i;
}

function format(data) {
    var cache = [];
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        cache.push({
            newsid: d.news_id,
            title: d.title,
            time: d.edit_time,
            origin: d.source,
            digest: d.digest,
            image: [d['top_image'], d['text_image0'], d['text_image1']].filter(function(img) {
                return !!img;
            })
        });
    }
    return cache;
}

function update(key, data, count) {
    var start = compare(key, data);
    if (count === _count) {
        Array.prototype.unshift.apply(_cache, format(data.slice(0, start)));
    } else {
        Array.prototype.push.apply(_cache, format(data.slice(start + _count)));
    }
}

export default {
    url: function({type,pagesize = 10}) {
        if (type != _type) {
            reset();
        }
        return _url(_type = type, pagesize);
    },
    parse: function(data) {
        update("news_id", data.data, data.length);
        _count = _cache.length;
        return _cache;
    },
    reset: reset
}
