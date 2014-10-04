function TaskModel(mongoose) {
//ToDo Variable
  var taskSchema = new mongoose.Schema({ 
          userid: String,
          task: String,
          status: String,
          date: {type: Date, default: Date.now}
  });

  var task = mongoose.model('Task', taskSchema);
}

module.exports = TaskModel;