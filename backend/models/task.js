var mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  task_name: {
    type: String,
    required: true
  },
  is_completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('task', taskSchema);