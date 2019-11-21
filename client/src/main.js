import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import Swal from "sweetalert2";

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    next(err) {
      if (typeof err == 'string') {
        return Swal.fire('', err, 'error')
      } else {
        if (Array.isArray(err.message)) {
          err.message = err.message.join('<br/>')
        }
        Swal.fire({
          title: '',
          html: err.message,
          icon: 'error'
        })
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
