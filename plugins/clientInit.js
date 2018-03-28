import Cookie from 'js-cookie'

export default async function ({app, route, store}) {
  console.log('hi')
  const token = Cookie.get('accessToken', {domain: process.env.host})
  if (!token) return


  console.log('token', token)
  store.commit('setAccessToken', token)
  //app.$axios.setToken(token, 'Bearer')

  /*return app.$axios.get('/my/self')
    .then(res => {
      const user = res.data
      app.store.commit('setCurrentUser', user)
    })
    .catch(err => {
      console.log('error', 'cannot get user', err)
    })*/
}
