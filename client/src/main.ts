/*
 * @Description: Ruebin edited
 * @Author: Ruebin
 * @Date: 2020-05-17 14:56:39
 * @LastEditTime: 2020-05-18 16:01:53
 * @LastEditors: Ruebin
 */ 
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './stores/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
