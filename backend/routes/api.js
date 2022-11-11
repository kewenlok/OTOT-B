// Initialize express router
const router = require('express').Router();
const { retrieveAllTasks, addTask, deleteTask, updateTask } = require('../controllers/task');

router.route('/task/add').post(addTask);

router.route('/task/all').get(retrieveAllTasks);

router.route('/task/update').put(updateTask);

router.route('/task/delete').delete(deleteTask);

module.exports = router;