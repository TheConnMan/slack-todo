/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  v1: function(req, res) {
    var text = req.body.text.split(' ');
    if (text[0] == 'list') {
      var tasks = TaskService.listUserTasks(req.body.uesr_id);
      tasks.exec(function(err, data) {
        return res.send(data);
      });
    } else {
      return res.send(TaskService.showHelp());
    }
  }
};