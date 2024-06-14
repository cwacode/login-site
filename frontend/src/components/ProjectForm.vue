<template>
    <v-card>
      <v-card-title>
        {{ currentProject.id ? 'Edit Project' : 'New Project' }}
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="form.title"
            label="Project Title"
            required
          ></v-text-field>
          <v-textarea
            v-model="form.description"
            label="Project Description"
          ></v-textarea>
          <v-select
            v-model="form.status"
            :items="statuses"
            label="Status"
          ></v-select>
          <!-- Add a user selector if needed -->
          <v-btn @click="save" color="primary">Save</v-btn>
          <v-btn @click="cancel" color="grey">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
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
          id: '',
          title: '',
          description: '',
          status: '',
          user_id: '', // Include user_id if you're creating or editing projects linked to specific users
        },
        statuses: ['active', 'inactive', 'completed'],
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
        this.$emit('cancel');
      },
    },
  };
  </script>
  