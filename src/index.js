import 'flexboxgrid';
import '@/main.scss';


import UiHelpers from '@/js/common/UiHelpers';
window.UiHelpers = new UiHelpers();


import IDBDatabase from '@/js/Interfaces/Cache/IDBDatabase';
window.idbDatabase = new IDBDatabase();
window.idbDatabase.setup();


import Vue from 'vue';
import Notifications from 'vue-notification'
import Spinner from "@/js/components/Spinner";
import Intersection from '@/js/components/Intersection';


import App from '@/js/App';


window.Vue = Vue;
Vue.use(Notifications)
Vue.component('Spinner', Spinner)
Vue.component('Intersection', Intersection)

new Vue({
  el: '#app',
  render: h => h(App),
});







  

