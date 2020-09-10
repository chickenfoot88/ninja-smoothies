<template>
  <div id="app">
    <the-navbar/>
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'App',
  components: {
    TheNavbar,
  }
}
</script>

<style>
</style>
