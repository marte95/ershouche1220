import Vue from 'vue'
import Vuex from 'vuex'
import testStore from './testStore'
import routerStore from './routerStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    testStore,
    routerStore
  }
})
