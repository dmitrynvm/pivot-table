import agent from 'superagent'

const namespaced = true

const state = {
  visible: false,
  headers: [],
  items: []
}

const getters = {
  headers: (state) => {
    return state.headers
  },
  items: (state) => {
    return state.items
  },
  visible: (state) => {
    return state.visible
  },
}

const actions = {
  close: ({ commit }) => {
    commit('setVisible', false)
  },
  fetch: async () => {
    const { body } = await agent.get('/options')
    console.log(body)
  },
  open: ({ commit, dispatch }) => {
    dispatch('fetch')
    commit('setVisible', true)
  },
  submit({ dispatch }) {
    dispatch('close')
  },
  greet: () => {
    alert('coool')
  },
}

const mutations = {
  setVisible: (state, visible) => {
    state.visible = visible
  },
  setHeaders: (state, headers) => {
    state.headers = headers
  },
  setItems: (state, items) => {
    state.items = items
  },
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
