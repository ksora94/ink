import index from './components/index.vue'
import user from './components/user.vue'
import content from './components/content.vue'

export default function (router) {
	 router.map({
	 	'/index':{
	 		name:"index",
	 		component: index
	 	},
	 	'/content/page/:page/newstype/:newstype/newsid/:newsid':{
	 		name:"content",
	 		component:content
	 	},
	 	'/user':{
	 		name:"user",
	 		component: user
	 	}
	 });
	 router.redirect({
	 	'/':'/index'
	 });
}