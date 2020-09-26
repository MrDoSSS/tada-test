import { Store } from 'vuex'

type UserProfile = {
  username: string
}

export interface UserState {
  isAuth: boolean
  profile?: UserProfile
}

export interface RootState {
}

export class AppStore extends Store<RootState> { }