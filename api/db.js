const mongoose = require('mongoose'),
  debug = require('debug')('bambee:db')

mongoose.Promise = Promise

const {NODE_ENV, DB_HOST, DB_DB, DB_PORT, DB_USER, DB_PASS, DB_PARAMS} = process.env

if (NODE_ENV == 'dev') mongoose.set('debug', true)

let auth = DB_USER ? `${DB_USER}:${DB_PASS}@` : ''
let params = DB_PARAMS ? DB_PARAMS : ''

let connect = `mongodb://${auth}${DB_HOST}:${DB_PORT}/${DB_DB}${params}`

console.log('connecting to', connect)

mongoose.connect(connect)
mongoose.connection.on('error', debug)
mongoose.connection.on('open', debug.bind(null, `connected: ${connect}`))

module.exports = mongoose