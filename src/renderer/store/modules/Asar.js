import * as fs from '../../fs'

const state = {
  asarName: '',
  contents: [],
  currentPath: '',
  originalPath: '',
  garbage: []
}

const mutations = {
  addGarbage (state, path) {
    state.garbage.push(path)
  },
  clearAsar (state) {
    state.asarName = ''
    state.contents = []
    state.originalPath = ''
    state.currentPath = ''
  },
  setContents (state, contents) {
    state.contents = contents
  },
  setOriginalPath (state, path) {
    state.originalPath = path
    state.currentPath = path
    state.asarName = path.split(/\\|\//g).reverse()[0]
  },
  setCurrentPath (state, path) {
    state.currentPath = path
  }
}

const actions = {
  getContents ({ commit }, filePath) {
    fs.getContents(filePath)
      .then(contents => {
        commit('setContents', contents)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
