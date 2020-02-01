const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useUnifiedTopology: true,
  useCreateIndex: true
})





// task1.save().then(data => console.log(data)).catch(error => console.log(error));