var store = require("./store.min.js");
var ischanged = true;
var _curSetting = {};
var _setting = {
    newsSum: [{
        value: 10,
        text: "10条",
        selected: true
    }, {
        value: 20,
        text: "20条",
        selected: false
    }, {
        value: 30,
        text: "30条",
        selected: false
    }],
    fontSize: [{
        value: 14,
        text: "小",
        selected: false
    }, {
        value: 16,
        text: "中",
        selected: true
    }, {
        value: 18,
        text: "大",
        selected: false
    }],
    bakColor: [{
        value: '#fff',
        text: "纯白",
        selected: true
    }, {
        value: '#f4f4f4',
        text: "浅灰",
        selected: false
    }, {
        value: 'url(dist/image/paper.png)',
        text: "纸质",
        selected: false
    }]
}
var _values = {
    newsSum: 10,
    fontSize: 16,
    bakColor: '#fff'
};

function reset() {
    store.set("setting", _setting);
    ischanged = true;
}

function updateValues() {
    _curSetting = store.get("setting");
    ischanged = false;
    for (var k in _curSetting) {
        if (_curSetting[k] instanceof Array) {
            _values[k] = _curSetting[k].filter(function(i) {
                return i["selected"]
            })[0].value;
        }
    }
}
if (!store.get("setting")) {
    reset();
}
updateValues();
module.exports = {
    get: function() {
        if (ischanged) {
            ischanged = false;
            return _curSetting = store.get("setting");
        }
        return _curSetting;
    },
    set: function(setting) {
        store.set("setting", setting);
        updateValues();
    },
    values: _values
};