 // require('./db/mongoose')
require('./db/mongoose')

const Task = require('./models/task');

// Task.findByIdAndDelete("5e29fa3b3b9205783841ee7a").then(deletetask => {
//   console.log(deletetask);
//   return Task.countDocuments({complete: false})
// }).then(data => console.log(data)).catch(e => console.log(e))

const deleteTaskAndCount = async (id) => {
    const deletetask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('5e2afba5abbded5c94daacb7').then(count => console.log(count)).catch(e => console.log(e))