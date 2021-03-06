/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    done: {
      type: 'boolean',
      defaultsTo: false
    },

    text: {
      type: 'string',
      required: true
    },

    user: {
      type: 'string',
      required: true,
    },

    team: {
      model: 'team'
    }
  }
};
