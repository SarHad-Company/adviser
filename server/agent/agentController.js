var Agent = require('./agentModel.js');
var bcrypt = require('bcrypt-nodejs');
var repsonseHandler = require('../config/helpers.js').repsonseHandler;

module.exports = {
	createNewAgent: function (req, res, next) {
		var agency = req.body.agency;
		var userName = req.body.userName;
		var password = req.body.password;
		var email = req.body.email;
		var phone = req.body.phone;
		var newAgent = new Agent({
			agency: agency,
			userName: userName,
			password: password,
			email: email,
			phone: phone
		});
		newAgent.save(function (err, agent) {
			repsonseHandler(err, req, res, {status: 201, returnObj: agent}, next);
		});
	},

	agentInfo: function (req, res, next) {
		var id = req.params.id;
		Agent.findOne({_id: id}, function (err,agent) {
			repsonseHandler(err, req, res, {status: 201, returnObj: agent}, next);
		});
	},

	deleteAgent: function(req, res, next) {
		var id = req.params.id; 
		Agent.findOneAndRemove({_id: id}, function (err, agent) {
			repsonseHandler(err, req, res, {status: 201, returnObj: agent}, next);
		});
	},

	getAllAgents: function (req, res, next) {
		Agent.find({})
		.exec(function (err, agents) {
			repsonseHandler(err, req, res, {status: 201, returnObj: agents}, next);
		});
	},

	updateAgent: function (req, res, next) {
		var agent = req.body;
		Agent.findOne({_id: req.params.id})
		.exec(function (err, agentOne) {	
			agentOne.agency = agent.agency;
			agentOne.userName = agent.userName;
			agentOne.password = agent.password;
			agentOne.email = agent.email;
			agentOne.phone = agent.phone;
			agentOne.save(function (err, savedAgent) {
				repsonseHandler(err, req, res, {status: 201, returnObj: savedAgent}, next);
			});
		});			
	},

	agentInfoByUserName: function (req, res, next) {
		Agent.findOne({userName: req.params.userName}, function (err,agent) {
			repsonseHandler(err, req, res, {status: 201, returnObj: agent}, next);
		});
	},

	signIn: function (req, res, next) {
		Agent.findOne({userName: req.body.userName}, function (error,agent) {
			if (error || !agent){
					repsonseHandler(error, req, res, {status: 201, returnObj: {isMatch: "no user"}}, next);
			}else{
			  bcrypt.compare(req.body.password, agent.password, function (err, isMatch) {
					repsonseHandler(err, req, res, {status: 201, returnObj: {isMatch: isMatch}}, next);
				});
			}
		});
	} 

};