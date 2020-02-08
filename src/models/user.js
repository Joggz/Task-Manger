const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UsherSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: Number,
    default: 0,
    valiate(value) {
      if(value < 0){
        throw new Error('Age must be positive')
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid')
      }
    }
  },

  password: {
    type: String,
    minlength: 7,
    trim: true,
    required: true,
    validate(value) {
      if(value.toLowerCase().includes('password')){
        throw new Error('You can\'t set password as our password')
      }
    }
  }
})

UsherSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')){
    user.password = await bcrypt.hash( user.password, 8 )
  }

})

const User = mongoose.model('User', UsherSchema)


module.exports = User;