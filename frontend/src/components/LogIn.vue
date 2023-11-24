<template>
  <div class="login-container">
    <div class="image-container">
      <img src="/login.png" alt="Logga in" class="login-image" loading="lazy" />
    </div>
    <h2>Logga in</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username" class="label">E-post:</label>
        <input type="text" id="username" v-model="username" class="input" />
      </div>

      <div class="form-group">
        <label for="password" class="label">Lösenord:</label>
        <input type="password" id="password" v-model="password" class="input" />
      </div>

      <button type="submit" class="button">Logga in</button>
    </form>
  </div>
  <div>
    <p>Eller skapa konto nedan</p>
    <button class="button">
      <router-link :to="{ name: 'Register' }">Skapa konto</router-link>
    </button>
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
    async login() {
      this.$router.push({ name: 'Welcome' });
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  text-align: center;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px; 
}

.login-image {
  width: 150px; 
  height: auto; 
}

.input, .button {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

.button {
  color: blue;
  border: none;
}

.form-group {
  margin-bottom: 15px;
}
</style>
