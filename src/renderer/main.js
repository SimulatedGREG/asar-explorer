import Vue from 'vue'
import * as fs from './fs'

import App from './App'
import store from './store'

Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.prototype.$fs = fs

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app')
