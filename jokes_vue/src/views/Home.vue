<template>
  <div id="app">
    <Header />
    <b-container>
      <b-row>
        <b-col cm="6">
          <JokeList />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import JokeList from "@/components/JokeList";
export default {
name: "Home",
  components: {
    Header,
    JokeList
  }
}
</script>

<style scoped>

</style>