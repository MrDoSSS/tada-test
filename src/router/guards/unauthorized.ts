export const unauthorized: Tada.Guard = ({ next, store }) => {
  if (store.getters['user/isAuth']) {
    next({ name: 'chat-index' })
  } else {
    next()
  }
}
