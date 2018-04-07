const {Schema} = require('mongoose')

const filestackSchema = new Schema({
  url: {type: String, default: ''},
  filename: {type: String},
  mimetype: {type: String},
  size: {type: Number},
  id: {type: Number},
  uploaded_date: {type: Date, default: Date.now}
})

module.exports = filestackSchema