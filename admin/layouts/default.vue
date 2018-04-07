<template>
  <div>
    <nav class="navbar">
      <div class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link class="navbar-item is-tab" to="/">Admin</nuxt-link>
          <nuxt-link class="navbar-item is-tab" to="/customers" active-class="is-active" >Customers</nuxt-link>
          <nuxt-link class="navbar-item is-tab" to="/users" active-class="is-active" >Users</nuxt-link>
        </div>
        <div class="navbar-end">
          <a @click="handle_logout" v-if="loggedIn" class="navbar-item is-tab">Logout</a>
          <nuxt-link v-else class="navbar-item is-tab" to="/login">Login</nuxt-link>
        </div>
      </div>

    </nav>

    <nuxt />
  </div>
</template>

<script>

 export default {
   computed: {
     loggedIn () {
       return this.$store.state.current_user
     },
     role () {
       return this.$store.state.current_user ? this.$store.state.current_user.role : null
     }
   },
   components: {

   },
   methods: {
     handle_logout () {
       this.$store.dispatch('logout')
       this.$router.push('/login')
     }
   }
 }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~assets/css/shared.scss';
  
  .nav-bar {
    min-height: 2rem;
  }
  
  @media screen and (max-width: 1023px) {
    .nav-bar {
      display: flex;
      min-height: auto;
    }
    .navbar-menu {
      display: flex;
      .navbar-start {
        display: flex;
        a.navbar-item.is-tab {
          font-size: remy(12);
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
      }
    }
  }
  
</style>
