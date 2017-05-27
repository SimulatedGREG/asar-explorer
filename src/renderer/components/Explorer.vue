<template>
  <div>
    <header>
      <div>{{ filename }}</div>
      <div style="cursor:pointer;" @click="$store.commit('clearAsar')">
        <svg width="22" height="22" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" fill="#fff"/></svg>
      </div>
    </header>
    <main>
      <item v-for="item in sortedContents" :key="item.name" :item="item"></item>
    </main>
  </div>
</template>

<script>
  import Item from '@/components/Item'

  export default {
    name: 'explorer',
    components: { Item },
    computed: {
      filePath () {
        return this.$store.state.Asar.path
      },
      filename () {
        return this.filePath.split(/\/|\\/).reverse()[0]
      },
      contents () {
        return this.$store.state.Asar.contents
      },
      sortedContents () {
        return [
          ...this.contents.filter(({ stat }) => !stat.isFile()),
          ...this.contents.filter(({ stat }) => stat.isFile())
        ]
      }
    },
    mounted () {
      this.$store.dispatch('getContents', this.filePath)
    }
  }
</script>

<style scoped>
  header {
    align-items: center;
    display: flex;
    font-size: 26px;
    justify-content: space-between;
    padding: 20px;
  }

  main {
    height: calc(100vh - 70px);
    overflow-y: auto;
  }
</style>
