import { createStore } from 'vuex'
import * as modules from '@/store/modules'
import get from 'lodash/get'

const store = createStore<Tada.RootState>({
  state: {},
  mutations: {},
  actions: {},
  modules
})

for (const moduleName of Object.keys(modules)) {
  if (get(modules[moduleName], 'actions.init')) {
    store.dispatch(`${moduleName}/init`)
  }
}

export { store } 
