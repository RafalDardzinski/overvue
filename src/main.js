import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import FontAwesomeIcon from '@/config/font-awesome';
import * as Bluebird from 'bluebird';
import { fetch as fetchPolyfill } from 'whatwg-fetch';

Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);

if (!window.Promise) {
  window.Promise = Bluebird;
}

if (!window.fetch) {
  window.fetch = fetchPolyfill;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
