<template>
  <form @submit.prevent="registerUser" class="form-container">
    <div class="form-group">
      <label for="email">E-post:</label>
      <input type="email" id="email" v-model="user.email" class="input">
    </div>
    <div class="form-group">
      <label for="password">Lösenord:</label>
      <input type="password" id="password" v-model="user.password" class="input">
    </div>
    <div class="form-group">
      <label for="firstName">Förnamn:</label>
      <input type="text" id="firstName" v-model="user.firstName" class="input">
    </div>
    <div class="form-group">
      <label for="lastName">Efternamn:</label>
      <input type="text" id="lastName" v-model="user.lastName" class="input">
    </div>
    
    <div class="form-group">
      <input type="checkbox" id="privacyPolicy" v-model="acceptedPrivacyPolicy" class="checkbox">
      <label for="privacyPolicy">Jag godkänner </label>
      <router-link to="/privacy-policy" class="link">integritetspolicy</router-link>
    </div>
    <button type="submit" :disabled="!acceptedPrivacyPolicy" class="button">Skapa konto</button>
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
        const response = await fetch('https://loginab.onrender.com/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user),
        });

        if (response.ok) {
          console.log('User registered successfully');
          this.$router.push({ name: 'Welcome' });
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

<style scoped>
.form-container {
  max-width: 300px;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

.input, .checkbox, .button {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

.button {
  background-color: #007bff;
  color: white;
  border: none;
}

.link {
  color: #007bff;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}
</style>