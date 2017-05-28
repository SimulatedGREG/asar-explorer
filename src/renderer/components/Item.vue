<template>
  <div class="item" ref="item" draggable @dblclick="navigate">
    <div v-if="!isFile" class="file-icon">
      <svg width="18" height="18" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1728 608v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z" fill="#fff"/></svg>
    </div>
    <div class="file-name">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'item',
    props: {
      item: Object
    },
    computed: {
      isFile () {
        return this.item.stat.isFile()
      }
    },
    methods: {
      navigate () {
        if (!this.isFile) {
          this.$store.commit('setCurrentPath', this.item.path)
          this.$store.dispatch('getContents', this.item.path)
        }
      }
    },
    mounted () {
      this.$refs.item.ondragstart = async e => {
        e.preventDefault()
        let tmpPath = await this.$fs.extractFile(this.item.path, this.item.name)
        this.$electron.ipcRenderer.send('ondragstart', tmpPath)

        this.$store.commit('addGarbage', tmpPath)
      }
    }
  }
</script>

<style>
  .item {
    align-items: center;
    cursor: pointer;
    background: rgba(255, 255, 255, 0);
    border-top: 2px solid rgba(255, 255, 255, .3);
    display: flex;
    font-size: 18px;
    justify-content: flex-start;
    padding: 20px;
    transition: background 200ms ease-in-out;
  }

  .item:nth-child(1) { border: 0; }

  .item:hover {
    background: rgba(255, 255, 255, .15);
  }

  .file-name {
    flex: 1;
    overflow: hidden;
    pointer-events: none;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;
  }

  .file-icon {
    margin-right: 8px;
    margin-bottom: -3px;
    pointer-events: none;
  }
</style>
