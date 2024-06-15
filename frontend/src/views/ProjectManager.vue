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
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.title }}</td>
            <td>{{ project.description }}</td>
            <td>{{ project.status }}</td>
            <td class="button-group">
              <button @click="editProject(project)" class="button blue">Edit</button>
              <button @click="deleteProject(project.id)" class="button red">Delete</button>
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
    };
  },
  methods: {
    fetchProjects() {
      fetch('https://login-site-14vx.onrender.com/api/projects')
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
      const method = project.id ? 'PUT' : 'POST';
      const url = project.id ? `https://login-site-14vx.onrender.com/api/project/${project.id}` : 'https://login-site-14vx.onrender.com/api/project';
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
    deleteProject(id) {
      fetch(`https://login-site-14vx.onrender.com/api/project/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(() => {
          this.projects = this.projects.filter(p => p.id !== id);
        })
        .catch(error => console.error('Error:', error));
    }
  },
  mounted() {
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

.buttom {
  margin-top: 20px;
}
</style>