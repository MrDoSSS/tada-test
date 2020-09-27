import { isEmpty } from 'lodash'
import { Module } from 'vuex'
import { rooms } from './rooms'
import { messages } from './messages'

export const chat: Module<Tada.ChatState, Tada.RootState> = {
  namespaced: true,
  modules: { rooms, messages },
  getters: {
    hasRooms: state => !isEmpty(state.rooms.items)
  }
}