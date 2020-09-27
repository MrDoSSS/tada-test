import { isEmpty } from 'lodash'
import { Module } from 'vuex'
import { rooms } from './rooms'
import { messages } from './messages'
import { wsClient } from '@/websocket'

export const chat: Module<Tada.ChatState, Tada.RootState> = {
  namespaced: true,
  modules: { rooms, messages },
  getters: {
    hasRooms: state => !isEmpty(state.rooms.items)
  },
  actions: {
    init ({ getters, dispatch }) {
      wsClient.on('message', (e) => {
        if (!e.data) return

        const data: Tada.Message = JSON.parse(e.data)
        data.delivered = true

        if (getters['messages/byId'](data.id)) {
          dispatch('messages/update', data)
        } else {
          dispatch('messages/add', data)
        }

        const room: Tada.RawRoom = { name: data.room, last_message: data }

        if (getters['rooms/byName'](room.name)) {
          dispatch('rooms/update', room)
        } else {
          dispatch('rooms/add', room)
        }
      })
    },
  }
}