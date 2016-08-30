'use strict';
var Polls = require('../models/polls.js');
var Responses = require('../models/responses.js');

var whichPoll = {};

module.exports = {
	setPoll: function(userid, poll) {
		if (poll != 0) {
			whichPoll[userid] = poll;
		} else {
			return whichPoll[userid];
		}
	},
	getPoll: function(myPoll, res) {
		Polls
			.findById(myPoll, function (err, poll){
				if (err) throw err;
				res.send(poll);		// poll object
			});
	},
	addResponse: function(req, res) {
		var newResponse = Responses({	/*global Responses (responses.js)*/
			responseText: req.query.q,
			createdById: req.query.z
		});
		newResponse.save( function(err) {
			if (err) throw err;
			Polls
				.findById(req.query.a, function (err, poll) {
					if (err) throw err;
					poll.responses.push(newResponse);
					poll.save(function(err) {
						if (err) throw err;
						res.send(newResponse);
					});
				});
		});
	},
	delResponse: function(req, res) {
		console.log(req.query);
		Polls
			.findById(req.query.p, function(err, poll) {
				if (err) throw err;
				for (var i = 0; i < poll['responses'].length; i++) {
					if (poll['responses'][i]['_id'] == req.query.a) {
						poll['responses'].splice(i, 1);
						poll.save();
					}
				}
				res.send(req.query.a);
			});
			
		/*Responses
			.findById(req.query.a).remove( function(err) {
				if (err) throw err;
				console.log('actually deleting');
				res.send(req.query.a);
			});*/
			
	},
	addVote: function (req, res) {
		Polls
			.findById(req.query.p, function(err, poll) {
				for (var i = 0; i < poll['responses'].length; i++) {
			   		for (var j = 0; j < poll['responses'][i]['votes'].length; j++ ) {
			   			if (req.query.z == poll['responses'][i]['votes'][j]) {
			   				poll['responses'][i]['votes'].splice(j, 1);
							poll.save();
			   			}
			   		}
			   		if (poll['responses'][i]['_id'] == req.query.a) {
			   			poll['responses'][i]['votes'].push(req.query.z);
			   			poll.save();
			   		}
			   } 
			});
		res.send(req.query.a);
	}
	
};
