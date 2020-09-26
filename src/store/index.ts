import { createStore } from 'vuex'
import * as modules from './modules'

const store = createStore<Tada.RootState>({
  state: {},
  mutations: {},
  actions: {},
  modules
})

export { store } 
