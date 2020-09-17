import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [],
    board: []
  },
  mutations: {
    setMessages (state, payload) {
      state.messages = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
