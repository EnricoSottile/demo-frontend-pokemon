import 'flexboxgrid';
import '@/main.scss';

import UiHelpers from '@/js/common/UiHelpers';

import Vue from 'vue';
import Spinner from "@/js/components/Spinner";

import App from '@/js/App';

Vue.component('Spinner', Spinner)

new Vue({
  el: '#app',
  render: h => h(App),
});



  

