<template>
  <div id="app">
    <div id="nav">

      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> <!--tag gde ce ruter da renderuje nase viewe. Svaka stranica je jedan view. A view se sastoji iz vise komponenti. -->
  </div>
</template>



<script>
import {mapActions} from 'vuex';//za mapiranje akcija iz Store-a ovde u methods

export default {
  name: 'App',
  methods: { //metode da ucitamo viceve, da ih dohvatimo
    ...mapActions(['load_jokes']) //raspakivanje objekta, da bi smo dobili funkcije koje vuex strouje. Iz te liste dohvatamo koje nam metode trebaju. Sad imamo pristup fji load_jokes
  },
  mounted: function () { //ovo je da kad se ucita stranica, da se ucitaju i poruke sa servera
    this.load_jokes();
  }
}
</script>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
