import Vue from 'vue'
import Router from 'vue-router'
import IndexLayout from '../layout/IndexLayout.vue'
import SideLayout from '../layout/SideLayout.vue'

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
					component: () => import('../views/index/Index.vue'),
					meta: { column:'index'},
					name:'index'
				},
				{
					path: 'buy',
					meta: { column:'buy'},
					component: SideLayout,  //左边栏布局组件，存放三级路由
					name:'buy',
					children: [
						{
							path:'index',
							component: ()=>import('../views/buy/Index.vue'),
							meta: { column: 'buy' },  //声明当前所处栏目
						},
						{
							path: 'large-scale-car-selection',
							component: () => import('../views/buy/large-scale-car-selection.vue'),
							meta: { column: 'buy' },  //声明当前所处栏目
						},
						{
							path: 'ai-recommendation-car',
							component: () => import('../views/buy/ai-recommendation-car.vue'),
							meta: { column: 'buy' },  //声明当前所处栏目
						},
						{
							path: 'judicial-auction-vehicle-selection',
							component: () => import('../views/buy/judicial-auction-vehicle-selection.vue'),
							meta: { column: 'buy' },  //声明当前所处栏目
						}
					]
				},
				{
					path: 'sale',
					component: () => import('../views/sale/Index.vue'),
					meta: { column:'sale'},
					name:'sale'
				},
				{
					path: 'transfer',
					component: SideLayout,  //左边栏布局组件，存放三级路由
					meta: { column:'transfer'},
					name:'transfer',
					children:[
						{
							path:'index',
							component: () => import('../views/transfer/Index.vue'),
							meta: { column: 'transfer' },
						},
						{
							path: 'b2b',
							component: () => import('../views/transfer/B2B.vue'),
							meta: { column: 'transfer' },
						},
						{
							path: 'b2w',
							component: () => import('../views/transfer/B2W.vue'),
							meta: { column: 'transfer' },
						},
						{
							path: 'w2b',
							component: () => import('../views/transfer/W2B.vue'),
							meta: { column: 'transfer' },
						}
					]
				},
				{
					path: 'insurance',
					component: () => import('../views/insurance/Index.vue'),
					meta: { column:'insurance'},
					name:'insurance'
				},
				{
					path: 'parking',
					component: () => import('../views/parking/Index.vue'),
					meta: { column:'parking'},
					name:'parking'
				},
			]
		}
	]
})
