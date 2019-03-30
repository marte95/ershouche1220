import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/index',
			component: () => import('./views/index/Index.vue')
		},
		{
			path: '/buy',
			component: () => import('./views/buy/Index.vue')
		},
		{
			path: '/sale',
			component: () => import('./views/sale/Index.vue')
		},
		{
			path: '/transfer',
			component: () => import('./views/transfer/Index.vue')
		},
		{
			path: '/insurance',
			component: () => import('./views/insurance/Index.vue')
		},
		{
			path: '/parking',
			component: () => import('./views/parking/Index.vue')
		},
	]
})
