<template>
  <div class="home">
    <Header />
    <b-container>
      <b-row>
        <b-col cm="6">
          <EditJoke />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import EditJoke from '@/components/EditJoke'

export default {
  name: "NewJoke",
  components: {
    Header,
    EditJoke
  }
}
</script>

<style scoped>

</style>