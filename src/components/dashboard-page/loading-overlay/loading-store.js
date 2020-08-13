const namespaced = true

const state = {
  visible: true
}

const getters = {
  visible: (state) => {
    return state.visible
  }
}

const actions = {
  close: ({ commit }) => {
    commit('setVisible', false)
  },
  open: ({ commit }) => {
    commit('setVisible', true)
  },
}

const mutations = {
  setVisible: (state, visible) => {
    state.visible = visible
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
