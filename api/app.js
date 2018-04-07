const morgan = require('morgan')
const logger = require('./lib/logger')
const app = require('express')()
const api = require('./api')

const bodyParser = require('body-parser')

const morganLogger = morgan(process.env.HTTP_LOGGER_FORMAT, {stream: logger.stream})
if (!['test', 'pipelines'].includes(process.env.NODE_ENV)) app.use(morganLogger)

app.use(bodyParser.json())
app.use(api)

module.exports = app