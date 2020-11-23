'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/Controller');

  // todoList Routes
  app.route('/get')
    .get(todoList.list_all_tasks);


  app.route('/cart')
    .delete(todoList.delete_a_task)
    .post(todoList.create_a_task);
};