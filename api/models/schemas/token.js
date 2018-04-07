const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  jwt = require('jsonwebtoken'),
  {JWT_SECRET} = require('../../lib/const')

const tokenSchema = new Schema({
  token: {type: String, trim: true, default: ''},
  generated_at: {type: Date, default: Date.now},
  created_at: {type: Date, default: Date.now}
})

tokenSchema.methods.generateJWT = function (payload, secret) {
  //let token = jwt.sign(payload, this._id.toString() + secret + JWT_SECRET);
  let token = jwt.sign(payload, secret + JWT_SECRET);

  this.token = token
  this.generated_at = Date.now()

  return token
}

tokenSchema.methods.verifyJWT = function (token, secret) {
  //const decoded = jwt.verify(token, this._id.toString() + secret + JWT_SECRET)
  const decoded = jwt.verify(token, secret + JWT_SECRET)

  return decoded
}

module.exports = tokenSchema