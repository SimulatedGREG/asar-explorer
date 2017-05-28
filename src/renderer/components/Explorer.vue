<template>
  <div>
    <header>
      <div>{{ asarName }}</div>
      <div style="cursor:pointer;" @click="$store.commit('clearAsar')">
        <svg width="22" height="22" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" fill="#fff"/></svg>
      </div>
    </header>
    <main :class="{ 'alt': sortedContents.length === 0 && inSubFolder }">
      <div class="item" @dblclick="navigateUp" v-if="inSubFolder">
        <div class="file-name">..</div>
      </div>
      <template v-if="sortedContents.length > 0">
        <item v-for="item in sortedContents" :key="item.name" :item="item"></item>
      </template>
      <template v-else>
        <div class="no-contents">
          <span>No Contents</span>
        </div>
      </template>
    </main>
  </div>
</template>

<script>
  import Item from '@/components/Item'
  import { join } from 'path'

  export default {
    name: 'explorer',
    components: { Item },
    computed: {
      asarName () {
        return this.$store.state.Asar.asarName
      },
      filePath () {
        return this.$store.state.Asar.currentPath
      },
      contents () {
        return this.$store.state.Asar.contents
      },
      inSubFolder () {
        return new RegExp(`${this.asarName}.+`).test(this.filePath)
      },
      sortedContents () {
        return [
          ...this.contents.filter(({ stat }) => stat.isDirectory()),
          ...this.contents.filter(({ stat }) => stat.isFile())
        ]
      }
    },
    methods: {
      navigateUp () {
        let pwd = this.filePath.split(/\\|\//g)

        pwd.pop()
        pwd = join(pwd.join('/'))

        this.$store.commit('setCurrentPath', pwd)
        this.$store.dispatch('getContents', pwd)
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
    border-bottom: 2px solid rgba(255, 255, 255, .3);
    display: flex;
    font-size: 26px;
    justify-content: space-between;
    padding: 39px 20px 20px;
    user-select: none;
  }

  header:before {
    content: '';
    background: rgba(255,255,255,.6);
    display: block;
    height: 22px;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    -webkit-app-region: drag;
  }

  main {
    height: calc(100vh - 89px);
    overflow-y: auto;
  }

  main.alt {
    height: calc(100vh - 152px);
    overflow: hidden;
  }

  .no-contents {
    align-items: center;
    border-top: 2px solid rgba(255, 255, 255, .4);
    display: flex;
    font-size: 22px;
    height: 100%;
    justify-content: center;
    width: 100%;
  }
</style>
