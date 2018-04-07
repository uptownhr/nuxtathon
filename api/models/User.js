const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  {JWT_SECRET} = require('../lib/const'),
  tokenSchema = require('./schemas/token')

const bcrypt = require('bcrypt-nodejs'),
  crypto = require('crypto'),
  jwt = require('jsonwebtoken')

const profileSchema = new Schema({
  first_name: { type: String, trim: true, default: '' },
  last_name: { type: String, trim: true, default: '' },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  address2: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  zip: { type: String, trim: true },
  avatar_url: { type: String, default: '' }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  _id: false,
  id: false
})

profileSchema.virtual('full_name')
  .get( function() {
    return (this.first_name + ' ' + this.last_name).trim()
  })
  .set(function(v) {
    this.first_name = v.substr(0, v.indexOf(' '));
    this.last_name = v.substr(v.indexOf(' ') + 1);
  })

const userSchema = new Schema({
  email: { type: String, lowercase: true, trim: true, unique: true },
  password: { type: String, trim: true },

  role: { type: String, enum: ['user','admin', 'customer-service'], default: 'user'},

  profile: {
    type: profileSchema,
    default: profileSchema
  },

  auth_token: {type: tokenSchema, default: tokenSchema},
  password_reset_token: {type: tokenSchema, default: tokenSchema},

  //marking deleted users
  active: { type: Boolean, default: true },

  created_at: { type: Date, default: Date.now },
  schema_version: { type: String, default: '1.0.1' }
}, {
  toJSON: {
    transform: function(doc, ret, options) {
      delete ret.password
      delete ret.token
      delete ret.password_reset_token
      delete ret.auth_token

      return ret
    },
    virtuals: true
  },
  minimize: false
})

/**
 * Password hash middleware.
 */
userSchema.pre('save', function (next) {
  let _this = this;

  if(this.profile.pay_rate && this.profile.pay_rate.includes('$')) {
    this.profile.pay_rate = this.profile.pay_rate.substring(1)
    this.markModified('profile')
    next()
  }

  next()

  /*if (!_this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(_this.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      _this.password = hash;
      next();
    });
  });*/
});

userSchema.methods.hashPassword = function () {
  return new Promise( (resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject(err);
      }

      bcrypt.hash(this.password, salt, null, (err, hash) => {
        if (err) {
          return reject(err);
        }

        this.password = hash;
        resolve(hash);
      });
    })
  })

    /*.then(hash => {
      console.log('z')
      console.log('pw', this.password)
      this.password = hash

      return hash
    })
    .catch(e => {
      console.error(e)
    })*/

}

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size) {
  if (!size) {
    size = 200;
  }

  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  }

  let md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

userSchema.methods.generateJWT = function () {
  //todo: add server secret in the future
  let token = jwt.sign({id: this._id}, this.created_at.toString());

  this.token = {
    active: true,
    text: token,
    generated_at: Date.now()
  }

  return token
}

userSchema.methods.verifyJWT = function (token) {
  const decoded = jwt.verify(token, this.created_at.toString())

  this.token = {
    active: true,
    text: '',
    generated_at: Date.now()
  }

  return this._id.equals(decoded.id)
}

userSchema.methods.decodeJWT = function (token) {
  return jwt.decode(token)
}

userSchema.methods.generateResetToken = function () {
  let token = jwt.sign({id: this._id, time: Date.now()}, JWT_SECRET)
  return token

}

userSchema.methods.eventData = function () {

  return {
    _id: this._id,
    email: this.email,
    role: this.role,
    profile: this.profile.toObject(),
    activation_status: this.activation_status
  }
}

userSchema.methods.managerData = async function () {
  await this.populate('manager').execPopulate()

  return {
    email: this.manager.email,
    profile: this.manager.profile.toObject()
  }

}

userSchema.methods.currentUser = function () {
  switch (this.role) {
    case 'admin':
      return new AdminUser(this)
    case 'user':
      return new OwnerUser(this)
    case 'employee':
      return new EmployeeUser(this)
    default:
      return new CurrentUser(this)
  }
}

module.exports = mongoose.model('User', userSchema)