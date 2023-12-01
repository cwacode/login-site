<template>
<form @submit.prevent="updateUserProfile">

  <div class="image-container">
      <img src="/cone.png" alt="Logga in" class="welcome-image" loading="lazy" />
    </div>

  <div @click="goBack" class="login-image-container">
      <img src="/back.png" alt="Tillbaka" class="login-image" loading="lazy" />
    </div>

    
<button @click="showUserDetails" class="button">Visa mina uppgifter</button>

<div v-if="showUserData && userData" class="modal">
  <div class="modal-content">
    <span class="close" @click="closeUserDataModal">&times;</span>
    <h3>Användaruppgifter</h3>
    <div>
      <p><strong>Förnamn:</strong> {{ userData.first_name }}</p>
      <p><strong>Efternamn:</strong> {{ userData.last_name }}</p>
      <p><strong>E-post:</strong> {{ userData.email }}</p>
    </div>
  </div>
</div>

<button @click="openEditModal">Uppdatera profil</button>

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
          <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
        </div>
      </form>
    </div>
  </div>

  <button class="delete" @click="showDeleteConfirmation">Radera mitt konto</button>

  <div v-if="showDeleteModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h3>Radera konto</h3>
      <p>Är du säker på att vill radera ditt konto?</p>
      <div>
        <button @click="confirmDeleteProfile">Ja</button>
        <button @click="closeModal" class="red-button">Nej</button>
      </div>
    </div>
  </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
      errorMessage: '',
      successMessage: '',
      showEditModal: false,
      profileData: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      userData: null,
      showUserData: false,
      emailToShowDetails: '',
      showDeleteModal: false,
    };
    },

    methods: {

    showUserDetails() {
      const cachedEmail = localStorage.getItem('cachedEmail');
      if (cachedEmail) {
        this.emailToShowDetails = cachedEmail;
        fetch(`https://loginab.onrender.com/api/profile/${this.emailToShowDetails}`)
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

          })
          .catch(error => {
            console.error('Error fetching user details:', error);
          });
      }
    },

    closeUserDataModal() {
      this.showUserData = false;
    },

saveProfileChanges() {
  fetch('https://loginab.onrender.com/api/profile/update', {
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

    openEditModal() {
      this.showEditModal = true;
    },

    showDeleteConfirmation() {
      this.showDeleteModal = true;
    },
    goBack() {
      this.$router.push({ name: 'Welcome' }); 
    },

    confirmDeleteProfile() {
      console.log("confirmDeleteProfile method is triggered");
      const cachedEmail = localStorage.getItem('cachedEmail');
      if (cachedEmail) {
        this.emailToShowDetails = cachedEmail;
        fetch(`https://loginab.onrender.com/api/delete/${this.emailToShowDetails}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (response.ok) {
              this.$router.push({ name: 'LogIn' });
            } else if (response.status === 404) {
              this.errorMessage = 'Profilen finns inte';
            } else {
              console.error('Error deleting profile:', response.status);
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        console.error('Cached email not found');
      }
    },

    closeModal() {
      this.showDeleteModal = false;
    },

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
  background-color: #007bff;
  color: white;
  border: none;
}

.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  padding: 20px;
  border-radius: 5px;
}

.delete {
  background-color: red;
  color: white;
  border: none;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
.red-button {
  background-color: red;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
}

.login-image-container {
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}

.login-image {
  max-width: 60px; 
  height: auto;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px; 
}

.welcome-image {
  width: 150px; 
  height: auto; 
}

</style>
