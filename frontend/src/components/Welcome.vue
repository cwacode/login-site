<template>
  <div>
    <h2>Välkommen!</h2>
    <div class="image-container">
      <img src="/welcome.png" alt="Logga in" class="welcome-image" loading="lazy" />
    </div>
    <div class="vertical-buttons">
  <p><button type="submit" class="button" @click="goToMyProfile">Min profil</button></p>
  <p><button type="submit" class="button" @click="logout">Logga ut</button></p>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      showDeleteModal: false,
      emailToDelete: '',
      errorMessage: '',
      successMessage: '',
      showEditModal: false,
      profileData: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      showEmailModal: false,
      emailToShowDetails: '',
      userData: null,
      showUserData: false,
    };
  },
  methods: {
    
    goToMyProfile() {
      this.$router.push({ name: 'EditProfile' });
      
    },
    logout() {
      this.$router.push({ name: 'LogIn' });
    },

  }
};
</script>

<style>
.vertical-buttons {
  display: flex;
  flex-direction: column;
}
.close { 
  cursor: pointer; 
}
.success-message {
  color: green;
  margin-top: 10px;
}
.error-message {
  color: red;
  margin-top: 10px;
}
.vertical-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 2px;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px; 
}

.welcome-image {
  width: 150px; 
  height: auto; 
}

</style>
