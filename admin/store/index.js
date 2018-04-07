import debug from 'debug'
import Cookie from 'js-cookie'
import Cookies from 'cookies'
import qs from 'qs'

export const state = () => ({
  current_user: null
})

export const mutations = {
  setCurrentUser (state, user) {
    state.current_user = user
  }
}

export const actions = {
  getSelf ({commit}) {
    return this.$axios.get('/user/me')
      .then(res => {
        let user = res.data
        commit('setCurrentUser', user)
      })
      .catch(err => {
        console.log('error', 'cannot get user', err)
      })
  },
  login ({commit}, {email, password}) {
    return this.$axios.post('/user/login', {email, password}, {baseURL: '/api'})
      .then( res => {
        const {user, token} = res.data
        commit('setCurrentUser', user)
        Cookie.set('access-token', token, {domain: process.env.host})
        this.$axios.setToken(token, 'Bearer')

        return res.data.user
      })
  },
  logout ({commit}) {
    commit('setCurrentUser', null)
    Cookie.remove('access-token', {domain: process.env.host})
    this.$axios.setToken(false)
    return
  }
}