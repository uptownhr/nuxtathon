const logger = require('../lib/logger')
const router = require('express').Router()
const  { User } = require('../models');

const nuxtathon = require('../lib/nuxtathon')

router
  .post('/customer/register', async ( req, res ) => {
    const user_data = req.body.user
    const company_data = req.body.company

    if(!user_data || !company_data) return res.status(400).send('Incomplete registration data')

    let current_user, company, token

    try {
      current_user = await nuxtathon.register(user_data)
    } catch (e) {
      return res.status(e.status || 400).send(e.message || e)
    }
    try {
      token = current_user.getAccessToken ()
    } catch (e) {
      return res.status(500).send(e)
    }

    if (company_data) {
      try {
        company = await current_user.createCompany(company_data)
      } catch (e) {
        return res.status(500).send(e)
      }
    }

    res.send({token, company, user: current_user})

    nuxtathon.event.newCustomerLead(current_user)
    nuxtathon.event.loggedIn (current_user, {
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    })
  })
  .post('/user/login', async function (req,res) {
    const email = req.body.email.toLowerCase()
    const password = req.body.password

    let current_user

    try {
      current_user = await nuxtathon.login(email, password)
    } catch (e) {
      return res.status(403).send(e)
    }

    let token
    try {
      current_user.setAccessToken ()
      token = current_user.getAccessToken()
    } catch (e) {
      console.log('error', e)
    }

    nuxtathon.event.loggedIn (current_user, {
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    })

    return res.send({token, user: current_user})
  })

router
  .get('/health-check', async (req, res) => {

    try {
      const user = User.findOne()
    } catch (e) {
      return res.status(500).send('db error')
    }

    res.sendStatus(200)
  })

module.exports = router