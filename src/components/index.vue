<template>
  <div class="container">
    <header class="bak-cyan shadow-down" :class="{loaded:loaded,failed:failed}" v-scroll-top>
      <div class="left" v-link='{name:"user",replace:true}'></div>
      <div class="right" @click.stop="refresh(curType)"></div>
      <div class="spinner white">
        <mdl-spinner single-color="#049366"></mdl-spinner>
      </div>
    </header>
    <nav class="f-m noscroll night-f">
      <div v-for="n in navs" :class="{active: n.type===curType}" v-touch:tap="refresh(n.type)">{{n.title}}</div>
    </nav>
    <div  v-infinite-scroll="loadMore()" infinite-scroll-disabled="busy" infinite-scroll-distance="0" class="main noscroll">
      <headline page="index" :res="news[0]" :newstype="curType"></headline>
      <list-h page="index" :res="news.slice(1,3)" :newstype="curType"></list-h>
      <list-v page="index" :res="news.slice(3)" :newstype="curType"></list-v>
    </div>
  </div>
</template>

<script>
import {MdlSpinners} from 'vue-mdl'
import {infiniteScroll} from 'vue-infinite-scroll'

import headline from './headline.vue'
import listH from './listHorizontal.vue'
import listV from './listVertical.vue'

import type from '../resource/type.js'
import list from '../resource/list.js'

export default {
  components: {
    headline,listH,listV,MdlSpinners
  },
  directives:{
    infiniteScroll
  },
  data: function () {
     return {
        news:[],
        navs: type,
        curType: 1,
        curNewsSum: 0,
        loaded:false,
        failed:false,
        newsSum:0
     } 
  },

  methods:{
    load:function (prm) {
      prm.then(function (response) {
        this.failed = false;
        this.$set("news",list.parse(response.data).slice());
        this.loaded = true;
      },function () {
         this.failed = true; 
      });
    },
    refresh:function (type) {
      document.querySelector(".main").scrollTop = 0; 
      this.loaded = false;
      this.curNewsSum = this.newsSum;
      this.load(this.$http.jsonp(list.url({type,pagesize:this.newsSum})));
      this.curType = type; 
    },
    loadMore:function () {
       this.loaded = false; 
       this.load(this.$http.jsonp(list.url({type:this.curType,pagesize:(this.curNewsSum+=this.newsSum)})));
    }
  },

  ready:function () {
     this.newsSum = this.$root.getSettingValue("newsSum");
     this.load(this.$http.jsonp(list.url({type:1,pagesize:this.newsSum})));
  },
  route:{
    activate:function (transition) {
      this.newsSum = this.$root.getSettingValue("newsSum");
      transition.next();
    }
  }
}
</script>

<style lang="sass" scoped>
$cyan: #049366;
header{
  background: $cyan;
  &.loaded{
    background: $cyan url('../image/logo.png') center 45% no-repeat;
    background-size: 18px;
    .spinner{
      display:none;
    }
  }
  &.failed{
    background: $cyan url('../image/fail.png') center 45% no-repeat;
    background-size: 18px;
    .spinner{
      display:none;
    }
  }
  
  .left{
    background-image: url('../image/user.png');
  }
  .right{
    background-image: url('../image/refresh.png');
  }
  .spinner{
    left: 50%;
    top: 8px;
    
  }
}
nav{
  display: flex;
  flex-wrap: nowrap;
  box-shadow: inset 0 -2px 0 #ddd;
  color: #444;
  text-align: center;
  overflow-x: auto;
  div{
    flex: 0 0 18%;
    box-sizing: border-box;
    height: 32px;
    padding: .6em 0;
    &.active{
      border-bottom: 2px solid $cyan;
      background-color: rgba(0,0,0,.05);
    }
  }
}
.main{
  height: calc(100% - 68px);
  &:after{
    content: "加载中";
    display: block;
    padding: 15px 0;
    color: #bbb;
    font-size: 14px;
    text-align: center;
  }
}
</style>
