import Vue from 'vue'
import Vuex from 'vuex'
import * as modules from '@/stores'

Vue.use(Vuex)

const plugins = [
]

export default new Vuex.Store({ modules, plugins })
