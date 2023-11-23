<template>
  <div>
    <h2>Välkommen!</h2>
    
    <div class="vertical-buttons">
  <button @click="goToMyProfile">Min profil</button>
  <button @click="showUserDetails">Visa mina uppgifter</button>
  <button @click="openEditModal">Ändra profil</button>
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
    <div v-if="showEditModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeEditModal">&times;</span>
      <h3>Ändra profil</h3>
      <form @submit.prevent="saveProfileChanges" class="vertical-form">
        <div class="form-group">
          <label for="firstName">Förnamn:</label>
          <input type="text" id="firstName" v-model="profileData.firstName">
        </div>
        <div class="form-group">
          <label for="lastName">Efternamn:</label>
          <input type="text" id="lastName" v-model="profileData.lastName">
        </div>
        <div class="form-group">
          <label for="email">E-post:</label>
          <input type="email" id="email" v-model="profileData.email">
        </div>
        <div class="form-group">
          <label for="password">Lösenord:</label>
          <input type="password" id="password" v-model="profileData.password">
        </div>
        <div class="form-group">
          <button type="submit">Spara ändringar</button>
        </div>
      </form>
    </div>
    </div>
  </div>
  <div v-if="showEmailModal" class="modal">
  <div class="modal-content">
    <span class="close" @click="closeEmailModal">&times;</span>
    <p>Ange din e-postadress:</p>
    <input type="email" v-model="emailToShowDetails">
    <button @click="getUserDetails">Visa</button>
    <div v-if="showUserData && userData">
      <h3>Användaruppgifter</h3>
      <div>
        <p><strong>Förnamn:</strong> {{ userData.first_name }}</p>
        <p><strong>Efternamn:</strong> {{ userData.last_name }}</p>
        <p><strong>E-post:</strong> {{ userData.email }}</p>
      </div>
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
      },
      openEditModal() {
      this.showEditModal = true;
    },

    saveProfileChanges() {
  fetch('http://localhost:3000/api/profile/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: this.profileData.firstName,
      lastName: this.profileData.lastName,
      email: this.profileData.email,
      password: this.profileData.password,
    }),
  })
  .then(response => {
    if (response.ok) {
      this.successMessage = 'Profilen är nu ändrad'; 
          setTimeout(() => {
            this.showEditModal = false;
            this.successMessage = '';
          }, 4000); 
    } else {
      this.errorMessage = 'Profilen finns inte';
            setTimeout(() => {
              this.showEditModal = false;
              this.errorMessage = ''; 
            }, 4000); 
    }
  })
  .catch(error => {
    console.error('Error updating profile:', error);
  });
},
    closeEditModal() {
      this.showEditModal = false;
    },
    showUserDetails() {
      this.showEmailModal = true;
    },

    closeEmailModal() {
      this.showEmailModal = false;
      this.emailToShowDetails = '';
    },

    getUserDetails() {
  fetch(`http://localhost:3000/api/profile/${this.emailToShowDetails}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch user details');
      }
    })
    .then(userData => {
      this.userData = userData;
      this.showUserData = true; 

      setTimeout(() => {
        this.showEmailModal = false;
        this.emailToShowDetails = '';
        this.userData = null;
      }, 4000); 
    })
    .catch(error => {
      console.error('Error fetching user details:', error);
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
