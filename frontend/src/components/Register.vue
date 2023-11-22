<template>
  <form @submit.prevent="registerUser">
    <div>
      <label for="email">E-post:</label>
      <input type="email" id="email" v-model="user.email">
    </div>
    <div>
      <label for="password">Lösenord:</label>
      <input type="password" id="password" v-model="user.password">
    </div>
    <div>
      <label for="firstName">Förnamn:</label>
      <input type="text" id="firstName" v-model="user.firstName">
    </div>
    <div>
      <label for="lastName">Efternamn:</label>
      <input type="text" id="lastName" v-model="user.lastName">
    </div>
    
    <div>
    <input type="checkbox" id="privacyPolicy" v-model="acceptedPrivacyPolicy">
    <label for="privacyPolicy">Jag godkänner </label>
    <router-link to="/privacy-policy">integritetspolicy</router-link>
  </div>
  <button type="submit" :disabled="!acceptedPrivacyPolicy">Skapa konto</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      },
      acceptedPrivacyPolicy: false,
    };
  },
  methods: {
    async registerUser() {
        if (this.acceptedPrivacyPolicy) {
        console.log(this.user);
      } else {
        alert('Du måste godkänna integritetspolicyn för att fortsätta.');
      }
      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user),
        });

        if (response.ok) {
          console.log('User registered successfully');
        } else {
          console.error('Error registering user');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  },
};
</script>

<style>
</style>