<template>
  <div>
    <h1>Välkommen!</h1>
    <div class="image-container">
      <img src="/welcome.png" alt="Logga in" class="welcome-image" loading="lazy" />
    </div>
      <router-link to="/profile" tag="button" class="button blue">Min profil</router-link>
      <router-link to="/project-manager" tag="button" class="button blue">Projekthantering</router-link>
      <router-link to="/" tag="button" class="button red">Logga ut</router-link>
  </div>
</template>


<script>
export default {
};
</script>

<style>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  display: block;
}

.blue {
  background-color: #007bff;
  color: white;
}

.red {
  background-color: #ff4b4b;
  color: white;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.welcome-image {
  width: 150px;
  height: auto;
}
</style>