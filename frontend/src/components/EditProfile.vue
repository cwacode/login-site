<template>
    <form @submit.prevent="updateUserProfile">
      <div>
        <label for="email">E-post:</label>
        <input type="email" id="email" v-model="user.email">
      </div>
      <div>
        <label for="password">Nytt lösenord:</label>
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
      <button type="submit">Uppdatera profil</button>
      <button @click="confirmAccountDeletion" class="delete-account-btn">Radera mitt konto</button>
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
      confirmAccountDeletion() {
       if (window.confirm("Är du säker på att du vill radera ditt konto?")) {
        this.deleteAccount();
      }
    },
  },
  };
  </script>
  
  <style>
  .delete-account-btn {
  background-color: red;
  color: white;
}
  </style>
  