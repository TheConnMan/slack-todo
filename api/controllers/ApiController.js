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
              TaskService.listUnfinishedTasks(userId).then(function(message) {
                return res.send(message);
              });
            } else if (command == "add") {
              TaskService.addTask(text.join(' '), userId, team).then(function(task) {
                res.send("Successfully added \"" + task.text + "\" to your todo list!");
              });
            } else if (command == "complete") {
              TaskService.completeTask(parseInt(text[0]) - 1, userId).then(function(task) {
                res.send("Marked \"" + task.text + "\" as complete!");
              }).catch(function(e) {
                res.send(e);
              });
            } else if (command == "finished") {
              TaskService.listFinishedTasks(userId, parseInt(text[0])).then(function(message) {
                return res.send(message);
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
