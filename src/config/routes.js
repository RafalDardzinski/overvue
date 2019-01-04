/**
 * This is where the route records are defined for main navigation.
 */
import Home from '@/views/Home.vue';
import Buttons from '@/views/Buttons.vue';
import About from '@/views/About.vue'; 
import SalesAndMarketing from '@/views/sales-and-marketing/sales-and-marketing.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      navigationName: 'Home'
    },
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      navigationName: 'About'
    },
    component: About
  },
  {
    path: '/buttons',
    name: 'buttons',
    meta: {
      navigationName: 'Buttons'
    },
    component: Buttons
  },
  {
    path: '/sales-and-marketing',
    name: 'sales-and-marketing',
    meta: {
      navigationName: 'Sales and Marketing'
    },
    component: SalesAndMarketing
  }
];

export default routes;
