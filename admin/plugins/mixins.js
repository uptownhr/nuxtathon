import Vue from 'vue'

export default () => {
  const mixins = {
    computed: {
      current_user () {
        return this.$store.state.current_user
      }
    },
    methods: {

    }
  }

  Vue.mixin(mixins)
}


