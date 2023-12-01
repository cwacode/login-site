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

      <div v-if="error" class="error-message">{{ error }}</div>

      <label>
        <input type="checkbox" v-model="rememberMe"> Kom ihåg mig
      </label>

      <button type="submit" class="button">Logga in</button>
    </form>
  </div>
  <div>
    <p>Eller skapa konto nedan</p>
    <button class="button" type="submit">
      <router-link :to="{ name: 'Register' }" class="button">Skapa konto</router-link>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      rememberMe: false
    };
  },
  mounted() {
    const cachedEmail = localStorage.getItem('cachedEmail');
    if (cachedEmail && this.rememberMe) {
      this.username = cachedEmail;
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('https://loginab.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.username,
            password: this.password
          })
        });

        if (response.ok) {
          if (this.rememberMe) {
            localStorage.setItem('cachedEmail', this.username);
          } else {
            localStorage.removeItem('cachedEmail'); 
          }
          this.$router.push({ name: 'Welcome' }); 
        } else {
          throw new Error('Logga in misslyckades');
        }
      } catch (error) {
          this.error = 'Fel e-post eller lösenord';
          setTimeout(() => {
            this.error = '';
          }, 2000); 
      }
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
  background-color: #007bff;
  color: white;
  border: none;
}

.form-group {
  margin-bottom: 15px;
}

.error-message {
  color: red;
  margin-top: 5px;
}
</style>
