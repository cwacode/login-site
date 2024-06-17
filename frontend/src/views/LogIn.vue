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

      <button type="submit" class="button">Logga in</button>
    </form>
  </div>
  <div>
    <p>Eller skapa konto nedan</p>
      <router-link :to="{ name: 'Register' }" class="button">
        <button type="submit" class="button">Skapa konto</button>
      </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  mounted() {
    const cachedEmail = localStorage.getItem('cachedEmail');
    if (cachedEmail) {
      this.username = cachedEmail;
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('https://login-site-14vx.onrender.com/api/user/login', {
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
            const data = await response.json();
            localStorage.setItem('cachedEmail', this.username);
            this.$router.push({ name: 'Welcome' }); 
          } else {
            localStorage.removeItem('cachedEmail'); 
            throw new Error('Logga in misslyckades');
          }
        }
       catch (error) {
          this.error = 'Fel e-post eller lösenord';
          setTimeout(() => {
            this.error = '';
          }, 2000); 
      }
    },
  }
};
</script>


<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
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

.input {
  width: 90%;
  margin-bottom: 10px;
  padding: 8px;
}

.button {
  background-color: #007bff;
  color: white;
  border: none;
  margin: 0;
  width: 100%;
}
a {
  max-width: 78%;
}
.form-group {
  margin-bottom: 15px;
}

.error-message {
  color: red;
  margin-top: 5px;
}
</style>
