<template>
  <div>
    <h2>Välkommen!</h2>
    
    <div class="vertical-buttons">
      <button @click="goToMyProfile">Min profil</button>
      <button @click="goToEditProfile">Ändra profil</button>
      <button @click="confirmDeleteProfile">Radera profil</button>
      <button @click="logout">Logga ut</button>
    </div>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p>Ange din e-postadress:</p>
        <input type="email" v-model="emailToDelete">
        <button @click="deleteProfile">Bekräfta</button>
      </div>
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
      successMessage: ''
    };
  },
  methods: {
    goToMyProfile() {
      
    },
    goToEditProfile() {
      
    },
    logout() {
      this.$router.push({ name: 'LogIn' });
    },
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

</style>
