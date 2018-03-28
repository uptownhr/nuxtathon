const {Router} = require('express')
const passport= require('passport')
const passportConfig = require('../config/passport')

const router = Router()

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login', session: false }), (req, res) => {
  console.log(2)
  res.cookie('accessToken', req.$accessToken)
  res.redirect(302, '/');
});


router.get('/api/test', (req,res) => {
  res.send(passportConfig.test)
})

module.exports = router
