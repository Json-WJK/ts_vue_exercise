import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
const NutUI = () => import(/* webpackChunkName: "nutui" */'@nutui/nutui')
import '@nutui/nutui/dist/nutui.css';

Vue.use(NutUI)

Vue.config.productionTip = false

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue