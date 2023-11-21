import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../components/LogIn.vue';
import Register from '../components/Register.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
});

export default router;
