import agent from 'superagent'

const namespaced = true

const state = {
  active: -1,
  visible: false,
  headers: [],
  items: [],
  subheaders: [],
  subitems: [],
  series: [],
  options: [],
  charts_xheaders: [],
  charts_xitems: 1,
  charts_yheaders: [],
  charts_yitems: [],
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
  series: (state) => {
    return state.series
  },
  options: (state) => {
    return state.options
  },
  charts_xheaders: (state) => {
    return state.charts_xheaders
  },
  charts_xitems: (state) => {
    return state.charts_xitems
  },
  charts_yheaders: (state) => {
    return state.charts_yheaders
  },
  charts_yitems: (state) => {
    return state.charts_yitems
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
    commit('setSeries', body.series)
    commit('setOptions', body.options)
    let headers = []
    for(let i = 0; i < body.items.length; i++) {
      console.log(JSON.stringify(body.items[i]))
      headers.push({
        'id': i,
        'label': body.items[i].name
      })
    }
    commit('setChartsXHeaders', headers)
    commit('setChartsYHeaders', headers)
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
  setSeries: (state, series) => {
    state.series = series
  },
  setOptions: (state, options) => {
    state.options = options
  },
  setChartsXHeaders: (state, charts_xheaders) => {
    state.charts_xheaders = charts_xheaders
  },
  setChartsXItems: (state, charts_xitems) => {
    state.charts_xitems = charts_xitems
  },
  setChartsYHeaders: (state, charts_yheaders) => {
    state.charts_yheaders = charts_yheaders
  },
  setChartsYItems: (state, charts_yitems) => {
    state.charts_yitems = charts_yitems
  },
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
