import { createRouter, createWebHistory } from 'vue-router'
import defaultRoutes from './routes.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...defaultRoutes
  ],
})

export default router
