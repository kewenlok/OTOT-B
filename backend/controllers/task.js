const Task = require("../models/task");

const retrieveAllTasks = async function(req, res) {
  try {
    // Fetch all tasks from database
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(`Error occured when fetching tasks. ${error}`);
    return res.status(500).send("Oops...we are unable to fetch tasks at the moment. Please try again later.");
  }
}

const addTask = async function(req, res) {
  try {
    const { task_name } = req.body;

    // Ensure that the task name is not empty
    if (!task_name) {
      return res.status(400).send("Task name should not be empty!");
    }

    // Insert new task
    const task = await Task.create({
      task_name,
      is_completed: false
    });

    // Return success response with latest task information
    return res.status(201).json(task);
  } catch (error) {
    console.log(`Error occured when adding task. ${error}`);
    res.status(500).send("Oops...we are unable to add a new task at the moment. Please try again later.");
  }
}

const deleteTask = async function(req, res) {
  try {
    const { task_id } = req.body;

    // Ensure that the task id is not empty
    if (!task_id) {
      return res.status(400).send("Task ID should not be empty!");
    }

    // Delete task
    const task = await Task.findOneAndDelete({ _id: task_id });
    if (task) {
        return res.status(200).send(task);
    }
  
    return res.status(409).send("Task doesn't exist!");
  } catch (error) {
    console.log(`Error occured when deleting task. ${error}`);
    res.status(500).send("Oops...we are unable to delete the specified task at the moment. Please try again later.");
  }
}

const updateTask = async function(req, res) {
  try {
    const { task_id, is_completed } = req.body;

    // Ensure that task ID and is completed is not empty
    if (!task_id || !is_completed) {
        return res.status(400).send("Task ID and/or completion status should not be empty!");
    }
    
    // Update the status of specified task
    const task = await Task.findByIdAndUpdate(
        { _id: task_id }, 
        { is_completed }
    );
    if (task) {
        return res.status(200).send(task);
    }
    
    return res.status(409).send("Task ID doesn't exist.");
  } catch (error) {
    console.log(`Error occured when updating task. ${error}`);
    res.status(500).send("Oops...we are unable to update the specified task at the moment. Please try again later.");
  }
}

module.exports = {
  retrieveAllTasks,
  addTask,
  deleteTask,
  updateTask
}