<template>
	<div class="container">
		<header class="bak-cyan">
		    <div class="left" v-link='{name:"index",replace:true}'></div>
		    <div class="right switch">
		    	<mdl-switch :checked.sync="$root.night" class="mdl-js-ripple-effect"></mdl-switch>
		    </div>
	  	</header>
	  	<nav>
	  		<mdl-button v-mdl-ripple-effect @click='cur=true' :class='{selected:cur}'>设 置</mdl-button>
	  		<mdl-button v-mdl-ripple-effect @click='cur=false' :class='{selected:!cur}'>收 藏</mdl-button>
	  	</nav>
	  	<div class="main">
	  		<setting v-show="cur"></setting>
	  		<list-v page="user" v-show="!cur" :res="collect"></list-v>	
	  	</div>
	</div>
</template>

<script>
import {MdlSwitches,MdlButtons} from 'vue-mdl'

import setting from './setting.vue'
import listV from './listVertical.vue'


export default {
	components:{
		MdlSwitches,MdlButtons,setting,listV
	},
	data:function(){
		return {
			cur:true,
			collect:[]
		}
	},
	route:{
		activate: function (transition) {
			 this.collect = this.$root.getCollectValue();
			 transition.next();
		}
	}
}
</script>

<style lang="sass" scoped>
$cyan: #049366;
	header{
		.left{
			background-image: url(../image/back_white.png);
			background-size: 30%;
		}
		.right{
			width: 50px;
			padding-left: 24px;
			line-height: 36px;
			text-align: right;
			background-image: url(../image/moon.png);
			background-position: left center;
			background-size: 16px;
		}
		
	}
	nav{
		display: flex; 
		align-items: flex-end;
		width: 100%;
		height: 224px;
		background: $cyan url(../image/logo_text.png) center 30% no-repeat;
		background-size: 75px;
		color: #fff;
		button{
			text-align: center;
			flex: 1 1 2em;
			line-height: 40px;
			font-size: 16px;
			color: #fff;
			&.selected{
				background-color:#028c60;
			}
		}
	}
	.main{
		height: calc(100% - 260px);
	}
</style>