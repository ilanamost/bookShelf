import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import jQuery from 'jquery'
import swal from 'sweetalert';

import app from '../css/main.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCarousel from 'vue-carousel';

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(require('vue-moment'));
Vue.use(VueCarousel);

Vue.filter('titleToUppercase', (bookName) => {
  return bookName.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
});

Vue.filter('titleKeepOnlyLetters', (bookName) => {
  return bookName.replace(/[^A-Za-z]/g, ' ');
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
