import { Store } from 'vuex'

type UserProfile = {
  username: string
}

export interface UserState {
  isAuth: boolean
  profile?: UserProfile
}

export interface Message {
  room: string
  text: string
  id?: string
  created?: string
  sender?: UserProfile
  delivered?: boolean
  [key: string]
}

export interface RawRoom {
  name: string
  last_message: Message
}

export interface Room {
  name: string
  lastMessage: Message
  [key: string]
}

export interface ChatState {
  rooms: MessagesState
  messages: MessagesState
}

export interface RoomsState {
  items: Room[]
}

export interface MessagesState {
  items: Message[]
}

export interface RawSettingsState {
  max_message_length: number
  max_room_title_length: number
  max_username_length: number
}

export interface SettingsState {
  maxMessageLength: number
  maxRoomTitleLength: number
  maxUsernameLength: number
}

export interface RootState {
}

export class AppStore extends Store<RootState> { }