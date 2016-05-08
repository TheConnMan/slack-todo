/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  v1: function(req, res) {
      TeamService.getTeam(req.body.team_id).exec(function(err, team) {
          try {
            if (team === undefined) {
              throw "Invalid team ID";
            }
            var userId = req.body.user_id;
            var text = req.body.text.split(' ');
            var command = text.shift();
            if (command == 'list') {
              var tasks = TaskService.listUserTasks(userId);
              tasks.exec(function(err, data) {
                return res.send(data);
              });
            } else if (command == "add") {
              TaskService.addTask(text.join(' '), userId, team).exec(function(err, task) {
                res.send("Successfully added your task!");
              });
            } else {
              return res.send(TaskService.showHelp());
            }
          } catch (e) {
            console.log(e);
            res.send(401);
          }
      });
  }
};
