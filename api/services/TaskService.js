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
  showHelp: function() {
    return HELP_TEXT;
  }
};
