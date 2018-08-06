<template>
  <div id="app">
    <div id="nav" class=" main-class flex space-around align-center">
    </div>
    <router-view/>
      <div class="app-container">
      </div>
  </div>
</template>

<script>
export default {
   name: "app"
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

#nav {
    font-size: 24px;
    font-family: "sweetCheeks";
    text-shadow: 2px 2px 8px #020202;
    background-color: transparent;
}

#nav a {
  font-weight: bold;
  color: #9aa9ff;
}

#nav a:hover {
  text-decoration: none;
}

#nav a.router-link-exact-active {
    color:white;
}

@media (max-width: 321px) {
  #nav {
    font-size: 20px;
  }
}
</style>
