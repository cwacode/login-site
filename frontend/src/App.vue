<template>
  <LogIn/>
</template>


<script>
import LogIn from './components/LogIn.vue';
import { onMounted } from 'vue';

export default {
  components: {
    LogIn
  },
  setup() {
    onMounted(() => {
      fetch('/api')
        .then((response) => response.json())
        .then((result) => {
          alert(`Hello ${result.hello}!`);
        });
    });
  },
};
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
