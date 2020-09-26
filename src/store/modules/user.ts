import { Module } from 'vuex'

const initProfile = (username: string): Tada.UserProfile => ({
  username
})

export const user: Module<Tada.UserState, Tada.RootState> = {
  namespaced: true,
  state: {
    isAuth: false,
    profile: undefined
  },
  getters: {
    isAuth: state => state.isAuth,
    profile: state => state.profile
  },
  mutations: {
    SET_IS_AUTH (state, payload) {
      state.isAuth = payload
    },
    SET_PROFILE (state, payload) {
      state.profile = initProfile(payload)
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('SET_PROFILE', payload)
      commit('SET_IS_AUTH', true)
    },
    logout ({ commit }) {
      commit('SET_PROFILE', {})
      commit('SET_IS_AUTH', false)
    }
  }
}