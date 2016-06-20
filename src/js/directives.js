import Vue from 'vue'
var ink_drcts = {};
ink_drcts.install = function(vue) {
    Vue.directive("scroll-top", function(val) {
        this.el.addEventListener("click", function() {
            document.getElementsByClassName("main")[0].scrollTop = 0;
        }, false);
    });
    Vue.directive("toggle-selection", function(val) {
        this.el.addEventListener("click", function() {
            for (var i = val.list.length - 1; i >= 0; i--) {
                val.list[i]["selected"] = false;
            }
            val.item["selected"] = true;
            if(!!val.callback){
            	val.callback.call(this.el);
            }
        }, false);
    })
}
module.exports = ink_drcts;