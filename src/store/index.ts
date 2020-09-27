import { createStore, ModuleTree } from 'vuex'
import { user } from './modules/user'
import get from 'lodash/get'

const modules: ModuleTree<Tada.RootState> = { user }

const initStore = async () => {
  const store = createStore<Tada.RootState>({
    modules,
    state: {},
    mutations: {},
    actions: {}
  })

  for (const moduleName in modules) {
    if (get(modules[moduleName], 'actions.init')) {
      await store.dispatch(`${moduleName}/init`)
    }
  }

  return store
}

export { initStore }
