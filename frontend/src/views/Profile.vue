<template>
  <form @submit.prevent="updateUserProfile">

    <div class="image-container">
      <img src="/cone.png" alt="Logga in" class="welcome-image" loading="lazy" />
    </div>

    <div @click="goBack" class="login-image-container">
      <img src="/back.png" alt="Tillbaka" class="login-image" loading="lazy" />
    </div>


    <button @click="showUserDetails" class="button blue">Visa mina uppgifter</button>
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

    <button @click="openEditModal" class="button blue">Uppdatera profil</button>
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
            <button class="button blue" type="submit">Spara ändringar</button>
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

    <button class="button red" @click="showDeleteConfirmation">Radera mitt konto</button>

    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Radera konto</h3>
        <p>Är du säker på att vill radera ditt konto?</p>
        <div>
          <button @click="confirmDeleteProfile" class="button red">Ja</button>
          <button @click="closeModal" class="button blue">Nej</button>
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
      return new Promise((resolve, reject) => {
        const cachedEmail = localStorage.getItem('cachedEmail');
        if (cachedEmail) {
          fetch(`https://login-site-14vx.onrender.com/api/user/profile/${cachedEmail}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to fetch user details');
              }
              return response.json();
            })
            .then(userData => {
              this.userData = userData;
              this.profileData = { ...this.userData, password: '' };
              this.showUserData = true;
              resolve();
            })
            .catch(error => {
              console.error('Error fetching user details:', error);
              reject(error);
            });
        } else {
          console.error('Cached email not found');
          reject(new Error('Cached email not found'));
        }
      });
    },

    closeUserDataModal() {
      this.showUserData = false;
    },

    saveProfileChanges() {
      fetch('https://login-site-14vx.onrender.com/api/user/profile/update', {
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
      this.showUserDetails().then(() => {
        this.profileData = {
          firstName: this.userData.first_name,
          lastName: this.userData.last_name,
          email: this.userData.email,
          password: this.userData.password
        };
        this.showEditModal = true;
        this.showUserData = false;
      }).catch(error => {
        console.error("Error fetching user data for editing:", error);
        this.errorMessage = "Failed to load user details for editing.";
      });
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
        fetch(`https://login-site-14vx.onrender.com/api/user/delete/${this.emailToShowDetails}`, {
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

input[type="email"],
input[type="password"],
input[type="text"],
button {
  width: 90%;
  margin-bottom: 10px;
  padding: 8px;
  background-color: white;
  color: black;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
}

.modal-content {
  padding: 20px;
  border-radius: 5px;
}

.modal {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.button {
  flex: 1;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  color: white;
  text-align: center;
}

.blue {
  background-color: #007bff;
}

.red {
  background-color: #ff4b4b;
  color: white;
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

.close {
  font-size: 40px;
}
</style>