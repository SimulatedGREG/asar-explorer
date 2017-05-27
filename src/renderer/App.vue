<template>
  <div id="app">
    <explorer></explorer>
  </div>
</template>

<script>
  import Explorer from '@/components/Explorer'

  export default {
    name: 'asar-explorer',
    components: {
      Explorer
    }
  }
</script>

<style>
  @import "~minireset.css/minireset.css";
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  html,
  body {
    color: #fff;
    font-family: 'Roboto', sans-serif;
  }
</style>
