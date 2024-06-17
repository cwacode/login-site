<template>
  <div class="card">
    <h2 class="card-title">{{ form.id ? 'Edit Event' : 'New Event' }}</h2>
    <div class="card-body">
      <form @submit.prevent="saveEvent" class="form">
        <div class="form-group">
          <label for="title">Event Title</label>
          <input type="text" id="title" v-model="form.title" required>
        </div>
        <div class="form-group">
          <label for="description">Event Description</label>
          <textarea id="description" v-model="form.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="projects_id">Project ID</label>
          <input type="number" id="projects_id" v-model="form.projects_id" required>
        </div>
        <div class="button-group">
          <button type="submit" class="button blue">Save</button>
          <button type="button" @click="cancel" class="button red">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

  
  <script>
  export default {
    props: {
      currentEvent: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        form: {
          id: this.currentEvent.id || '',
          title: this.currentEvent.title || '',
          description: this.currentEvent.description || '',
          projects_id: this.currentEvent.projects_id || null,
        }
      };
    },
    watch: {
      currentEvent: {
        handler(newVal) {
          this.form = { ...newVal };
        },
        immediate: true,
        deep: true,
      },
    },
    methods: {
      saveEvent() {
        const method = this.form.id ? 'PUT' : 'POST';
        const url = this.form.id 
          ? `https://login-site-14vx.onrender.com/api/events/${this.form.id}`
          : 'https://login-site-14vx.onrender.com/api/events';
        fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form)
        })
        .then(response => response.json())
        .then(() => {
          this.$emit('save-event', this.form);
          this.form = { id: '', title: '', description: '', projects_id: null };
        })
        .catch(error => console.error('Error:', error));
      },
      cancel() {
        this.$emit('cancel');
        this.form = { id: '', title: '', description: '', projects_id: null };
      }
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    margin: auto;
    background-color: #242424;
  }
  
  .card-title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  textarea,
  input[type="number"] {
    width: 90%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  
  .button {
    flex: 1;
    margin: 0 5px;
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
  }
  </style>
  