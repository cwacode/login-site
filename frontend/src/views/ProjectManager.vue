<template>
  <div class="project-manager">
    <h1>Project Manager</h1>
    <div class="project-list">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.projects_id">
            <td>{{ project.title }}</td>
            <td>{{ project.description }}</td>
            <td>{{ project.status }}</td>
            <td class="button-group">
              <!-- <router-link to="/events" tag="button">
                <button class="button green">Events</button>
              </router-link> -->
              <button @click="showEvents()" class="button green">Events</button>              
              <button @click="editProject(project)" class="button blue">Edit</button>
              <button @click="deleteProject(project.projects_id)" class="button red">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <project-form @save="saveProject" :currentProject="currentProject"
      @updateCurrentProject="handleUpdateCurrentProject" />
    <router-link to="/welcome" class="button blue buttom">Back to Start Page</router-link>
  </div>
</template>

<script>
import ProjectForm from '../components/ProjectForm.vue';

export default {
  name: 'ProjectManager',
  components: {
    ProjectForm
  },
  data() {
    return {
      projects: [],
      currentProject: {},
      userId: null,
    };
  },
  methods: {
    fetchProjects() {
      const userId = localStorage.getItem('userId');
      fetch(`https://login-site-14vx.onrender.com/api/project?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
          this.projects = data;
        })
        .catch(error => console.error('Error:', error));
    },
    handleUpdateCurrentProject(project) {
      this.currentProject = project;
    },
    editProject(project) {
      this.currentProject = { ...project };
    },
    saveProject(project) {
      const userId = localStorage.getItem('userId');
      project.users_id = userId;
      const method = project.projects_id ? 'PUT' : 'POST';
      const url = project.projects_id ? `https://login-site-14vx.onrender.com/api/project/${project.projects_id}` : 'https://login-site-14vx.onrender.com/api/project';
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project)
      })
        .then(response => response.json())
        .then(() => {
          this.fetchProjects();
          this.currentProject = {};
        })
        .catch(error => console.error('Error:', error));
    },
    deleteProject(projects_id) {
      fetch(`https://login-site-14vx.onrender.com/api/project/${projects_id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(() => {
          this.projects = this.projects.filter(p => p.projects_id !== projects_id);
        })
        .catch(error => console.error('Error:', error));
    }
  },
  showEvents(project) {
      this.$router.push({ name: 'ProjectEvents', params: { projectId: project.projects_id } });
    },
  mounted() {
    this.userId = localStorage.getItem('userId');
    this.fetchProjects();
  }
};
</script>

<style>
.project-manager {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;

}

.project-list {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
}

.blue {
  background-color: #007bff;
  color: white;
}

.red {
  background-color: #ff4b4b;
  color: white;
}

.green {
  background-color: green;
  color: white;
}

.buttom {
  margin-top: 20px;
}
</style>