const User = require('../models/user');
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
  // verify token
    const token = req.header('Authorization').replace('Bearer', '')
    const T = token.trim()
    const key = 'userin'

    const decode = jwt.verify(T, key)
    console.log(decode)
    const user = await User.findById({ _id: decode._id, 'tokens.token': token })
    

    if (!user) {
      throw new Error()
    }
    req.user = user
    
    next()

  } catch (error) {
    res.status(401).send(error)
  }


}

module.exports = auth