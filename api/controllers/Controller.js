 'use strict';


 var mongoose = require('mongoose'),
   Task = mongoose.model('Tasks');
 
 exports.list_all_tasks = function(req, res) {
   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   Task.find({}, function(err, task) {
     if (err)
       res.send(err);
     res.json(task);
   });
 };

 exports.delete_a_task = function(req, res) {


   Task.remove({
     _id: req.params.taskId
   }, function(err, task) {
     if (err)
       res.send(err);
     res.json({ message: 'Task successfully deleted' });
   });
 };

 exports.create_a_task = function(req, res) {
   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "POST");
   var new_task = new Task(req.body);
   new_task.save(function(err, task) {
     if (err)
       res.send(err);
     res.json(task);
   });
 };