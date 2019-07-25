// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

import 'animate.css'
import 'fullpage-vue/src/fullpage.css'
import VueFullpage from 'fullpage-vue'
import vGallery from 'v-gallery'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)
Vue.use(VueFullpage)
Vue.use(vGallery)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
