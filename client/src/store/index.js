import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: []
  },
  mutations: {
    setMessages (state, payload) {
      state.messages.push(payload)
    },
    resetMessages (state) {
      state.messages = []
    }
  },
  actions: {
  },
  modules: {
  }
})
