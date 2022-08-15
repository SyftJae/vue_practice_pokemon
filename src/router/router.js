import { Dashboard, Login } from "../views"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router