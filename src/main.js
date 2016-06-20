import Vue from 'vue'

import setting from './js/setting.js'
import collect from './js/collect.js'
import night from './js/night.js'

import rtrmap from './routermap.js'
import inkDrcts from './js/directives.js'
import inkFilters from './js/filters.js'
Vue.use(inkDrcts);
Vue.use(inkFilters);

import router from 'vue-router'
import VueMdl from 'vue-mdl'
import resource from 'vue-resource'
import VueTouch from 'vue-touch'
Vue.use(VueMdl);
Vue.use(router);
Vue.use(resource);
Vue.use(VueTouch);

VueTouch.registerCustomEvent('doubletap', {
    type: 'tap',
    taps: 2
})
var rtr = new router({
    hashbang: false
});
rtrmap(rtr);
rtr.start(Vue.extend({
    data: function() {
        return {
            setting: {},
            collect: {},
            night: false
        }
    },
    methods: {
        setSetting: function() {
            setting.set(this.setting);
        },
        getSettingValue: function(key) {
            return setting.values[key];
        },
        addCollect: function(news) {
            collect.add(news);
        },
        removeCollect: function(newsid) {
            collect.remove(newsid);
        },
        iscollected: function(newsid) {
            return collect.iscollected(newsid);
        },
        getCollectValue: function() {
            return collect.values();
        }
    },
    ready: function() {
        this.setting = setting.get();
        this.collect = collect.get();
        this.night = night.get();
    },
    watch:{
        "night":function (n) {
            var body = document.body.classList;
            n ? body.add("bak-black") : body.remove("bak-black");
            night.set();
        }
    }
}), "body");