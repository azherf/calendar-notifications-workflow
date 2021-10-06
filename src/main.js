import Vue from 'vue'
import App from './App.vue'
import Slideout from '@hyjiacan/vue-slideout'
import '@hyjiacan/vue-slideout/lib/slideout.css'

// import Slideout component, and set the defaults props
Vue.use(Slideout, {
  // set default props here
})
Vue.prototype.$eventBus = new Vue();
// import VueGoodWizard from 'vue-good-wizard';
import VueGoodWizard from '../src';

Vue.config.productionTip = false

Vue.use(VueGoodWizard);

new Vue({
  render: h => h(App),
}).$mount('#app')
