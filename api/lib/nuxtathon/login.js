const {User} = require('../../models')
const CurrentUser = require('./current-user')

module.exports = async function login (email, password) {
  let user = await User.findOne({email: email}).populate('_company')

  if (!user || !user.comparePassword(password) ) throw new Error('bad login info')

  return user
}