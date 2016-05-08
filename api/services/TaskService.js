/**
 * TasksService
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var HELP_TEXT = [
  "/todo list - List all your unfinished tasks"
].join('\n');

module.exports = {
  listUserTasks: function(userId) {
    return Task.find({
      done: false,
      user: userId
    });
  },

  addTask: function(text, userId, team) {
    return Task.create({
      text: text,
      user: userId,
      team: team
    });
  },

  completeTask: function(taskIndex, userId) {
    return this.listUserTasks(userId).then(function(tasks, err) {
      if (taskIndex >= tasks.length) {
        throw "No available task by that index";
      }
      var task = tasks[taskIndex];
      task.done = true;
      return task.save();
    });
  },

  showHelp: function() {
    return HELP_TEXT;
  }
};
