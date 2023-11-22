import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../components/LogIn.vue';
import Register from '../components/Register.vue';
import PrivacyPolicy from '../components/PrivacyPolicy.vue';
import EditProfile from '../components/EditProfile.vue';
import Welcome from '../components/Welcome.vue'; 

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
    },
    {
      path: '/edit-profile',
      name: 'EditProfile',
      component: EditProfile
    },
    {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
  ]
});

export default router;
