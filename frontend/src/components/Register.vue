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
      registerUser() {
        console.log(this.user);
      }
    }
  };
  </script>
  
  <style>
  </style>
  