const User = require('../models/user');
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
  // verify token
    const token = req.header('Authorization').replace('Bearer ', '')
    console.log(token)
    // const T = token.trim()
    // console.log(T)
    const key = 'userin'

    const decode = jwt.verify(token, key)
    console.log(decode)
    const user = await User.findById(decode._id)
    
        if (!user) {
          throw new Error()
        }

    const checkToken = user.tokens.find(usertoken => usertoken.token === token)
    console.log(checkToken)
    console.log( token === checkToken)
    if(!checkToken){
      console.log('not matched')
      throw new Error()
    }
    

    
    req.token = token
    req.user = user

    
    
    next()

  } catch (error) {
    res.status(401).send({error: 'please authenticate'})
  }


}

module.exports = auth