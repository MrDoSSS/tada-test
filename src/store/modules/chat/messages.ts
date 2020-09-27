import { isEmpty } from 'lodash'
import { Module } from 'vuex'
import { wsClient } from '@/websocket'
import { generateUUID } from '@/utils/uuid'

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
    byId: (state) => (msgId: string) => {
      return state.items.find((msg: Tada.Message) => msg.id === msgId)
    },
  },
  mutations: {
    ADD (state, payload: Tada.Message) {
      state.items.push(payload)
    },
    UPDATE (_, { message, payload }: { message: Tada.Message, payload: Tada.Message }) {
      for (const key in payload) {
        message[key] = payload[key]
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
          message.delivered = true
          dispatch('add', message)
        }
      }
    },
    add ({ commit }, payload: Tada.Message) {
      commit('ADD', payload)
    },
    update ({ commit, getters }, payload: Tada.Message) {
      const message = getters.byId(payload.id)

      if (message) commit('UPDATE', { message, payload })
    },
    send ({ commit, rootGetters }, payload: Tada.Message) {
      payload.id = generateUUID()
      payload.delivered = false
      payload.sender = rootGetters['user/profile']
      payload.created = new Date().toJSON()
      wsClient.send(payload)
      commit('ADD', payload)
    }
  }
}