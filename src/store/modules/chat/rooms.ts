import { isEmpty } from 'lodash'
import { Module } from 'vuex'

const initRoom = ({ name, last_message }: Tada.RawRoom): Tada.Room => ({
  name,
  lastMessage: last_message,
})

export const rooms: Module<Tada.RoomsState, Tada.RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    all: state => state.items,
    byName: state => (name: string) => {
      return state.items.find(room => room.name === name)
    },
    messages: (_state, _getters, _rootState, rootGetters) => (roomName: string) => {
      return rootGetters['chat/messages/byRoom'](roomName)
    },
    hasMessages: (_, getters) => (roomName: string) => {
      return !isEmpty(getters.messages(roomName))
    }
  },
  mutations: {
    ADD (state, payload: Tada.RawRoom) {
      state.items.push(initRoom(payload))
    },
    UPDATE (_, { room, payload }: { room: Tada.Room, payload: Tada.RawRoom }) {
      const data = initRoom(payload)

      for (const key in data) {
        room[key] = data[key]
      }
    }
  },
  actions: {
    async fetch ({ dispatch }) {
      const response = await fetch('https://nane.tada.team/api/rooms')

      if (response.ok) {
        const { result } = await response.json()
        for (const room of result) {
          dispatch('add', room)
        }
      }
    },
    add ({ commit }, payload: Tada.RawRoom) {
      commit('ADD', payload)
    },
    update ({ commit, getters }, payload: Tada.RawRoom) {
      const room = getters.byName(payload.name)

      if (room) commit('UPDATE', { room, payload })
    }
  }
}