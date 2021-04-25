const sql = require("../config/db");

// constructor
const UserTasks = function (userTask) {
    this.user_id = userTask.user_id;
    this.task_id = userTask.task_id;
};

UserTasks.create = (newUserTask, result) => {

    console.log(newUserTask);

    sql.query("INSERT INTO user_tasks SET ?", newUserTask, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newUserTask });

    });

};

module.exports = UserTasks;