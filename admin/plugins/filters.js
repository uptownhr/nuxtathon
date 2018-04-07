import Vue from 'vue'
import moment from 'moment'

export default () => {
  Vue.filter('capitalize', val => val.toUpperCase())
  Vue.filter('date', (val,format = 'M/D/YYYY') => moment(val).format(format) )
  Vue.filter('date-ago', (val) => moment(val).fromNow() )
}