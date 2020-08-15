import agent from 'superagent'

const namespaced = true

const state = {
  active: -1,
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
    if( state.active == -1) {
      return []
    } else {
      return state.subitems[state.active].children
    }
  },
  visible: (state) => {
    return state.visible
  },
}

const actions = {
  check_column: ({ commit }, params) => {
    let selected_items = []
    for (var item of params.selectedRows) {
      selected_items.push(item.id)
    }
    commit('dashboard/setSelectedItems', selected_items, {root: true})
  },
  check_value: ({ commit, state }, params) => {
    if(params.selectedRows.length < state.subitems[state.active].children.length) {
      let selected_subitems = []
      for (var item of params.selectedRows) {
        selected_subitems.push(item.value)
      }
      const key = state.items[state.active].name
      commit('dashboard/setSelectedSubitems', {[key]: selected_subitems}, {root: true})
    }
  },
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
  },
  open: ({ commit }) => {
    commit('setVisible', true)
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
