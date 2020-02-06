const express = require('express')
const Tasks = require('../models/task')

const route = new express.Router()

route.post('/task', async (req, res) => {
  console.log(req.body)
  if (!req.body) return;
  const task = new Tasks(req.body);
  try {
    await task.save();
    res.status(201).send(task)

  } catch (error) {
    res.status(400).send(error)
  }
})

route.get('/task', async (req, res) => {

  try {
    const task = await Tasks.find({})
    res.status(200).send(task)
  } catch (error) {
    res.status(404).send(e)
  }
})

route.get('/task/:id', async (req, res) => {
  const _id = req.params.id
  console.log(req.params.id)
  try {
    const task = await Tasks.findById(_id)
    res.status(200).send(task)
  } catch (e) {
    res.status(404).send(e)
  }

})

route.patch('/task/:id', async (req, res) => {
  console.log(req.body)
  const updates = Object.keys(req.body)
  console.log(updates)
  const allowed = ["description", "completed"]
  const isValidUpdate = updates.every(update => allowed.includes(update))

  if(!isValidUpdate){
    return res.status(400).send({error: "invalid updates"})
  }
  try {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

    if(!task){
      return res.status(404).send()
    }
    res.status(200).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

route.delete('/task/:id', async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id)

    if(!task){
      return res.status(404).send(e)
    }

    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})


module.exports = route;