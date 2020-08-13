import agent from 'superagent'

const namespaced = true

const state = {
  active: 0,
  visible: false,
  headers: [],
  items: [],
  subheaders: [],
  subitems: [],
}

const getters = {
  active: (state) => {
    return state.active
  },
  headers: (state) => {
    return state.headers
  },
  items: (state) => {
    return state.items
  },
  subheaders: (state) => {
    return state.subheaders
  },
  subitems: (state) => {
    //console.log(JSON.stringify(state.subitems))
    return state.subitems[state.active].children
    //return state.subitems
  },
  visible: (state) => {
    return state.visible
  },
}

const actions = {
  close: ({ commit }) => {
    commit('setVisible', false)
  },
  drill: ({ commit }, id) => {
    commit('setActive', id)
  },
  fetch: async ({ commit }) => {
    const { body } = await agent.get('/options')
    commit('setHeaders', body.headers)
    commit('setItems', body.items)
    commit('setSubheaders', body.subheaders)
    commit('setSubitems', body.subitems)
    console.log(JSON.stringify(body.subheaders))
  },
  open: ({ commit, dispatch }) => {
    dispatch('fetch')
    commit('setVisible', true)
  },
  submit({ dispatch }) {
    dispatch('close')
  },
}

const mutations = {
  setActive: (state, active) => {
    state.active = active
  },
  setVisible: (state, visible) => {
    state.visible = visible
  },
  setHeaders: (state, headers) => {
    state.headers = headers
  },
  setItems: (state, items) => {
    state.items = items
  },
  setSubheaders: (state, subheaders) => {
    state.subheaders = subheaders
  },
  setSubitems: (state, subitems) => {
    console.log(JSON.stringify(subitems))
    state.subitems = subitems
  },
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
