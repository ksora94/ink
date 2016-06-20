<template>
	<div class="setting">
		<div class="set-item">
			<div class="name night-f"><i class="icon news"></i>首页新闻</div>
			<div class="selection">
				<mdl-button class="night-f" v-for="n in $root.setting.newsSum" :class="{selected:n.selected}" v-toggle-selection="{list:$root.setting.newsSum,item:n,callback:$root.setSetting}" v-mdl-ripple-effect>
					{{n.text}}
				</mdl-button>
			</div>
		</div>
		<div class="set-item">
			<div class="name night-f"><i class="icon font"></i>正文字号</div>
			<div class="selection">
				<mdl-button class="night-f" v-for="s in $root.setting.fontSize" :class="{selected:s.selected}" v-toggle-selection="{list:$root.setting.fontSize,item:s,callback:$root.setSetting}" v-mdl-ripple-effect>
					<span :style='{"font-size":s.value+"px"}'>{{s.text}}</span>
				</mdl-button>
			</div>
		</div>
		<div class="set-item">
			<div class="name night-f"><i class="icon bak"></i>正文背景</div>
			<div class="selection">
				<mdl-button v-for="c in $root.setting.bakColor" :class="{selected:c.selected}" v-toggle-selection="{list:$root.setting.bakColor,item:c,callback:$root.setSetting}" v-mdl-ripple-effect>
					<div class="atc-bak" :style='{"background":c.value}'>{{c.text}}</div>
				</mdl-button>
			</div>
		</div>
	</div>
</template>

<script>
import {MdlButtons} from 'vue-mdl'

	export default {
		components:{
			MdlButtons
		}
	}
</script>

<style lang="sass">
$cyan: #049366;
	.set-item{
		display: flex;
		height: 100px;
		line-height: 100px;
		text-align: center;
		.name{
			width: 120px;
		}
		.selection{
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-grow: 1;
		}
		button{
			height: 50px;
			width: 50px;
			min-width: auto;
			padding: 5px;
			border-radius: 50%;
		}
		button.selected{
			background-color: $cyan;
			color: #fff;
		}
		button .mdl-button__ripple-container{
			border-radius: 50%;
		}
	}
	.setting .atc-bak{
		width: 100%;
		height: 100%;
		line-height: 40px;
		border-radius: 50%;
		color: #222;
	}
</style>