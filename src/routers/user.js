const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth')


const route = new express.Router()


route.post('/user/login', auth, async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.getAuthToken()
    
    if( !user){
        res.status(400).send()
    }

    res.status(200).send({user, token})
  } catch (error) {
    res.status(400).send()
  }
})

route.post('/user',   async (req, res) => {
  console.log(req.body)
  if (!req.body) return;
  const user = await new User(req.body);
  try {
    await user.save()
    const token = await  user.getAuthToken();


    return res.status(201).send({user, token})
  } catch (error) {
    res.status(400).send(e)
  }

  // user.save().then((user) => res.status(201).send(user)).catch(e => res.status(400).send(e))
})

//get an individual user using the auth function(middleware)
route.get('/users/me', auth, async (req, res) => {
  // const user = await User.find({})
  res.send(req.user)
})

route.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id)
    res.status(200).send(user)
  } catch (error) {
    res.status(404).send(error)
  }
})

route.patch('/users/:id', async (req, res) => {
  console.log(Object.keys(req.body))
  const updates = Object.keys(req.body)
  const valuesToUpdate = ["name", "email", "age", "password"]
  const isValidUpdate = updates.every(update => valuesToUpdate.includes(update))

  if (!isValidUpdate) {
    res.status(404).send({ error: " invalid update" })
  }

  try {
    const user = await User.findById(req.params.id)
    updates.forEach( update => user[update] = req.body[update] )
    await user.save()
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!user) {
      return res.status(404).send({ error: "user doesn't exist on the database" })
    }
    return res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

route.delete('/users/:id', async (req, res) => {
    try {

      const user = await User.findByIdAndDelete(req.params.id)

      if(!user){
        return res.status(404).send(e)
      }

      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
})

module.exports = route