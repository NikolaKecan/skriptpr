<template>
  <div>
    <b-jumbotron header="Vicevi" :lead="'Trenutno imamo: ' + jokes.length">

    </b-jumbotron>
  </div>
</template>

<script>
import {mapState} from 'vuex'; //ocemo da pristupamo stanju
export default {
  name: "Header",
  computed: { //computed su podaci koji se izracunavaju svaki put kada im pristupamo
    ...mapState(['jokes']) //kad god pristupamo jokes, on ce ponovo da ih izracuna (ako smo negde izmenili, dobicemo svezu verziju
  }
}
</script>

<style scoped>

</style>