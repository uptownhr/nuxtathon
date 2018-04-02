<template>
  <div class="container has-text-centered">
    <app-logo/>
    <h1 class="title">
      Nuxtathon
    </h1>
    <h2 class="subtitle">
      Start building
    </h2>

    <no-ssr>
      <a
        v-if="!loggedIn"
        class="button is-primary"
        href="/auth/github"
      >Get Started</a>
      <button
        v-else
        @click="logout"
        class="button is-info"
      >Log out</button>
    </no-ssr>

  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  },

  computed: {

  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; !* 1 *!
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
</style>
