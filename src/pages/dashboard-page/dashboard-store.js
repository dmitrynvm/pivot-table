import agent from 'superagent'

const namespaced = true

const state = {
}

const getters = {
}

const actions = {
  fetch: async () => {
    const { body } = await agent.get('/dashboard')
    console.log(JSON.stringify(body))
  },
}

const mutations = {
}

const modules = {
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
  modules
}
