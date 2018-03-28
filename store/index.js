import Cookie from 'js-cookie'

export const state = () => ({
  auth: {
    accessToken: null
  }
})

export const mutations = {
  setAccessToken (state, accessToken) {
    state.auth.accessToken = accessToken
  }
}

export const actions = {
  logout ({commit}) {
    commit('setAccessToken', null)
    Cookie.remove('accessToken')
  }
}
