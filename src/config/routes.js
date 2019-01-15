/**
 * This is where the route records are defined for main navigation.
 */
import Home from '@/views/Home.vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';
import Buttons from '@/views/Buttons.vue';
import About from '@/views/About.vue'; 


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
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      navigationName: 'Dashboard',
    },
    component: Dashboard,
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
      navigationName: 'Buttons & Icons'
    },
    component: Buttons
  },
];

export default routes;
