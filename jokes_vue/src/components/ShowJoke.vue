<template>
  <p>Naslov: {{ joke.naslov }} </p>
  <p>Vic: {{ joke.tekst }} </p>


</template>

<script>
export default {
  name: "ShowJoke",
  props: {
    joke: Object
  }
}
</script>

<style scoped>

</style>