<template>
    <div class="project-events">
      <h1>Project Events</h1>
      <ul>
        <li v-for="event in events" :key="event.id" class="list">
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
          <div class="button-group">
            <button @click="editEvent(event)" class="button blue">Edit</button>
            <button @click="deleteEvent(event.id)" class="button red">Delete</button>
          </div>
        </li>
      </ul>
      <button @click="showModal(null)" class="button blue">Add New Event</button>
      <div v-if="showForm" class="modal">
        <event-form :current-event="currentEvent" @save-event="handleSaveEvent" @cancel="showForm = false"></event-form>
      </div>
    </div>
  </template>
  
  <script>
  import EventForm from '../components/EventForm.vue';
  
  export default {
    components: { EventForm },
    props: ['projectId'],
    data() {
      return {
        events: [],
        showForm: false,
        currentEvent: {}
      };
  },
    data() {
      return {
        events: [],
        showForm: false,
        currentEvent: {}
      };
    },
    methods: {
    fetchEvents() {
      fetch(`https://login-site-14vx.onrender.com/api/events?projectId=${this.projectId}`)
        .then(response => response.json())
        .then(data => { this.events = data; })
        .catch(error => console.error('Error:', error));
    },
    deleteEvent(id) {
      fetch(`https://login-site-14vx.onrender.com/api/events/${id}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(() => { this.events = this.events.filter(e => e.id !== id); })
      .catch(error => console.error('Error:', error));
    },
    editEvent(event) {
      this.currentEvent = Object.assign({}, event);
      this.showModal(this.currentEvent);
    },
    showModal(event) {
      this.currentEvent = event || { id: '', title: '', description: '', project_id: this.projectId };
      this.showForm = true;
    },
    handleSaveEvent(event) {
      this.fetchEvents();
      this.showForm = false;
    }
  },
  mounted() {
    this.fetchEvents();
  }
};
</script>
  
  <style>
ul {
  width: 100%;
  margin-right: 30px;
}

  .list {
  border: 2px solid #007bff;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  list-style-type: none;
  max-width: 90%;
}
  .project-events {
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
  