/**
 * TasksService
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var HELP_TEXT = [
  "Todo - You're friendly todo list",
  "/todo list - List all your unfinished tasks",
  "/todo add [task] - Add a task to your todo list",
  "/todo complete [task number] - Complete the task with the given number"
].join('\n');
var NO_TASKS = "You've completed all your tasks!";
var TASK_LIST_PREFIX = "Your unfinished tasks:\n";

module.exports = {
  listUserTasks: function(userId, done) {
    return Task.find({
      done: done,
      user: userId
    });
  },

  listUnfinishedTasks: function(userId) {
    return this.listUserTasks(userId, false).then(function(tasks) {
      if (tasks.length === 0) {
        return NO_TASKS;
      }
      return TASK_LIST_PREFIX + tasks.map(function(task, index) {
        return (index + 1) + ". " + task.text;
      }).join('\n');
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
    return this.listUserTasks(userId, false).then(function(tasks, err) {
      if (taskIndex >= tasks.length) {
        throw "No available task by that index";
      }
      var task = tasks[taskIndex];
      task.done = true;
      return task.save().then(function() {
        return task;
      });
    });
  },

  showHelp: function() {
    return HELP_TEXT;
  }
};
