var Package = require('./packageModel.js');
var fs = require('fs');

var repsonseHandler = require('../config/helpers.js').repsonseHandler;

module.exports = {
	createNewPackage: function (req, res, next) {
		var package = req.body		
		var newPackage = new Package({
			packageName: package.packageName,
			outline: package.outline,
			description: package.description,
			mainPhoto: package.mainPhoto,
			photos: package.photos,
			parentDestination: package.parentDestination,
			destination: package.destination,
			type: package.type,
			itinerary: package.itinerary,
			include: package.include,
			exclude: package.exclude,
			places: package.places,
			days: package.days,
			nights: package.nights,
			price: package.price,
			threeStarHotels: package.threeStarHotels,
			fourStarHotels: package.fourStarHotels,
			fiveStarHotels: package.fiveStarHotels,
			startAvailableDate: package.startAvailableDate,
			endAvailableDate: package.endAvailableDate,
			childPrice: package.childPrice,
			sglthree: package.sglthree,
			sglfour: package.sglfour,
			sglfourb: package.sglfourb,
			sglfive: package.sglfive,
			dblthree: package.dblthree,
			dblfour: package.dblfour,
			dblfourb: package.dblfourb,
			dblfive: package.dblfive,
			trblthree: package.trblthree,
			trblfour: package.trblfour,
			trblfourb: package.trblfourb,
			trblfive: package.trblfive,
			status: package.status
		});
		newPackage.save(function (err, package) {
			repsonseHandler(err, req, res, {status: 201, returnObj: package}, next);
		});
	},

	packageInfo: function (req, res, next) {
		Package.findOne({_id: req.params.id}, function (err,package) {
			repsonseHandler(err, req, res, {status: 201, returnObj: package}, next);
		});
	},

	deletePackage: function(req, res, next) {
		Package.findOneAndRemove({_id: req.params.id}, function (err, package) {
			repsonseHandler(err, req, res, {status: 201, returnObj: package}, next);
		});
	},

	getAllPackages: function (req, res, next) {
		Package.find({})
		.exec(function (err, packages) {
			repsonseHandler(err, req, res, {status: 201, returnObj: packages}, next);
		})
	},

	getPackagesDependonType: function (req, res, next) {
		Package.find({type: req.params.type}, function (err,packages) {
			repsonseHandler(err, req, res, {status: 201, returnObj: packages}, next);
		});
	},

	updatePackage: function (req, res, next) {
		var package = req.body;
		Package.findOne({_id: req.params.id})
		.exec(function (err, packageOne) {
			packageOne.packageName = package.packageName;
			packageOne.outline = package.outline;
			packageOne.description = package.description;
			packageOne.mainPhoto = package.mainPhoto;
			packageOne.photos = package.photos;
			packageOne.parentDestination = package.parentDestination;
			packageOne.destination = package.destination;
			packageOne.type = package.type;
			packageOne.itinerary = package.itinerary;
			packageOne.include = package.include;
			packageOne.exclude = package.exclude;
			packageOne.places = package.places;
			packageOne.days = package.days;
			packageOne.nights = package.nights;
			packageOne.price = package.price;
			packageOne.threeStarHotels = package.threeStarHotels;
			packageOne.fourStarHotels = package.fourStarHotels;
			packageOne.fiveStarHotels = package.fiveStarHotels;
			packageOne.startAvailableDate = package.startAvailableDate;
			packageOne.endAvailableDate = package.endAvailableDate;
			packageOne.childPrice = package.childPrice;
			packageOne.sglthree = package.sglthree;
			packageOne.sglfour = package.sglfour;
			packageOne.sglfourb = package.sglfourb;
			packageOne.sglfive = package.sglfive;
			packageOne.dblthree = package.dblthree;
			packageOne.dblfour = package.dblfour;
			packageOne.dblfourb = package.dblfourb;
			packageOne.dblfive = package.dblfive;
			packageOne.trblthree = package.trblthree;
			packageOne.trblfour = package.trblfour;
			packageOne.trblfourb = package.trblfourb;
			packageOne.trblfive = package.trblfive;
			packageOne.status = package.status;
			packageOne.save(function (err, savedPackage) {
				repsonseHandler(err, req, res, {status: 201, returnObj: savedPackage}, next);
			});
		});			
	},

	deleteMainPhoto: function (req, res, next) {
		console.log(req.body)
		    var photo = req.body.photo;
			var array = photo.split("/");		
		    fs.unlink("./client/uploads/"+array[3], function(err, photo) {
				repsonseHandler(err, req, res, {status: 201, returnObj: {photo:photo}}, next);
		    });


    }

};