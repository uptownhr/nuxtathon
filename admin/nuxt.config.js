require('dotenv').config()
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  /*
  ** Headers of the page
   */
  env: {
    env: process.env.NODE_ENV,
    host: process.env.PRIMARY_DOMAIN,
    www: process.env.WWW,
    app: process.env.APP,
    admin: process.env.ADMIN,
    stripe_public: process.env.STRIPE_PUBLIC,
    sentry_public: process.env.SENTRY_PUBLIC,
    segment: process.env.SEGMENT_WEBSITE_APP_ID,
    filestack: process.env.FILESTACK,
    zendesk_domain: process.env.ZENDESK_DOMAIN,
    intercom: process.env.INTERCOM
  },
  dev: !isProd,

  mode: 'spa',

  head: {
    title: 'bambee admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: "bambee admin" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css'},
      { rel: 'stylesheet', href: '//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css'},
      { rel: 'stylesheet', href: 'https://cdn.quilljs.com/1.3.4/quill.snow.css' }
      // { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'}
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js' },
      { src: '//api.filestackapi.com/filestack.js' },
      { src: '//js.stripe.com/v3/' }
    ]
  },
  build: {
    vendor: ['axios', 'moment', 'lodash', 'filestack-js'],
    babel: {
      presets: ['vue-app', 'stage-2', 'es2015']
    },
    extend (config, {isDev, isClient}) {
      config.devtool = 'source-map'
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
  },
  plugins: [
    '~plugins/buefy.js',
    { src: '~plugins/sentry.js', ssr: false},
    '~plugins/filters.js',
    '~plugins/directives.js',
    '~plugins/mixins.js',
    {src: '~plugins/filestack.js', ssr: false},
    {src: '~plugins/clientInit.js', ssr: false},
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa'
  ],

  manifest: {
    name: 'Bambee Admin',
    lang: 'en'
  },

  axios: {
    baseURL: process.env.PROXY_API_URL + '/admin',
    browserBaseURL: '/api/admin',
  },

  proxy: {
    '/api': {
      target: process.env.PROXY_API_URL || 'http://api:3000',
      pathRewrite: {
        '^/api' : '/'
      }
    }
  },

  /*
  ** Global CSS
  */
  css: [{ src: '~assets/css/index.scss', lang: 'scss' }],

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  router: {
    middleware: ['auth']
  }
}
