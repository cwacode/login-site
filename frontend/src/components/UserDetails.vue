<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <h3>Användaruppgifter</h3>
        <div>
          <p><strong>Förnamn:</strong> {{ userData.first_name }}</p>
          <p><strong>Efternamn:</strong> {{ userData.last_name }}</p>
          <p><strong>E-post:</strong> {{ userData.email }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean,
      email: String
    },
    data() {
      return {
        userData: null,
      };
    },
    methods: {
      fetchData() {
        if (this.email) {
          fetch(`https://login-site-14vx.onrender.com/api/profile/${this.email}`)
            .then(response => response.json())
            .then(data => {
              this.userData = data;
            })
            .catch(error => {
              console.error('Error fetching user details:', error);
            });
        }
      },
      close() {
        this.$emit('close');
      }
    },
    watch: {
      email(newVal) {
        if (newVal) {
          this.fetchData();
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }
  .close {
    cursor: pointer;
    float: right;
    font-size: 1.5em;
  }
  </style>
  