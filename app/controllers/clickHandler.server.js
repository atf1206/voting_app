'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function ClickHandler () {

	this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				
				res.json(result.nbrClicks);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
				if (err) { throw err; }
				
				res.json(result.nbrClicks);
			});
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
				if (err) { throw err; }
				
				res.json(result.nbrClicks);
			});
	};
	
	this.addQuestion = function (req, res) {
		console.log(req.query.q);
		var newQuestion = Polls({			/*global Polls (polls.js)*/
			question: req.query.q
		});
		
		newQuestion.save( function(err) {
			if (err) throw err;
			console.log('User created!');
		});
		res.send(newQuestion.question);
	};
	
	this.getQuestions = function (req, res) {
		Polls
			.find({}, function(err, polls) {
				if (err) throw err;
				res.send(polls);	// object of all the users
			});
	};
	
	/*
	var now = new Date()
	var time = now.getTime()
	*/
}

module.exports = ClickHandler;
