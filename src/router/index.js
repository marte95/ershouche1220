import Vue from 'vue'
import Router from 'vue-router'
import IndexLayout from '../layout/IndexLayout.vue'
import SideLayout from '../layout/SideLayout.vue'

import buyRoute from './buyRoute'
import transferRoute from './transferRoute'

Vue.use(Router)

const router =  new Router({
	mode: 'history',
	routes: [
		{
			path:'/',
			component: IndexLayout,
			redirect: { name: 'index' }, 
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
					// 访问buy页面，自动跳转到当前路由
					redirect: { name: 'large-scale-car-selection'}, 
					// 循环映射出路由的配置项（返回一个JSON配置对象数组）
					children: buyRoute.children.map(item=>({
						path: item.en, 
						component: item.co, 
						meta: { 
							column: 'buy',
							scolumn: item.en, //侧边栏目（三级路由的英文名称）
							scolumnc: item.cn //面包屑导航的中文名称
						},
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
					redirect: { name: 'b2b' }, 
					children: transferRoute.children.map(item => ({
						path: item.en,
						component: item.co,
						meta: { 
							column: 'transfer',
							scolumn: item.en, //侧边栏目（三级路由的英文名称）
							scolumnc: item.cn //面包屑导航的中文名称 
						},
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
		},
		{
			path: '/login',
			component: ()=> import('../views/login/Login.vue'),
			name:'login'
		},
		{ path: "*", redirect: { name: 'index' } }
	]
})

export default router;