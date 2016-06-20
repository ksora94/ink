<template>
	<div class="list-v shadow-up">
		<a v-for="item in res" track-by="newsid" v-link='{name:"content",replace:true,params:{page:page,newsid:item.newsid,newstype:newstype || item.newstype}}'>
			<div class="list-image image-con" :style="{backgroundImage:'url('+item.image[0]+')'}"></div>
			<div class="list-text">
				<h3 class="night-f">{{item.title}}</h3>
				<div class="digest ellipsis night-f">{{item.digest}}</div>
				<div class="info night-f">
					<div class="origin left">{{item.origin}}</div>
					<div class="time right">{{item.time | time}}</div>
				</div>
			</div>
		</a>
	</div>
</template>

<script>
	export default{
		props:["page","res","newstype"]
	}
</script>

<style lang="sass">
	.list-v{
		width: 100%;
		a{
			display: flex;
			height: 80px;
			padding: 8px 10px;
			border-bottom: 1px solid #eee;
		}
		.list-image{
			flex: 0 0 30%;
			height: 100%;
			width: 30%;
		}
		.list-text{
			box-sizing: border-box;
			flex: 1 1 70%;
			width: 70%;
			padding: 3px 10px;
			h3{
				height: 34px;
				width: 100%;	
				font-size: 13px;
			}
			.digest{
				height: 12px;
				margin: 7px 0;
				font-size: 12px;
				color: #555;
			}
			.origin{
				transform-origin:left;
				transform: scale(.8);
			}
		}	
	}
	body.bak-black .list-v a{
		border-bottom: 1px solid #444;
	}
</style>