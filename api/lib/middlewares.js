const
  logger = require('./logger')
  routerDebug = require('debug')('nuxtathon:router'),
  { User } = require('../models'),
  jwt = require('jsonwebtoken')

exports.isAdmin = function (req,res,next) {
  if (req.$current_user.role() == 'admin') return next()

  res.sendStatus(403)
}

exports.populateIpAddress = function (req,res,next) {
  req.$ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  next()
}

exports.populateJWTUser = async function (req,res,next) {
  let auth = req.get('authorization')

  if (!auth) return next()

  let token = auth.split(" ").pop()

  try {
    const {user_id} = jwt.decode(token)
    const user = await User.findOne({_id: user_id})

    if (!user) {
      const error = new Error(`JWT Token user not found`)
      error.status = 403
      logger.info(error)

      throw error
    }

    user.auth_token.verifyJWT(token, user.password)

    req.$current_user = user

    return next()
  } catch (err) {
    return next()
  }

}

exports.isAuthenticated = function (req,res,next) {
  if (req.$current_user) return next()

  res.sendStatus(401)
}