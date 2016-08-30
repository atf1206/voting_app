'use strict';

var mongoose = require('mongoose');
/*
var Poll = new mongoose.Schema({
  question: {type: String, required: true},
  pubDate: {type: Date, default: Date.now},
  createdById: Number,
  responses: [Responses]
});
*/
var Responses = new mongoose.Schema({
  responseText: {type: String},
  createdById: Number,
  votes: [Number]
});
/*
var Votes = new mongoose.Schema({
  votesbyid: [Number]
});

/*
Poll.methods.wasPublishedRecently = function () {
  var now = new Date()
  var delta = Math.abs(now.getTime() - this.pubDate.getTime())
  // If the difference is less than
  // the number of milliseconds in a week
  return delta <= (1000 * 60 * 60 * 24 * 7)
}
*/

module.exports = mongoose.model('Responses', Responses);
