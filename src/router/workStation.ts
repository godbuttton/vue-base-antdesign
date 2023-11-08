import BaseLayout from '@/components/layout/BaseLayout.vue'
export default [
  {
    path: '/card',
    name: 'card',
    component: BaseLayout,
    meta: {
      title: '卡片管理',
      icon: 'icon-keshi'
    },
    children: [
      {
        path: 'linkList',
        name: 'card-linkList',
        meta: {
          title: '快捷方式管理',
          icon: 'icon-keshi'
        },
        component: () => import('@/views/card/linkList/linkList.vue')
      },
      {
        path: 'bord',
        name: 'card-bord',
        meta: {
          title: '卡片看板',
          icon: 'icon-keshi'
        },
        component: () => import('@/views/card/cardMain.vue')
      }
    ]
  },
  {
    path: '/ai',
    name: 'ai',
    component: BaseLayout,
    meta: {
      title: 'AI工具',
      icon: 'icon-keshi'
    },
    children: [
      {
        path: 'chartGpt',
        name: 'ai-chartGpt',
        meta: {
          title: '本地gpt',
          icon: 'icon-keshi'
        },
        component: () => import('@/views/aisite/chartGpt.vue')
      }
    ]
  },
  {
    path: '/demo',
    name: 'demo',
    component: BaseLayout,
    meta: {
      title: 'demo页面',
      icon: 'icon-keshi'
    },
    children: [
      {
        path: 'animation',
        name: 'demo-animation',
        meta: {
          title: '动画',
          icon: 'icon-keshi'
        },
        component: () => import('@/views/demos/animation/toggle.vue')
      },
      {
        path: '3d',
        name: 'demo-3d',
        meta: {
          title: '3D例子',
          icon: 'icon-keshi'
        },
        component: () => import('@/views/demos/3d/index.vue')
      },
      {
        path: 'drag',
        name: 'demo-drag',
        meta: {
          title: '拖拽',
          icon: 'icon-keshi'
        },
        component: () => import('@/views/demos/drag/drag.vue')
      },
      {
        path: 'todoItem',
        name: 'demo-todoItem',
        meta: {
          title: 'todo',
          icon: 'icon-keshi'
        },
        component: () => import('@/views/demos/todo-item/TodoItem.vue')
      }
    ]
  }
]
