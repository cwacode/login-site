<template>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card>
            <v-card-title>Projects</v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="project in projects" :key="project.id">
                      <td>{{ project.title }}</td>
                      <td>{{ project.description }}</td>
                      <td>{{ project.status }}</td>
                      <td>
                        <v-btn small @click="editProject(project)">Edit</v-btn>
                        <v-btn small color="red" @click="deleteProject(project.id)">Delete</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <project-form @save="saveProject" :currentProject="currentProject" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import ProjectForm from './ProjectForm.vue'; // Make sure to create this component
  
  export default {
    components: {
      ProjectForm
    },
    data() {
      return {
        projects: [],
        currentProject: null
      };
    },
    methods: {
      fetchProjects() {
        fetch('/api/projects')
          .then(response => response.json())
          .then(data => {
            this.projects = data;
          })
          .catch(error => console.error('Error:', error));
      },
      editProject(project) {
        this.currentProject = project;
      },
      saveProject(project) {
        const method = project.id ? 'PUT' : 'POST';
        const url = project.id ? `/api/projects/${project.id}` : '/api/projects';
        fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project)
        })
        .then(response => {
          if (response.ok) {
            this.fetchProjects();
            this.currentProject = null;
          } else {
            console.error('Failed to save the project');
          }
        })
        .catch(error => console.error('Error:', error));
      },
      deleteProject(id) {
        fetch(`/api/projects/${id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            this.projects = this.projects.filter(p => p.id !== id);
          } else {
            console.error('Failed to delete the project');
          }
        })
        .catch(error => console.error('Error:', error));
      }
    },
    mounted() {
      this.fetchProjects();
    }
  };
  </script>
  