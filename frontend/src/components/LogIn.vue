<template>
  <div>
    <h2>Logga in</h2>
    <form @submit.prevent="login">
      <label for="username">E-post:</label>
      <input type="text" id="username" v-model="username" />

      <label for="password">Lösenord:</label>
      <input type="password" id="password" v-model="password" />

      <button type="submit">Logga in</button>
    </form>
  </div>
  <div>
    <p>Eller skapa konto nedan</p>
    <button type="submit">Skapa konto</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      console.log('Logging in with:', this.username, this.password);
    }
  }
};
</script>