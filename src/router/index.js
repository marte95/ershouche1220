import Vue from 'vue'
import Router from 'vue-router'
import IndexLayout from '../layout/IndexLayout.vue'
import SideLayout from '../layout/SideLayout.vue'

import buyRoute from './buyRoute'
import tranferRoute from './tranferRoute'

Vue.use(Router)

const router =  new Router({
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
					// 循环映射出路由的配置项（返回一个JSON配置对象数组）
					children: buyRoute.children.map(item=>({
						path: item.en, 
						component: item.co, 
						meta: { column: 'buy' },
						name: item.en
					}))
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
					children: tranferRoute.children.map(item => ({
						path: item.en,
						component: item.co,
						meta: { column: 'transfer' },
						name: item.en
					}))
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

export default router;