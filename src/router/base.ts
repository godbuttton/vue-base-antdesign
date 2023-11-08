import Home from '@/views/home/HomePage.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      icon: 'icon-keshi'
    },
    component: () => import('@/views/login/LoginPage.vue')
  }
]
