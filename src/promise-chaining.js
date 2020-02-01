// require('./db/mongoose')
require('./db/mongoose')

const Task = require('./models/task');

Task.findByIdAndDelete("5e29fa3b3b9205783841ee7a").then(deletetask => {
  console.log(deletetask);
  return Task.countDocuments({complete: false})
}).then(data => console.log(data)).catch(e => console.log(e))