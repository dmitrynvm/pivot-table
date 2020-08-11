import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'dashboard-page',
    component: () => import('@/pages/dashboard-page')
  },
  {
    path: '*',
    component: () => import('@/pages/error-page'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
