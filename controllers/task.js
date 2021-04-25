const Task = require('../models/task');
const UserTasks = require('../models/userTasks');
const sql = require("../config/db");

exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Invalid Paramters"
        });
    }

    // Create a task
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        created_by: req.body.created_by,
        status_id: 1
    });

    // Save task in the database
    Task.create(task, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Oops ! Unable to create task."
            });
        }
        else {
            UserTasks.create({ user_id: req.body.user, task_id: data.id, status_id: 1 }, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message:
                            err.message || "Oops ! unable to create the user."
                    });
                }
            });
            res.send(data);
        }
    });

};

// Find a single task with a id
exports.findOne = (req, res) => {

    Task.findById(req.params.taskId, (err, data) => {
        if (err) {
            if (err.err_msg === "not_found") {
                res.status(404).send({
                    message: `Task not found with id : ${req.params.taskId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving task with id " + req.params.taskId
                });
            }
        } else res.send(data);
    });

};

exports.findAll = (req, res) => {
    task.fetchAllTasks((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Oops ! failed to fetch tasks"
            });
        else res.send(data);
    });
};

// Update a task using taskId
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Invalid Paramters"
        });
    }

    Task.updateById(
        req.params.taskId,
        new Task(req.body),
        (err, data) => {
            if (err) {
                if (err.err_msg === "not_found") {
                    res.status(404).send({
                        message: `Task not found with taskId ${req.params.taskId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating task with id " + req.params.taskId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.searchTask = async (req, res) => {

    let limit = req.query.limit ? req.query.limit : 10;
    let offSet = req.query.offset ? req.query.offset*req.query.limit : 0;
    let resultArray = [];
    let searchConditionQuery = '';

    if (req.query.key && req.query.key.trim().length > 0) {
        searchConditionQuery = ` AND MATCH (title,description) AGAINST ('${req.query.key}' IN NATURAL LANGUAGE MODE)`;
    }

    sql.query(`SELECT t.*,ut.user_id,u.name,u.email,u2.name created_by_name,u2.email created_by_email from tasks t INNER JOIN user_tasks ut ON ut.task_id=t.id INNER JOIN users u ON u.id=ut.user_id INNER JOIN users u2 ON u2.id=t.created_by where (ut.user_id=${req.query.user_id} OR t.created_by=${req.query.user_id}) AND due_date>=CURRENT_TIMESTAMP${searchConditionQuery} order by due_date asc limit ${offSet},${limit}`, (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).send({
                    message: "Oops ! failed to fetch tasks"
                });
            }
            resultArray = [...result];
            res.send(resultArray);
    });

}

exports.countTask = async (req, res) => {

    let searchConditionQuery = '';

    if(!req.query.user_id) {
        return res.status(400).send({
            message: 'Invalid Parameters'
        })
    }

    if (req.query.key && req.query.key.trim().length>0) {
        searchConditionQuery = ` AND MATCH (title,description) AGAINST ('${req.query.key}' IN NATURAL LANGUAGE MODE)`;
    }

    sql.query(`SELECT count(*) as total_count from tasks t INNER JOIN user_tasks ut ON ut.task_id=t.id INNER JOIN users u ON u.id=ut.user_id INNER JOIN users u2 ON u2.id=t.created_by where (ut.user_id=${req.query.user_id} OR t.created_by=${req.query.user_id}) AND due_date>=CURRENT_TIMESTAMP${searchConditionQuery}`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Oops ! failed to count of tasks"
            });
        }
        res.send(result.length ? result[0] : result);
    });

}