import Vue from 'vue'
import App from './App.vue'
Vue.prototype.$eventBus = new Vue();
// import VueGoodWizard from 'vue-good-wizard';
import VueGoodWizard from '../src';

Vue.config.productionTip = false

Vue.use(VueGoodWizard);

new Vue({
  render: h => h(App),
}).$mount('#app')
