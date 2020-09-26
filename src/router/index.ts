import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ChatLayout from '@/layouts/Chat.vue'
import { guardPipeline } from './guard-pipeline'
import { store } from '@/store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: ChatLayout,
    children: [
      {
        path: '',
        name: 'chat-index',
        component: () => import('@/views/chat/Index.vue')
      }
    ],
    meta: {
      guard: ['authorized']
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      guard: ['unauthorized']
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => guardPipeline({ to, from, next, store })())

export { router }
