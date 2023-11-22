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
    <button type="submit">Skapa konto</button>
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
      }
    };
  },
  methods: {
    async registerUser() {
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

<style>
</style>