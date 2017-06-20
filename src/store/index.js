import Vue from 'vue'
import Vuex from 'vuex'


import * as deal from './deal/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    deal
  }
})