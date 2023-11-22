<template>
  <div class="login-container">
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

      <button type="submit">Logga in</button>
    </form>
  </div>
  <div>
    <p>Eller skapa konto nedan</p>
    <button>
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

<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  margin-bottom: 5px;
}

.input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
