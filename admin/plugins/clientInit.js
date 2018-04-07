import Cookie from 'js-cookie'

export default function ({app, store}) {
  const token = Cookie.get('access-token', {domain: process.env.host})

  if (!token) return

  app.$axios.setToken(token, 'Bearer')

  return store.dispatch('getSelf')
}