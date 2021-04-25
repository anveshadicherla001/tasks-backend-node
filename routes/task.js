const express = require('express');
const router = express.Router();
const tasks = require("../controllers/task");
const { isSignedIn } = require("../middlewares/authorization");
const { check } = require('express-validator');

router.post("/tasks", [
    check("title").isLength({ min: 1 }).withMessage('Task title required'),
    check("description").isLength({ min: 1 }).withMessage('Description required'),
    check("due_date").isLength({ min: 1 }).withMessage('Due Date required'),
    check("created_by").isLength({ min: 1 }).withMessage('User Id required'),
    check("user").isLength({ min: 1 }).withMessage('Assigned user id required')
], isSignedIn, tasks.create);

router.get("/tasks", isSignedIn, tasks.findAll);

router.get("/tasks/search", isSignedIn, tasks.searchTask);

router.get("/tasks/count", isSignedIn, tasks.countTask);

router.get("/tasks/:taskId", isSignedIn, tasks.findOne);

router.put("/tasks/:taskId", isSignedIn, tasks.update);

module.exports = router;