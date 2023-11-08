import { createRouter, createWebHistory } from 'vue-router'

import base from './base'
import workStation from './workStation'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...base, ...workStation]
})

export default router
