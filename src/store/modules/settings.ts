import { Module } from 'vuex'

export const settings: Module<Tada.SettingsState, Tada.RootState> = {
  namespaced: true,
  state: {
    maxMessageLength: 10500,
    maxRoomTitleLength: 50,
    maxUsernameLength: 50
  },
  getters: {
    maxMessageLength: state => state.maxMessageLength,
    maxRoomTitleLength: state => state.maxRoomTitleLength,
    maxUsernameLength: state => state.maxUsernameLength
  },
  mutations: {
    SET_MAX_MESSAGE_LENGTH (state, payload) {
      state.maxMessageLength = payload
    },
    SET_MAX_ROOM_TITLE_LENGTH (state, payload) {
      state.maxRoomTitleLength = payload
    },
    SET_MAX_USERNAME_LENGTH (state, payload) {
      state.maxRoomTitleLength = payload
    }
  },
  actions: {
    async init ({ dispatch }) {
      await dispatch('fetch')
    },
    async fetch ({ commit }) {
      try {
        const response = await fetch('https://nane.tada.team/api/settings')
        if (response.ok) {
          const { result }: { result: Tada.RawSettingsState } = await response.json()
          commit('SET_MAX_MESSAGE_LENGTH', result.max_message_length)
          commit('SET_MAX_ROOM_TITLE_LENGTH', result.max_room_title_length)
          commit('SET_MAX_USERNAME_LENGTH', result.max_username_length)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}