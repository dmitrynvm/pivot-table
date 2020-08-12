import agent from 'superagent'
import { selectOptionsStore } from '@/components/dashboard-page/select-options-dialog'

const namespaced = true

const state = {
  items: [],
  headers: []
}

const getters = {
  headers: (state) => {
    return state.headers
  },
  items: (state) => {
    return state.items
  },
  cols: (state) => {
    let output = []
    for (var header of state.headers) {
      output.push({
        label: header,
        field: header,
      })
    }
    return output
  },
  rows: (state) => {
    return state.items
  },
}

const actions = {
  fetch: async ({ commit }) => {
    const { body } = await agent.get('/dashboard')
    console.log(JSON.stringify(body.headers))
    console.log(JSON.stringify(body.items))
    commit('setHeaders', body.headers)
    commit('setItems', body.items)
  },
}

const mutations = {
  setHeaders(state, headers) {
    state.headers = headers
  },
  setItems(state, items) {
    state.items = items
  },
}

const modules = {
  'select-options': selectOptionsStore
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
  modules
}
