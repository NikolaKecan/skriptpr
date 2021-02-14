<template>
  <div>
    <b-table v-if="jokes.length" sticky-header="500px" :items="jokes"  head-variant="light"></b-table>
    <h1 v-else>Nema viceva</h1>
  </div>
</template>

<script>
import router from '@/router';
import {mapState, mapActions} from 'vuex';

export default {
  name: "JokeList",
  computed: {
    ...mapState(['jokes'])
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions(['delete_message']),

    editJoke: function () {

    }
  }
}
</script>

<style scoped>

</style>