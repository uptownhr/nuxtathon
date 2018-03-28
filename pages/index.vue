<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        Nuxtahton
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <no-ssr>
        <div class="links">
          <a
            v-if="!loggedIn"
            href="/auth/github"
            class="button--grey">
            Login with GitHub
          </a>
          <button
            v-else
            @click="logout"
          >
            Logout
          </button>
        </div>
      </no-ssr>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  },

  computed: {
    loggedIn () {
      return this.$store.state.auth.accessToken
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
