<template>
    <div class="project-events">
      <h1>Project Events</h1>
      <ul>
        <li v-for="event in events" :key="event.id">
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
          <p>Project ID: {{ event.project_id }}</p>
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
  