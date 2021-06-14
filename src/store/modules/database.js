import Cookies from 'js-cookie'

const state = {
  databaseName: ''
}
const mutations = {
  changeDatabase(state, dbName) {
    state.databaseName = dbName
    console.log(state.databaseName)
  }
}

const actions = {
  changeDatabase({ commit }, dbName) {
    commit('changeDatabase', dbName)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
