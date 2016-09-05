'use strict';

//Queries are as follows:
//start with ?, separate with &
//q= text input
//p= poll id
//z= user id
//a= response id
//

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

var setPoll = require(path + '/app/controllers/pollHandler.server.js').setPoll;
var getPoll = require(path + '/app/controllers/pollHandler.server.js').getPoll;
var addResponse = require(path + '/app/controllers/pollHandler.server.js').addResponse;
var delResponse = require(path + '/app/controllers/pollHandler.server.js').delResponse;
var addVote = require(path + '/app/controllers/pollHandler.server.js').addVote;

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
		
	app.route('/api/:id/question')
		.get(isLoggedIn, clickHandler.addQuestion)
		.delete(isLoggedIn, clickHandler.deleteQuestion);
		
	app.route('/api/:id/allquestions')
		.get(isLoggedIn, clickHandler.getQuestions);
		
	app.route('/poll')
		.get(isLoggedIn, function (req, res) {
			var Id = req.query.z || null;	//not sure this is necessary
			setPoll(Id, req.query.q);	//stores user ID + poll-they-clicked before sending to poll page
			res.sendFile(path + '/public/poll.html');
		});
		
	app.route('/api/:id/editquestion')
		.get(isLoggedIn, function (req, res) {
			var Id = req.query.z; //|| null;
			var myPoll = setPoll(Id, 0);	//retrieves poll by user ID
			getPoll(myPoll, res);	//gets (and sends) the poll object to user
		});
		
	app.route('/api/:id/response')
		.get(isLoggedIn, function (req, res) {
			addResponse(req, res);
		})
		.delete(isLoggedIn, function (req, res) {
			delResponse(req, res);
		});
		
	app.route('/api/:id/vote')
		.get(isLoggedIn, function (req, res) {
			addVote(req, res);
		});
	
};
