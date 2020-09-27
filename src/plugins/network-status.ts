import { App, ref } from 'vue'

const key = Symbol('networkStatus')

export const networkStatus = {
  online: ref(true),
  install (App: App) {
    App.provide(key, this)

    window.addEventListener('online', () => {
      this.online.value = true
    })

    window.addEventListener('offline', () => {
      this.online.value = false
    })
  }
}

export const useNetworkStatus = () => {
  return networkStatus.online
}