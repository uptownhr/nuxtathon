const root = require('path').join.bind(this, __dirname, '../..')
require('dotenv').config({path: root('.env')})

const request = require('supertest')

//const MongodbMemoryServer = require('mongodb-memory-server').default
const mongoose = require('mongoose')

mongoose.Promise = Promise

// Your models and server
const nuxtathon = require(root('lib/nuxtathon'))
const register = nuxtathon.register
const Models = require(root('models'))
const {User} = Models

const random = function () {
  return Math.floor((Math.random() * 1000))
}

//const mongod = new MongodbMemoryServer({debug: true})

exports.root = root

// Create connection to mongoose before all tests
exports.before = (name) => {
  //console.log('before', name)
  return async t => {
    //mongoose.set('debug', true)
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/test${name + Date.now().toString()}`, { useMongoClient: true })

    const admin = await register({
      email: 'admin@admin.com',
      password: 'asdfasdf',
      profile: {
        first_name: 'admin',
        last_name: 'god'
      }
    })

    await admin.makeAdmin ()

    const user = await register({
      email: 'user@user.com',
      password: 'asdfasdf',
      profile: {
        first_name: 'owner',
        last_name: 'customer'
      }
    })
  }
}

// Create fixtures before each test
exports.beforeEach = async t => {
  const app = require(root('app'))
  const admin = await User.findOne({email: 'admin@admin.com'}).populate('_company')
  const user = await User.findOne({email: 'user@user.com'}).populate('_company')

  t.context.admin = admin
  t.context.user = user

  t.context.Models = Models
  t.context.app = app
  t.context.nuxtathon = nuxtathon

  t.context.newCustomer = async function () {
    const time = Date.now().toString() + random().toString()
    const email = `customer+${time}@customer.com`

    const customer = await nuxtathon.register({
      email,
      profile: {
        first_name: 'customer',
        last_name: 'customer'
      }
    })

    return customer
  }

  t.context.request = function () {
    return request(app)
  }

  t.context.randomEmail = function () {
    const time = Date.now().toString() + random().toString()
    return `random+${time}@random.com`
  }
  t.context.randomUserData = function () {
    return {
      email: t.context.randomEmail(),
      password: 'asdfasdf',
      profile: {
        first_name: 'random',
        last_name: 'data'
      }
    }
  }

  t.context.wait = function (time) {
    return new Promise( resolve => {
      setTimeout(resolve, time)
    })
  }
}

// Disconnect MongoDB and mongoose after all tests are done
exports.after = async t => {
  mongoose.connection.db.dropDatabase()
  mongoose.disconnect()

}