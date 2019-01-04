/**
 * This is where the route records are defined for main navigation.
 */
import Home from '@/views/Home.vue';
import Buttons from '@/views/Buttons.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/buttons',
    name: 'buttons',
    component: Buttons
  },
  {
    path: '/sales-and-marketing',
    name: 'sales-and-marketing',
    meta: {
      navigationName: 'Sales and Marketing'
    }
  }
];

export default routes;
