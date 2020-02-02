const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Tasks = require('./models/task');


const app = express();
const port = process.argv.PORT || 3000;

app.use(express.json());


app.post('/user', async (req, res) => {
  console.log(req.body)
  if(!req.body) return;
  const user = await new User(req.body);
  try {
    await user.save()
    return res.status(201).send(user)
  } catch (error) { 
    res.status(400).send(e)
  }

  // user.save().then((user) => res.status(201).send(user)).catch(e => res.status(400).send(e))
}) 

app.get('/users', async (req, res) => {
  const user = await User.find({})
  try {
    res.status(200).send(user)
    
  } catch (error) {
    res.status(401).send(error)
  }
})

app.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
       const user = await User.findById(_id)
        res.status(200).send(user)
  } catch (error) {
    res.status(404).send(error)
  }
})

app.post('/task', async (req, res) => {
  console.log(req.body)
  if(!req.body) return;
  const task =  new Tasks(req.body);
  try {
    await task.save();
    res.status(201).send(task)
    
  } catch (error) {
    res.status(400).send(error)
  }
}) 

app.get('/task', async (req, res) => {
  
  try {
    const task = await Tasks.find({})
    res.status(200).send(task)
  } catch (error) {
    res.status(404).send(e)
  }
})

app.get('/task/:id', async (req, res) => {
  const _id = req.params.id
  console.log(req.params.id)
  try {
    const task = await Tasks.findById(_id)
    res.status(200).send(task)
  } catch (e) {
    res.status(404).send(e)
  }

})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})


// C:/Users/user/mongodb/bin/mongod.exe --dbpath=C:/Users/user/mongodb-data