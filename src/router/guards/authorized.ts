export const authorized: Tada.Guard = ({ to, next, store }) => {
  if (store.getters['user/isAuth']) {
    next()
  } else {
    next({
      name: 'login',
      query: {
        redirect: to.name
      },
      stopPipeline: true
    })
  }
}
