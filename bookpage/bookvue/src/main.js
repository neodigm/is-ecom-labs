import Vue from 'vue'
import App from './App.vue'
import ltdcLeftnav from './ltdcLeftnav.vue'

new Vue({
  el: '#js-leftnav__id',
  render: h => h(ltdcLeftnav)
})


new Vue({
  el: '#app',
  render: h => h(App)
})
