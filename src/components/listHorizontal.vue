<template>
	<div class="con list-h">
		<a v-for="item in res" track-by="newsid" v-link='{name:"content",replace:true,params:{page:page,newsid:item.newsid,newstype:newstype || item.newstype}}'>
			<div class="list-image image-con" :style="{backgroundImage:'url('+item.image[0]+')'}"></div>
			<div class="list-text">
				<h3 class="night-f">{{item.title}}</h3>
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
	.list-h{
		display: flex;
		width: 100%;
		a{
			box-sizing: border-box;
			flex: 0 0 50%;
			width: 50%;
			padding: 10px;
			&:nth-child(2n){
				border-left: 1px solid #eee;
			}
		}
		.list-image{
			width: 100%;
			height: 90px;
			margin-bottom: 5px;
		}
		.list-text{
			h3{
				height: 40px;
				font-size: 13px;
			}
			.info{
				margin-top: 12px;
			}
		}	
	}
	body.bak-black .list-h a:nth-child(2n){
		border-left: 1px solid #444;
	}
</style>