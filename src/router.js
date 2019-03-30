import Vue from 'vue'
import Router from 'vue-router'
import IndexLayout from './layout/IndexLayout.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path:'/index',
			component: IndexLayout,
			children: [
				{
					path: 'index',
					component: () => import('./views/index/Index.vue'),
					meta: { column:'index'},
					name:'index'
				},
				{
					path: 'buy',
					component: () => import('./views/buy/Index.vue'),
					meta: { column:'buy'},
					name:'buy'
				},
				{
					path: 'sale',
					component: () => import('./views/sale/Index.vue'),
					meta: { column:'sale'},
					name:'sale'
				},
				{
					path: 'transfer',
					component: () => import('./views/transfer/Index.vue'),
					meta: { column:'transfer'},
					name:'transfer'
				},
				{
					path: 'insurance',
					component: () => import('./views/insurance/Index.vue'),
					meta: { column:'insurance'},
					name:'insurance'
				},
				{
					path: 'parking',
					component: () => import('./views/parking/Index.vue'),
					meta: { column:'parking'},
					name:'parking'
				},
			]
		}
	]
})
