var Link = require('./linkModel.js');

var repsonseHandler = require('../config/helpers.js').repsonseHandler;

module.exports = {
	// createNewLink: function (req, res, next) {
	// 	var linkName = req.body.linkName;
	// 	var description = req.body.description;
	// 	var newLink = new Link({
	// 		linkName: linkName,
	// 		description: description
	// 	});
	// 	newLink.save(function (err, link) {
	// 		repsonseHandler(err, req, res, {status: 201, returnObj: link}, next);
	// 	});
	// },

	newLink: function (req, res, next) {
		Link.findOne({linkName: req.body.linkName}, function (err,link) {
			if (!link || err){
				var linkName = req.body.linkName;
				var description = req.body.description;
				var newLink = new Link({
					linkName: linkName,
					description: description
				});
				newLink.save(function (error, newL) {
					repsonseHandler(error, req, res, {status: 201, returnObj: newL}, next);
				});

			}else{
				link.description = req.body.description;
				link.save(function (error, savedLink) {
					repsonseHandler(error, req, res, {status: 201, returnObj: savedLink}, next);
				});

			}
		});
	},
	linkInfo: function (req, res, next) {
		Link.findOne({linkName: req.params.linkName}, function (err,link) {
			repsonseHandler(err, req, res, {status: 201, returnObj: link}, next);
		});
	}

	// deleteDestination: function(req, res, next) {
	// 	var destinationId = req.params.id; 
	// 	Destination.findOneAndRemove({_id: destinationId}, function (err, destination) {
	// 		repsonseHandler(err, req, res, {status: 201, returnObj: destination}, next);
	// 	});
	// },

	// getAllDestination: function (req, res, next) {
	// 	Destination.find({})
	// 	.exec(function (err, destinations) {
	// 		repsonseHandler(err, req, res, {status: 201, returnObj: destinations}, next);
	// 	});
	// },

	// updateDestination: function (req, res, next) {
	// 	var destination = req.body;
	// 	Destination.findOne({_id: req.params.id})
	// 	.exec(function (err, destinationOne) {	
	// 		destinationOne.destinationName = destination.destinationName;
	// 		destinationOne.mainPhoto = destination.mainPhoto;
	// 		destinationOne.mapPhoto  = destination.mapPhoto;
	// 		destinationOne.description = destination.description;
	// 		destinationOne.photos = destination.photos;
	// 		destinationOne.save(function (err, savedDestination) {
	// 			repsonseHandler(err, req, res, {status: 201, returnObj: savedDestination}, next);
	// 		});
	// 	});			
	// }
			
};