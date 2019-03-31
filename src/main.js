import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import iView from 'iview';
import VueBus from 'vue-bus';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(VueBus);

// 路由守卫（后置钩子）
router.afterEach((to, from)=>{
  // 告诉store我切换路由页面了，每个路由的meta中有一个column属性，声明着路由的名称
  store.commit('routerStore/changeColumn', { 
    column: to.meta.column,
    scolumn: to.meta.scolumn,
    scolumnc: to.meta.scolumnc
  })
  // 让side侧边栏显示
  store.commit('routerStore/changeIsShowSide', { isShowSide: true})
})

// 全局过滤器
Vue.filter('wan', function(str){
  return Math.round(str / 10000)  //将公里数过滤万单位
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
