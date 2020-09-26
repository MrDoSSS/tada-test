import { Module } from 'vuex'
import * as storageUtils from '@/utils/local-storage'
import isEmpty from 'lodash/isEmpty'

const initProfile = ({ username }: Tada.UserProfile): Tada.UserProfile => ({
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
      state.profile = isEmpty(payload) ? undefined : initProfile(payload)
      storageUtils.set('profile', state.profile)
    }
  },
  actions: {
    init ({ dispatch }) {
      const profile = storageUtils.get('profile')
      if (!profile) return
      dispatch('login', profile)
    },
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