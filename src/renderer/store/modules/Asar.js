import * as fs from '../../fs'

const state = {
  asarName: 'yf.asar',
  contents: [],
  currentPath: '/Users/gregholguin/Desktop/yf.asar',
  originalPath: '/Users/gregholguin/Desktop/yf.asar',
  tmpPaths: []
}

const mutations = {
  addTmpPath (state, path) {
    state.tmpPaths.push(path)
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
