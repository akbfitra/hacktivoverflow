const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema


const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username Myst Be Filled"]
  },
  email: {
    type: String,
    required: [true, `Email must be filled`],
    validate: [
      {
        validator: function (value) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: 'Invalid email format'
      }
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, `Password must be filled`]
  }
}, { timestamps: true })

userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} already exist' });

const User = mongoose.model('User', userSchema)
module.exports = User