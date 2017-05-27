import * as fs from '../../fs'

const state = {
  contents: [],
  path: '/Users/gregholguin/Desktop/yf.asar',
  tmpPaths: []
}

const mutations = {
  addTmpPath (state, path) {
    state.tmpPaths.push(path)
  },
  clearAsar (state) {
    state.contents = []
    state.path = ''
  },
  setContents (state, contents) {
    state.contents = contents
  },
  setPath (state, path) {
    state.path = path
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
