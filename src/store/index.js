import Vue from 'vue'
import Vuex from 'vuex'
import routerStore from './routerStore'
import carpicStore from './carpicStore'
import largeTableStore from './largeTableStore'
import salecarStore from './salecarStore'
import meStore from './meStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    routerStore,
    carpicStore,
    largeTableStore,
    salecarStore,
    meStore
  }
})
