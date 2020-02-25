const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

  description: {
      type: String,
      required:true,
       trim: true,
     },
     completed: {
       type: Boolean,
       default: false
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, 
{
  timestamps: true
})
 


// })
// const task1 = new Tasks({
//   description :  43, 
//   // completed: 'false'
// })
const Tasks = mongoose.model('task', TaskSchema)
module.exports = Tasks;