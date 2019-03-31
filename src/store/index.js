import Vue from 'vue'
import Vuex from 'vuex'
import routerStore from './routerStore'
import carpicStore from './carpicStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    routerStore,
    carpicStore
  }
})
