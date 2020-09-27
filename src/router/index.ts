import { AppStore } from '@/typings'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { guardPipeline } from './guard-pipeline'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/Chat.vue'),
    children: [
      {
        path: '',
        name: 'chat-index',
        component: () => import('@/views/chat/Index.vue')
      },
      {
        path: '/:name',
        name: 'chat-room',
        component: () => import('@/views/chat/Room.vue')
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

export const initRouter = (store: AppStore) => {
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: 'active',
    routes
  })

  router.beforeEach((to, from, next) => guardPipeline({ to, from, next, store })())

  return router
}
