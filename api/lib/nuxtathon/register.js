const validator = require('validator')
const {User} = require('../../models')

module.exports = async function register (user_data) {
  const user = new User(user_data)
  const nameEmpty = validator.isEmpty(user.profile.full_name)
  const emailEmpty = validator.isEmail(user.email)

  if (nameEmpty) {
    const err = new Error('Full name is required for registration')

    err.status = 404

    throw err
  }

  if (!emailEmpty) {
    const err = new Error(`Invalid email: ${user.email}`)

    err.status = 404

    throw err
  }

  user.role = 'user'
  user.activation_status = 'activated'
  user.permissions.manager = true
  user.permissions.approver = true


  try {
    await user.hashPassword()
    user.auth_token.generateJWT({user_id: user._id}, user.password)
  } catch (e) {
    const err = new Error(`Token error: ${user.email}`)
    throw e
  }

  try {
    await user.save()
  } catch (e) {
    if (e.code == 11000) {
      const err = new Error(`Duplicate user email: ${user.email}` )
      err.status = 409

      throw err
    }

    throw e
  }

  return user
}