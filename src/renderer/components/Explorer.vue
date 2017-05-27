<template>
  <div>
    <open v-if="filePath === ''"></open>
  </div>
</template>

<script>
  import Open from '@/components/Open'

  export default {
    name: 'Explorer',
    components: { Open },
    computed: {
      filePath () {
        return this.$store.state.Asar.path
      }
    },
    data () {
      return { }
    }
  }
</script>

<style lang="scss" scoped>

</style>
