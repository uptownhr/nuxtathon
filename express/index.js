require('dotenv').config()

const express = require('express')
const app = express()
const passport = require('passport')
const chokidar = require('chokidar')

app.use(passport.initialize())

app.use((req,res,next) => {
  require('./routes')(req,res,next)
})


//handle hot loading of routes
//reinitializes everything when file changes inside express dir
chokidar.watch(__dirname)
  .on('change', (path) => {
    const keys = Object.keys(require.cache).filter(k => k.includes(__dirname))
    keys.forEach(k => delete require.cache[k])

    keys.forEach(console.log)
  })

module.exports = app
