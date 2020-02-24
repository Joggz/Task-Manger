const express = require('express')
const Tasks = require('../models/task')
const auth = require('../middleware/auth')

const route = new express.Router()

route.post('/task', auth, async (req, res) => {
  console.log(req.body)
  if (!req.body) return;
  // const task = new Tasks(req.body);
  const task =  new Tasks({
    ...req.body,
    owner: req.user._id 
  })
  try {
    await task.save();
    res.status(201).send(task)

  } catch (error) {
    res.status(400).send(error)
  }
})

route.get('/task', auth, async (req, res) => {

  try {
    const task = await Tasks.find({owner: req.user._id})
    // await req.user.populate('tasks').execPopulate()
    res.status(200).send(task)

  
  } catch (error) {
    res.status(404).send(e)
  }
})

route.get('/task/:id', auth, async (req, res) => {
  const _id = req.params.id
  console.log(req.params.id)
  try {
    // const task = await Tasks.findById(_id)

    const task = await Tasks.findOne({_id, owner: req.user._id})
    res.status(200).send(task)
  } catch (e) {
    res.status(404).send(e)
  }

})


route.patch('/task/:id', auth, async (req, res) => {
  // console.log(req.body)
  const updates = Object.keys(req.body)
  // console.log(updates)
  const allowed = ["description", "completed"]
  const isValidUpdate = updates.every(update => allowed.includes(update))

  if(!isValidUpdate){
    return res.status(400).send({error: "invalid updates"})
  }
  try {
    // const task = await Tasks.findById(req.user._id)
    const task = await Tasks.findOne({_id: req.params.id, owner: req.user._id})
    
    updates.forEach( update => task[update] = req.body[update] )
    
     if(!task){
       console.log('task not found')
        return res.status(404).send()
     }
    
     res.status(200).send(task)
     await task.save()
  } catch (error) {
    res.status(400).send(error)
  }
})

route.delete('/task/:id',auth,  async (req, res) => {

  try {
    const task = await Tasks.findOneAndDelete({_id:req.params.id, owner: req.user._id})

    if(!task){
      return res.status(404).send(e)
    }

    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})


module.exports = route;