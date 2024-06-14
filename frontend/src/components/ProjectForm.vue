<template>
    <div class="card">
      <h2 class="card-title">{{ currentProject.id ? 'Edit Project' : 'New Project' }}</h2>
      <div class="card-body">
        <form @submit.prevent="save" class="form">
          <div class="form-group">
            <label for="title">Project Title</label>
            <input type="text" id="title" v-model="form.title" required>
          </div>
          <div class="form-group">
            <label for="description">Project Description</label>
            <textarea id="description" v-model="form.description"></textarea>
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" v-model="form.status">
              <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
            </select>
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
      currentProject: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        form: {
          id: this.currentProject.id || '',
          title: this.currentProject.title || '',
          description: this.currentProject.description || '',
          status: this.currentProject.status || '',
        },
        statuses: ['Active', 'Inactive', 'Completed'],
      };
    },
    watch: {
    currentProject: {
      handler(newVal) {
        this.form = { ...newVal };
      },
      immediate: true,
      deep: true,
    },
  },
    methods: {
      save() {
        this.$emit('save', this.form);
      },
      cancel() {
      this.form = { id: '', title: '', description: '', status: '' }; // Reset form
      this.$emit('cancel');
      this.$emit('updateCurrentProject', {});
    },
    },
  };
  </script>
  
  <style>
  .card {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px; /* Limit max width for better readability */
    margin: auto; /* Center align the card */
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
  select {
    width: 80%; /* Full width to match form layout */
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between; /* Spacing between buttons */
  }
  .button {
    flex: 1; /* Each button takes equal space */
    margin: 0 5px; /* Space between buttons */
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
  </style>
  