<template>
  <div id="app">
    <open v-if="$store.state.Asar.path === ''"></open>
    <explorer v-else></explorer>
  </div>
</template>

<script>
  import Open from '@/components/Open'
  import Explorer from '@/components/Explorer'

  export default {
    name: 'asar-explorer',
    components: {
      Open,
      Explorer
    }
  }
</script>

<style>
  @import "~minireset.css/minireset.css";
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  html,
  body {
    background: linear-gradient(131deg, #ee0979, #ff6a00);
    color: #fff;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    overflow: hidden;
  }

  ::-webkit-scrollbar {
    background: rgba(255, 255, 255, .4);
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, .65);
  }
</style>
