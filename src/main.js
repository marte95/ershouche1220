import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import iView from 'iview';
import VueBus from 'vue-bus';
import axios from 'axios';
import 'iview/dist/styles/iview.css';
import LoadingGifImage from './components/LoadingGifImage/index.vue';

// 定义全局组件（预加载组件）
Vue.component('LoadingGifImage', LoadingGifImage)

Vue.use(iView);
Vue.use(VueBus);

// 导航前置守卫
router.beforeEach(async function (to, from, next) {
	const token = localStorage.getItem('token'); //获取本地存储的token
	// 只要你去的不是login页面，就要去/me接口发出查询，查看是否已经登录了
	const { login, username, nickname, avatar, mobile, sex } = await axios.get(`/api/me?token=${token}`).then(res => res.data)

	if (to.name !== 'login') {
		if (login || username) {
			// 将获取到的数据都存储到Store
			store.commit('meStore/changeLogin', {login })
			store.commit('meStore/changeUsername', {username })
			store.commit('meStore/changeNickname', {nickname })
			store.commit('meStore/changeAvatar', {avatar })
			store.commit('meStore/changeMobile', {mobile })
			store.commit('meStore/changeSex', {sex })
			next();  //如果已经登录所有页面都放行
		} else {
			next({ name: 'login' });   //没有登陆就去登录页面
		}
	} else {
		next()
	}
	console.log(login, username, nickname, avatar, mobile, sex)

})

// 路由守卫（后置钩子）
router.afterEach((to, from) => {
	// 告诉store我切换路由页面了，每个路由的meta中有一个column属性，声明着路由的名称
	store.commit('routerStore/changeColumn', {
		column: to.meta.column,
		scolumn: to.meta.scolumn,
		scolumnc: to.meta.scolumnc
	})
	// 让side侧边栏显示
	store.commit('routerStore/changeIsShowSide', { isShowSide: true })
})

// 全局过滤器
Vue.filter('wan', function (str) {
	return Math.round(str / 10000)  //将公里数过滤万单位
})

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
