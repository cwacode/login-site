<template>
  <div>
    <h2>Välkommen!</h2>
    
    <div class="vertical-buttons">
  <button @click="goToMyProfile">Min profil</button>
  <button @click="logout">Logga ut</button>
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
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>
