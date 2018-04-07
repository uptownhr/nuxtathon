import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

export default () => {
  if (process.env.env != 'dev') {
    Raven
      .config(process.env.sentry_public, {
        captureUnhandledRejections: true,
        environment: process.env.env
      })
      .addPlugin(RavenVue, Vue)
      .install()
  }
}

