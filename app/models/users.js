'use strict';

var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

//var User = new Schema({
var User = new mongoose.Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
    publicRepos: Number
	},
    nbrClicks: {
      clicks: Number
   }
});
/*
var Poll = new mongoose.Schema({
  question: {type: String, required: true},
  pubDate: {type: Date, default: Date.now}
});


var Poll = new mongoose.Schema({
  name: {type: String, required: true},
  question: {type: String, required: true},
  pubDate: {type: Date, required: true},
  // (data not normalised into separate table/collection)
  choices: [{
    name: String,
    votes: {
      type: Number,
      required: true,
      default: 0
    }
  }]
});

Poll.methods.wasPublishedRecently = function () {
  var now = new Date()
  var delta = Math.abs(now.getTime() - this.pubDate.getTime())
  // If the difference is less than
  // the number of milliseconds in a week
  return delta <= (1000 * 60 * 60 * 24 * 7)
}

*/

module.exports = mongoose.model('User', User);
//module.exports = mongoose.model('Polls', Polls);
