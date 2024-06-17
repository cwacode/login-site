<template>
    <div class="project-events">
      <h1>Project Events</h1>
      <ul>
        <li v-for="event in events" :key="event.id">
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
          <div>
            <button @click="editEvent(event)">Edit</button>
            <button @click="deleteEvent(event.id)">Delete</button>
          </div>
        </li>
      </ul>
      <button @click="showModal(null)">Add New Event</button>
      <div v-if="showForm" class="modal">
        <event-form :current-event="currentEvent" @save-event="handleSaveEvent" @cancel="showForm = false"></event-form>
      </div>
    </div>
  </template>
  
  <script>
  import EventForm from '../components/EventForm.vue';
  
  export default {
    props: {
    projectId: {
      type: Number,
      required: true
    }
  },
    components: {
      EventForm
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
          .then(data => {
            this.events = data;
          })
          .catch(error => console.error('Error:', error));
      },
      deleteEvent(id) {
        fetch(`https://login-site-14vx.onrender.com/api/events/${id}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
          this.events = this.events.filter(e => e.id !== id);
        })
        .catch(error => console.error('Error:', error));
      },
      showModal(event) {
        this.currentEvent = event ? { ...event } : { id: '', title: '', description: '', project_id: null };
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
  .project-events {
    max-width: 600px;
    margin: auto;
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
  </style>
  