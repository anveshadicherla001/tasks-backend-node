const sql = require("../config/db");

// constructor
const Task = function (task) {
    this.title = task.title;
    this.description = task.description;
    this.due_date = task.due_date;
    this.created_by = task.created_by;
    this.status_id = task.status_id;
};

Task.create = (newTask, result) => {

    sql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newTask });

    });

};

Task.findById = (taskId, result) => {

    sql.query(`SELECT * FROM tasks WHERE id = ${taskId}`, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ err_msg: "task not found" }, null);

    });

};

Task.fetchAllTasks = result => {
    sql.query("SELECT * FROM tasks", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Task.updateById = (id, task, result) => {
    sql.query(
        "UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ?",
        [task.email, task.name, task.active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ err_msg: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...task });
        }
    );
};

Task.getCount = result => {

    sql.query("SELECT count(*) as total_count from tasks where due_date>=CURRENT_TIMESTAMP", (err, res) => {
            
            if (err) {
                console.log(err);
                result(null, err);
                return;
            }
            
            result(null, {test: true});
        }
    );

};

module.exports = Task;