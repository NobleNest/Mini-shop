'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  item: {
    type: String,
  },
  count: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);