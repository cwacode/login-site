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
      <button @click="confirmDeleteProfile">Radera mitt konto</button>

      <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p>Ange din e-postadress:</p>
        <input type="email" v-model="emailToDelete">
        <button @click="deleteProfile">Bekräfta</button>
      </div>
    </div>
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
          lastName: '',
        },
        showDeleteModal: false,
        emailToDelete: '',
      };
    },
    methods: {
      confirmDeleteProfile() {
       this.showDeleteModal = true;
    },
      closeModal() {
       this.showDeleteModal = false;
       this.emailToDelete = '';
    },
    deleteProfile() {
      if (this.emailToDelete.trim() === '') {
        return;
      }
      fetch(`http://localhost:3000/api/delete/${this.emailToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            this.successMessage = 'Profilen är nu raderad'; 
            setTimeout(() => {
              this.successMessage = ''; 
              this.closeModal(); 
            }, 1000);
          }else if (response.status === 404) {
            this.errorMessage = 'Profilen finns inte';
            setTimeout(() => {
              this.errorMessage = ''; 
            }, 1000); 
          } else {
            console.error('Error deleting profile:', response.status);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
  },
  };
  </script>
  
  <style scoped>
form {
  max-width: 300px;
  margin: auto;
}

input[type="email"], input[type="password"], input[type="text"], button {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

button {
  color: white;
  border: none;
}

.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  padding: 20px;
  border-radius: 5px;
}
</style>

  