import Vue from 'vue'
var ink_filters = {};
var nowms = Date.now();
ink_filters.install = function(vue) {
    Vue.filter("time", function(val, isconcrete) {
        var ms = val * 1000;
        var s = nowms - ms;
        if (!isconcrete) {
            if (s < 86400000) {
                return "今天";
            }
            if (s < 172800000) {
                return "昨天";
            }
            if (s < 900000) {
                return "刚刚";
            }
        }
        var dt = new Date(ms);
        return (dt.getMonth() + 1) + "月" + dt.getDate() + "日";
    })
}
module.exports = ink_filters;