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
