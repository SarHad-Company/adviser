var Enquiry = require('./enquiryModel.js');

var repsonseHandler = require('../config/helpers.js').repsonseHandler;

module.exports = {
	createNewEnquiry: function (req, res, next) {
		console.log(req.body);
		var enquiry = req.body		
		var newEnquiry = new Enquiry({
			checkin: enquiry.checkin,
			checkout: enquiry.checkout,
			room: enquiry.room,
			hotelType: enquiry.hotelType,
			city: enquiry.city,
			country: enquiry.country,
			mobile: enquiry.mobile,
			email: enquiry.email,
			totalCost: enquiry.totalCost,
			passengers: enquiry.passengers,
			package: enquiry.packageId,
			arrivalInfo: enquiry.arrivalInfo,
			departureInfo: enquiry.departureInfo,
			cost: enquiry.cost,
			adults: enquiry.adults,
			children: enquiry.children,
			pax: enquiry.pax,
			packageName: enquiry.packageName
		});
		newEnquiry.save(function (err, enquiry) {
			repsonseHandler(err, req, res, {status: 201, returnObj: enquiry}, next);
		});
	},

	enquiryInfo: function (req, res, next) {
		Enquiry.findOne({_id: req.params.id}, function (err,enquiry) {
			repsonseHandler(err, req, res, {status: 201, returnObj: enquiry}, next);
		});
	},

	getAllEnquiry: function (req, res, next) {
		Enquiry.find({})
		.exec(function (err, enquiries) {
			repsonseHandler(err, req, res, {status: 201, returnObj: enquiries}, next);
		})
	},

	getEnquiryDependonPackage: function (req, res, next) {
		Enquiry.find({package: req.params.id}, function (err, enquiries) {
			repsonseHandler(err, req, res, {status: 201, returnObj: enquiries}, next);
		});
	},

	addPassengerToEnquiry: function(req, res, next) {
		var enquiryId = req.params.id.toString(); 
		var passengerId = req.body.dashboardId.toString();
		Enquiry.findOne({_id: enquiryId})
		.exec(function(err, enquiry) {
			if (enquiry.passengers.indexOf(passengerId) === -1) {
				enquiry.passengers.push(passengerId);
			}
			Enquiry.save( function(err, enquiry) {
				repsonseHandler(err, req, res, {status: 201, returnObj: enquiry}, next);
			});
		});
	}

};