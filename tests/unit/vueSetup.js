import Vue from 'vue'
import Notifications from 'vue-notification'
import Spinner from "@/js/components/Spinner";
import Intersection from '@/js/components/Intersection';

Vue.use(Notifications)
Vue.component('Spinner', Spinner)
Vue.component('Intersection', Intersection)