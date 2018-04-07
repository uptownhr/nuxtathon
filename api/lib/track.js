const logger = require('../lib/logger')
const Analytics = require('analytics-node')
const analytics = new Analytics(process.env.SEGMENT_SERVER_API)

const envs = ['dev', 'production'],
  run = envs.includes(process.env.NODE_ENV)

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

async function event (name, user, properties) {
  if (!run) return false
  if (!name || !user) return false

  properties.site_host = process.env.PRIMARY_DOMAIN

  for (let key in properties) {
    try {
      if ( isPromise(properties[key]) ) {
        properties[key] = await properties[key]
      }
    } catch (e) {
      logger.error(`error resolving promise ${key}`)
    }
  }

  try {
    if(!user._id){
      //TODO: Will need to generate UUID later. Probably a passed in value from browser.
      return analytics.track({
        properties,
        anonymousId: Date.now(),
        event: name
      })
    }

    analytics.track({
      properties,
      userId: user._id.toString(),
      event: name
    })
  } catch (e) {
    logger.error(e)
  }

}

module.exports = { event }