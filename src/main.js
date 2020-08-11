import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VueRouter from 'vue-router'
import * as plugins from '@/plugins'
import { GChart } from 'vue-google-charts'
import PivotTable from '@marketconnect/vue-pivot-table'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'bootstrap/scss/bootstrap.scss';


Vue.config.productionTip = false
Vue.component('gchart', GChart)
Vue.component('pivot-table', PivotTable)
Vue.use(PivotTable)
Vue.use(Vuetify)
Vue.use(VueRouter)

export default new Vue(plugins).$mount('#app')
