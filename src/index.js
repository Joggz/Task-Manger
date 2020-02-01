const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Tasks = require('./models/task');


const app = express();
const port = process.argv.PORT || 3000;

app.use(express.json());


app.post('/user', (req, res) => {
  console.log(req.body)
  if(!req.body) return;

  const user = new User(req.body);

  user.save().then((user) => res.status(201).send(user)).catch(e => res.status(400).send(e))
}) 

app.get('/users', (req, res) => {
  User.find({}).then((user) => {
    res.status(200).send(user)
  }).catch((error) => {
    res.status(401).send(error)
  }) 
} )

app.get('/users/:id', (req, res) => {
  const _id = req.params.id;

  User.findById(_id).then(user => {
    if(!user){
      return res.status(204)
    }

    res.status(200).send(user)
  }).catch(error => {
    res.status(400).send(error)
  })
})

app.post('/task', (req, res) => {
  console.log(req.body)
  if(!req.body) return;

  const task = new Tasks(req.body);

  task.save().then(() => res.status(201).send(task)).catch(e => res.status(400).send(e))
}) 

app.get('/task', (req, res) => {
  
    Tasks.find({}).then(tasks => {
      res.status(200).send(tasks)
    }).catch(e => {
      res.status(404).send(e)
    })
})

app.get('/task/:id', (req, res) => {
  const _id = req.params.id
  console.log(req.params.id)
  Tasks.findById(_id).then(task => {
     if(!task){
       return res.status(204)
     }
     res.send(task)
  }).catch( error => {
    res.status(404).send(error)
  })
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})


// C:/Users/user/mongodb/bin/mongod.exe --dbpath=C:/Users/user/mongodb-data