<template>
    <div class="project-events">
      <h1>Project Events</h1>
      <ul>
        <li v-for="event in events" :key="event.id">
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
          <div>
            <button @click="deleteEvent(event.id)">Delete</button>
          </div>
        </li>
      </ul>
      <button @click="addEvent">Add New Event</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        events: []
      };
    },
    methods: {
      fetchEvents() {
        fetch('https://login-site-14vx.onrender.com/api/events')
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
          this.fetchEvents();
        })
        .catch(error => console.error('Error:', error));
      },
      
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
  </style>
  