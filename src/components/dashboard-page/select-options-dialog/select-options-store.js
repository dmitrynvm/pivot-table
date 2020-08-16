import agent from 'superagent'

const parseDate = (date) => {
  if (!date) return null
  const [day, month, year] = date.split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function matrix(m, n) {
    var output = new Array(m)
    for(let i = 0; i < m; i++) {
        output[i] = new Array(n)
    }
    return output
}

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
  charts_yitems: [11, 18],
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
  draw: ({ commit, state, rootGetters }) => {
    const db = rootGetters['dashboard/items']
    const headers00 = state.charts_xheaders[state.charts_xitems].label
    const items0 = []
    for(let item of db) {
      items0.push(parseDate(item[headers00]))
    }
    const headers0 = []
    for(let yitem of state.charts_yitems) {
      headers0.push(state.charts_yheaders[yitem].label)
    }
    const m = db.length + 1
    const n = headers0.length + 1
    const series = matrix(m, n)
    series[0][0] = headers00
    for(let i = 0; i < m-1; i++) {
      series[i+1][0] = items0[i]
    }
    for(let j = 0; j < n-1; j++) {
      series[0][j+1] = headers0[j]
    }
    for(let i = 0; i < m-1; i++) {
      for(let j = 0; j < n-1; j++) {
        series[i+1][j+1] = db[i][headers0[j]]
      }
    }
    commit('setSeries', series)
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
