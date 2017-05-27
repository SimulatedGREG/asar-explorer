<template>
  <div id="open">
    <div class="title">Drop in an `asar` archive</div>
  </div>
</template>

<script>
  // import dragDrop from 'drag-drop'

  export default {
    name: 'Open',
    mounted () {
      document.addEventListener('drop', function (e) {
        e.preventDefault()
        e.stopPropagation()
        for (let f of e.dataTransfer.files) {
          console.log('File(s) you dragged here: ', f.path)
        }
        return false
      })

      document.addEventListener('dragover', function (e) {
        e.preventDefault()
        e.stopPropagation()
      })
    },
    data () {
      return { }
    },
    methods: {
      hello (e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped>
  #open {
    align-items: center;
    background: linear-gradient(131deg, #ee0979, #ff6a00);
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
    top: 20px;
  }
</style>
