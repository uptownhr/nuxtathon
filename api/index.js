require('dotenv').config()
const logger = require('./lib/logger')
const db = require('./db')
const app = require('./app')
const server = require('http').createServer(app)

db.connection.on('open', function () {
  app.$server = server.listen( process.env.PORT)
  logger.info('Server is listening on http://localhost:', process.env.PORT)
})

module.exports = {
  app, db
}

process.on('unhandledRejection', err => {
  logger.error('Unhandled rejection:', err)
})