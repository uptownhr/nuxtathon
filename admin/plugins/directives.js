import Vue from 'vue'

export default () => {
  Vue.directive('focus', {
    inserted (el) {
      el.focus()
    }
  })
}

