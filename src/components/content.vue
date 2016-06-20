<template>
	<div class="container">
		<header v-scroll-top>
	    	<div class="left" v-link='{name:$route.params.page,replace:true}'></div>
	    	<div class="right" :class="{collected:collected}" @click="addCollect()"></div>
	  	</header>
	  	<div class="main night-bak" :style='{background:bakColor,"font-size":fontSize+"px"}' :class="{loaded:loaded,failed:failed}">
	  		<div class="title">
	  			<h2 class="night-f">{{title}}</h2>
	  			<div class="info night-f"><span class="origin">{{origin}}</span><span class="time">{{time | time true}}</span></div>
	  		</div>
	  		<article v-html="content" class="night-f"></article>
	  		<div class="spinner cyan">
	      		<mdl-spinner single-color="#049366"></mdl-spinner>
	    	</div>
	    	<div class="fail-info" v-touch:tap="refresh()">
	    		加载失败，点击刷新
	    	</div>
	  	</div>
	</div>
</template>

<script>
import {MdlSpinners} from 'vue-mdl'

import listH from './listHorizontal.vue'

import content from '../resource/content.js'

	export default {
		components:{
			listH,MdlSpinners
		},
		data:function () {
			 return{
			 	newsid:"",
			 	newstype:"",
			 	title:"",
			 	origin:"",
			 	time:0,
			 	image:"",
			 	content:"",
			 	loaded:false,
			 	failed:false,
			 	bakColor:"",
			 	fontSize:0,
			 	collected:false
			 } 
		},
		methods:{
			refresh: function () {
				 this.failed = false;
				 this.load = false;
				 this.newsid = this.$route.params.newsid;
				 this.newstype = this.$route.params.newstype;
				 this.collected = this.$root.iscollected(this.newsid);
				 this.$http.jsonp(content.url(this.newstype,this.newsid))
				 .then(function (response) {
				 	var d = content.parse(response.data);
				 	this.title = d.title;
				 	this.origin = d.origin;
				 	this.time = d.time;
				 	this.image = d.image;
				 	this.content = d.content;
				 	this.loaded =true;
				 },function () {
				 	this.failed = true; 
				 });  
			},
			addCollect: function () {
				var c = this.collected;
				this.collected = !c;
				c ? this.$root.removeCollect(this.newsid) : this.$root.addCollect(this)
			}
		},
		route:{
			activate:function (transition) {
				this.loaded =false;
				this.bakColor = this.$root.getSettingValue("bakColor");
				this.fontSize = this.$root.getSettingValue("fontSize");
				transition.next();
				this.refresh();
			}
		}
	}
</script>

<style lang="sass" scoped>
	header{
		.left{
			background-image: url('../image/back.png');
			background-size: 30%;
		}
		.right{
			background-image: url('../image/heart.png');
			background-size: 60%;
			background-position: center 10px;
			&.collected{
				background-position: center -20px;
			}
		}
	}
	.main{
		position:relative;
		height: calc(100% - 36px);
		width: 100%;
		padding: 0 18px;
		&.loaded{
			background: none;
			.spinner{
				display:none;
			}
			.title,article{
				display:block;
			}
		}
		&.failed{
			background: none;
			.spinner{
				display:none;
			}
			.fail-info{
				display:block;
			}
		}
		.title{
			display: none;
			padding-top: 18px;
			overflow: auto;
			h2{
				font-size: 22px;
				font-weight: bold;
				line-height: 1.2em;
				color: #444;
			}
			.info{
				height: 14px;
				padding: .3em 0;
				border-bottom: 1px solid #ddd;
				font-size: 13px;
				color: #999;
			}
			.time{
				float: right;
			}
			.origin{
				float: left;
			}
		}
		article{
			display: none;
			width: 100%;
		}
		.spinner{
			left:50%;
			top: 40%;
			background: url('../image/logo_cyan.png') 49.8% 44.5% no-repeat;
			background-size: 25px;
		}
		.fail-info{
			display: none;
			position: absolute;
			top: 40%;
			left: 50%;
			width: 120px;
			padding-top: 70px;
			margin-left: -60px;
			background: url(../image/fail_cnt.png) center top no-repeat;
			background-size: 50%;
			font-size: 12px;
			color: #aaa;
			text-align: center;
		}
	}
</style>