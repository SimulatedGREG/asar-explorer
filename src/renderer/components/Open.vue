<template>
  <div id="open">
    <div class="title">Drop in an `asar` archive</div>
  </div>
</template>

<script>
  export default {
    name: 'Open',
    mounted () {
      document.addEventListener('drop', e => {
        e.preventDefault()
        e.stopPropagation()
        this.handleDrop(e.dataTransfer.files)
        return false
      })

      document.addEventListener('dragover', e => {
        e.preventDefault()
        e.stopPropagation()
      })
    },
    data () {
      return { }
    },
    methods: {
      async handleDrop (files) {
        if (files.length > 1) return
        if (!/\.asar$/.test(files[0].path)) return

        try {
          await this.$fs.pathExists(files[0].path)
          this.$store.commit('setOriginalPath', files[0].path)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>
  #open {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    position: absolute;
    width: 100vw;
  }

  #open:after {
    content: '';
    background: transparent;
    border: 6px dashed rgba(255, 255, 255, .9);
    border-radius: 6px;
    bottom: 20px;
    display: block;
    left: 20px;
    position: absolute;
    right: 20px;
    top: 39px;
  }
</style>
