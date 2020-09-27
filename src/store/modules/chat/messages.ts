import { isEmpty } from 'lodash'
import { Module } from 'vuex'

export const messages: Module<Tada.MessagesState, Tada.RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    all: state => state.items,
    byRoom: state => (roomName: string) => {
      return state.items.filter(msg => msg.room === roomName)
    },
    message: (state) => (msgId: string) => {
      return state.items.find((msg: Tada.Message) => msg.id === msgId)
    },
  },
  mutations: {
    ADD (state, payload: Tada.Message) {
      state.items.push(payload)
    },
    UPDATE (_, { message, payload }: { message: Tada.Message, payload: Tada.Message }) {
      for (const key in payload) {
        if (Object.prototype.hasOwnProperty.call(message, key)) {
          message[key] = payload[key]
        }
      }
    }
  },
  actions: {
    async fetch ({ dispatch, getters }, roomName: string) {
      if (!isEmpty(getters.byRoom(roomName))) return

      const response = await fetch(`https://nane.tada.team/api/rooms/${roomName}/history`)

      if (response.ok) {
        const { result } = await response.json()
        for (const message of result) {
          dispatch('add', message)
        }
      }
    },
    add ({ commit }, payload: Tada.Message) {
      commit('ADD', payload)
    },
    update ({ commit, getters }, payload: Tada.Message) {
      const message = getters.message(payload.room, payload.id)

      if (message) commit('UPDATE', { message, payload })
    }
  }
}