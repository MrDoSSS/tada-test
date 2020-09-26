import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ChatLayout from '@/layouts/Chat.vue'
import { guardPipeline } from './guardPipeline'
import { store } from '@/store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: ChatLayout,
    children: [
      {
        path: 'chat-index',
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
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => guardPipeline({ to, from, next, store })())

export { router }
