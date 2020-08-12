import Vue from 'vue'
import * as plugins from '@/plugins'

import Vuetify from 'vuetify/lib'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { GChart } from 'vue-google-charts'
Vue.component('gchart', GChart)

import PivotTable from '@marketconnect/vue-pivot-table'
import 'bootstrap/scss/bootstrap.scss';
Vue.use(PivotTable)
Vue.component('pivot-table', PivotTable)

import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
Vue.component('tree-select', TreeSelect)

import VueGoodTable from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
Vue.use(VueGoodTable)

Vue.config.productionTip = false
export default new Vue(plugins).$mount('#app')
