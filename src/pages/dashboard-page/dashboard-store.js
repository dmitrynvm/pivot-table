import agent from 'superagent'
import { loadingStore } from '@/components/dashboard-page/loading-overlay'
import { selectOptionsStore } from '@/components/dashboard-page/select-options-dialog'

const namespaced = true

const state = {
  master: [],
  headers: [],
  items: [],
  selected_items: [],
  selected_subitems: {},
}

const getters = {
  headers: (state) => {
    let output = []
    for (let i = 0; i < state.headers.length; i++) {
      if (state.selected_items.indexOf(i) != -1) {
        output.push(state.headers[i])
      }
    }
    return output
  },
  items: (state) => {
    return state.items
  },
}


const actions = {
  fetch: async ({ commit }) => {
    const { body } = await agent.get('/dashboard')
    commit('setHeaders', body.headers)
    commit('setMaster', body.items)
    commit('setItems', body.items)
  },
  submit({ commit, state }) {
    let output = []
    const headers = Object.keys(state.selected_subitems)
    for(let item of state.master) {
      let is_valid = true
      for(let header of headers) {
        let admissible_values = state.selected_subitems[header]
        let current_value = item[header]
        is_valid *= admissible_values.indexOf(current_value) != -1
      }
      if(is_valid) {
        output.push(item)
      }
      commit('setItems', output)
    }
  },
}

const mutations = {
  setMaster(state, master) {
    state.master = master
  },
  setHeaders(state, headers) {
    state.headers = headers
  },
  setItems(state, items) {
    state.items = items
  },
  setSelectedItems: (state, selected_items) => {
    state.selected_items = selected_items
  },
  setSelectedSubitems: (state, payload) => {
    for(let key of Object.keys(payload)) {
      state.selected_subitems[key] = payload[key]
    }
  },
}

const modules = {
  'loading': loadingStore,
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
