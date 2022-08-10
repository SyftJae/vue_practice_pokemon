import { Dashboard, Login } from "../views"
import VueRouter from 'vue-router'

const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

export default router