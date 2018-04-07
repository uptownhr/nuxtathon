<template>
  <section class="hero is-fullheight">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">

    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="block">
          <b-icon icon="fingerprint" size="is-large"></b-icon>
        </div>
        <div class="columns is-centered">
          <form @submit.prevent="handle_login">
            <div class="column is-12">
              <b-field>
                <b-input v-model="login.email" v-focus placeholder="email" icon="email" required></b-input>
              </b-field>
            </div>
            <div class="column is-12 pt-0">
              <b-field>
                <b-input v-model="login.password" placeholder="password" type="password" icon="security" required password-reveal></b-input>
                <p class="control">
                  <button class="button is-primary"><b-icon icon="check"></b-icon></button>
                </p>
              </b-field>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot">

    </div>
  </section>

</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        login: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      handle_login () {
        this.$store.dispatch('login', this.login)
          .then( res => {
            this.$router.push('/')
          })
          .catch( err => {
            this.$snackbar.open({
              duration: 5000,
              message: err.response.data,
              type: 'is-danger',
              position: 'is-top-right'
            })
          })
      }
    }
  }
</script>
