import Cookie from 'js-cookie'

export default async function ({app, route, store}) {
  console.log('hi')
  const token = Cookie.get('accessToken', {domain: process.env.host})
  if (!token) return


  console.log('token', token)
  store.commit('setAccessToken', token)
}
