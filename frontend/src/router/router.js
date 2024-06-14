import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: () => import('../components/LogIn.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/Register.vue')
    },
    {
      path: '/edit-profile',
      name: 'EditProfile',
      component: () => import('../components/EditProfile.vue')
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: () => import('../components/PrivacyPolicy.vue')
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('../components/Welcome.vue')
    },
    {
      path: '/project-manager',
      name: 'ProjectManager',
      component: () => import('../components/ProjectManager.vue')
    },    
  ],
});

export default router;
