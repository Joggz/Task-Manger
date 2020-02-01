const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
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

// const you = new User({
//   name: 'Brad',
//   age: 30,
//   password: 'jno9ru38492303d'
// })

module.exports = User;