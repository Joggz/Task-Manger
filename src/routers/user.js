const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')

const route = new express.Router()


route.post('/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.getAuthToken()

    if (!user) {
      res.status(400).send()
    }

    res.status(200).send({ user})
  } catch (error) {
    res.status(400).send()
  }
})

route.post('/user/logout', auth, async (req, res) => {
  try {

    const removeToken = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })

    req.user.tokens = removeToken 
    await req.user.save()


    res.send()

  } catch (error) {
    res.status(500).send()
  }
})

route.post('/user/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

const avatar = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      return  cb(new Error('please upload an image'))
    }
    cb(undefined, true)
  }
}) 

route.post('/user/me/avatar', auth, avatar.single('avatar'), async (req, res) => {
  req.user.avatar = req.file.buffer
// console.log(req.file.buffer)
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
        res.status(400).send({error: error.message})
})

route.delete('/user/me/avatar', auth,  async (req, res) => {
  req.user.avatar = undefined

  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({error: error.message})
})

route.post('/user', async (req, res) => {
  console.log(req.body)
  if (!req.body) return;
  const user = await new User(req.body);
  try {
    await user.save()
    const token = await user.getAuthToken();
    // console.log(token)

    return res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }

  // user.save().then((user) => res.status(201).send(user)).catch(e => res.status(400).send(e))
})

//get an individual user using the auth function(middleware)
route.get('/users/me', auth, async (req, res) => {
  // const user = await User.find({})
  res.send(req.user)
})



route.patch('/users/me', auth, async (req, res) => {
  console.log(Object.keys(req.body))
  const updates = Object.keys(req.body)
  const valuesToUpdate = ["name", "email", "age", "password"]
  const isValidUpdate = updates.every(update => valuesToUpdate.includes(update))

  if (!isValidUpdate) {
    res.status(404).send({ error: " invalid update" })
  }

  try {
    const user = await User.findById(req.user._id)
    updates.forEach(update => user[update] = req.body[update])
    await user.save()
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

// 
    return res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

route.delete('/users/me', auth, async (req, res) => {
  try {
      await req.user.remove()
    
      res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = route