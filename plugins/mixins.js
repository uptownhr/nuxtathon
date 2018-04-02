import Vue from 'vue'

export default () => {
  const mixins = {
    computed: {
      loggedIn () {
        return this.$store.state.auth.accessToken
      }

    },
    methods: {
      scrollTo (target) {
        const scrollto = window.document.querySelector(target)
        const container = window.document.querySelector('.body_content')

        this.$velocity(scrollto, 'scroll', {
          container,
          duration: 1500,
        })
      },

      cap_type(model){
        switch(model){
          case 'Pip':
            return 'pip'
          case 'Writtenwarning':
            return 'written-warning'
          case 'Verbalwarning':
            return 'verbal-warning'
          case 'Incident':
            return 'incident'
        }
      },

      cap_label (model) {
        switch(model){
          case 'Pip':
            return 'Performance Plan'
          case 'Writtenwarning':
            return 'Written Warning'
          case 'Verbalwarning':
            return 'Verbal Warning'
          case 'Incident':
            return 'Incident'
        }
      },

      onboard_docs_type(type){
        switch(type){
          case 'employee_handbook':
            return {
              title: 'Handbook',
              type: 'handbook'
            }
          case 'harassment':
            return {
              title: 'Discrimination Policy',
              type: 'harassment'
            }
          case 'employee_agreement':
            return {
              title: 'Employee Agreement',
              type: 'employee agreement'
            }
          case 'hipaa_notice':
            return {
              title: 'HIPAA Notice',
              type: 'hipaa notice'
            }
          case 'employee_notice':
            return {
              title: 'Notice to Employee',
              type: 'notice to employee'
            }
        }
      },

      validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    }
  }

  Vue.mixin(mixins)
}
