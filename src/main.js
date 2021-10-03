import Vue from 'vue'
import App from './App.vue'
import VueGoodWizard from 'vue-good-wizard';

Vue.config.productionTip = false

Vue.use(VueGoodWizard);

new Vue({
  render: h => h(App),
}).$mount('#app')
