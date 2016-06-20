<template>
	<div class="hl-slide">
		<swiper v-ref:swiper direction="horizontal" :mousewheel-control="false" :performance-mode="false" @slide-change-end="slideEnd" v-if="!!res" class="slide" v-link='{name:"content",replace:true,params:{page:page,newsid:res.newsid,newstype:newstype || item.newstype}}'>
    		<div v-for="i in res.image" class="image-con" :style="{backgroundImage:'url('+i+')'}"></div>
		</swiper>
		<div class="slide-bottom f-s">
			<span v-if="!!res">{{res.title}}</span>
			<ul class="pagination" v-if="!!res">
				<li v-for="p in res.image.length" :class="{active: p===cur}"></li>
			</ul>
		</div>
	</div>
	
</template>

<script>
import swiper from 'vue-swiper'

	export default {
		components:{
			swiper
		},
		props:["page","res","newstype"],
		data: function () {
			 return{
			 	cur:0
			 } 
		},
		methods: {
        	slideEnd (currentPage) {
        		this.cur = currentPage - 1;
        	}
    	}
	}
</script>

<style lang="sass">
	.hl-slide{
		position: relative;
		height: 150px;
		.slide{
			height: 100%;
			div{
				background-color: #ddd;
			}
		}
		.slide-bottom{
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 18px;
			line-height: 18px;
			text-indent: 1em;
			background-image: linear-gradient(to right,rgba(0,0,0,.7) 0%,transparent 70%);
			span{
				color: #fff;
			}
		}
		.pagination{
			float: right;
			margin-right: 1em;
			li{
				display: inline-block;
				height: 6px;
				width: 6px;
				margin-right: 2px;
				border-radius: 3px;
				background-color: #fff;
				&.active{
					background-color: #999;	
				}
			}
		}
	}
</style>