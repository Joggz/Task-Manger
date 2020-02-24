const mongoose = require('mongoose');

 const Tasks = mongoose.model('Tasks', {
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


})
// const task1 = new Tasks({
//   description :  43, 
//   // completed: 'false'
// })

module.exports = Tasks;