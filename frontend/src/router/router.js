import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: () => import('../views/LogIn.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: () => import('../views/PrivacyPolicy.vue')
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('../views/Welcome.vue')
    },
    {
      path: '/project-manager',
      name: 'ProjectManager',
      component: () => import('../views/ProjectManager.vue')
    },
    {
      path: '/events',
      name: 'projectEvents',
      component: () => import('../views/ProjectEvents.vue')
    },       
  ],
});

export default router;
