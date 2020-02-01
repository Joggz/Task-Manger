 // CRUD

// const mongodb = require('mongodb'); 
// const MongoClient = mongodb.MongoClient;
const { mongodb, MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useUnifiedTopology: true}, (error, client) => {
  if(error){
    return console.log('Unable to connect to database')
  }

  const db = client.db(databaseName);

//   db.collection('users').insertOne({
//     names: 'Andrew',
//     age: 27 
//   })

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'sum',
  //     completed: true
  //   },
  //   {
  //     description: 'some task',
  //     completed: false
  //   },
  //   {
  //     description: 'some task',
  //     completed: false
  //   }
  // ], (error, results) => {
  //   if(error){
  //     return console.log('unable to create document')
  //   }

  //   console.log(results.ops);
  // })

  // db.collection('tasks').findOne({_id: new ObjectID("5e25fe8b928c682f689eb733")}, (error, task) => {
  //   if(error){
  //     return console.log('dont exist')
  //   }

  //   console.log(task)
  // })

  // db.collection('tasks').find({completed: false}).toArray((error, task) => {
  //   console.log(  task)
  // })
  
  // db.collection('tasks').updateMany({
  //   completed: true
  // }, {
  //   $set: {
  //     completed: false
  //   }
  // }).then((result) => {
  //   console.log(result.modifiedCount)
  // }).catch((error) => {
  //   console.log(error)
  // })
  db.collection('users').deleteMany({
    names: 'Andrew'
  }).then((result) => console.log(result.deletedCount)).catch(error => console.log(error))
})