<template>
  <div id="app">
    <the-navbar/>
    <index/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import Index from '@/components/Index'

export default {
  name: 'App',
  components: {
    TheNavbar,
    Index
  }
}
</script>

<style>
</style>
