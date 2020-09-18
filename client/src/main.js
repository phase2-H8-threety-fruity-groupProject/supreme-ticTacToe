import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import VueSweetalert2 from 'vue-sweetalert2';
import VueHead from 'vue-head'

Vue.config.productionTip = false

Vue.use(VueHead)
Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://localhost:3000'
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueSweetalert2);