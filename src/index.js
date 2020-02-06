const express = require('express');
require('./db/mongoose');

const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')


const app = express();
const port = process.argv.PORT || 3000;

app.use(express.json());
app.use(UserRouter)
app.use(TaskRouter)


app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})


// C:/Users/user/mongodb/bin/mongod.exe --dbpath=C:/Users/user/mongodb-data