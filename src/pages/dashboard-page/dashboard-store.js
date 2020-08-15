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
  start_date: '1950-01-30',
  final_date: '1970-01-30',
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
  start_date: (state) => {
    return state.start_date
  },
  final_date: (state) => {
    return state.final_date
  },
}


const actions = {
  fetch: async ({ commit }) => {
    const { body } = await agent.get('/dashboard')
    commit('setHeaders', body.headers)
    commit('setMaster', body.items)
    commit('setItems', body.items)
  },
  submit({ commit, dispatch, state }) {
    let output = []
    const headers = Object.keys(state.selected_subitems)
    for(let item of state.master) {
      let is_valid = true
      for(let header of headers) {
        let admissible_values = state.selected_subitems[header]
        let current_value = item[header]
        is_valid *= admissible_values.indexOf(current_value) != -1
      }

      const [day, month, year] = item['dob'].split('/')
      let fmt_date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      console.log('dates: ' + state.start_date + ' ' + fmt_date + ' ' + state.final_date + ' ' + ((state.start_date < fmt_date) && (fmt_date < state.final_date)))
      //console.log('inequal: ' )

      is_valid = is_valid && (state.start_date < fmt_date) && (fmt_date < state.final_date)
      if(is_valid) {
        output.push(item)
      }
    }
    commit('setItems', output)
    dispatch('dashboard/select-options/close', null, {root: true})
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
  setStartDate(state, start_date) {
    state.start_date = start_date
  },
  setFinalDate(state, final_date) {
    state.final_date = final_date
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
