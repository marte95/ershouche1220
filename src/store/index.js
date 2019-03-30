import Vue from 'vue'
import Vuex from 'vuex'
import testStore from './testStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    testStore
  }
})
