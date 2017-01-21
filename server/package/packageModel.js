var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

 //creating Package Model
var packageSchema = new mongoose.Schema({
	packageName: {type: String, required: true},
	parentDestination: {type: String}, 
	destination: {type: String},
	type: {type: String},
	outline: {type: String},
	description: {type: String},
	itinerary: {type: String},
	include: {type: String},
	exclude: {type: String},
	places: {type: String},
	days: {type: Number},
	nights: {type: Number},
	price: {type: Number},
	threeStarHotels: {type: String},
	fourStarHotels: {type: String},
	fiveStarHotels: {type: String},
	startAvailableDate: {type: Date, default: Date.now},
	endAvailableDate: {type: Date, default: Date.now},
	notes: {type: String},
	mainPhoto: {type: String},
	photos: [String],
	childPrice: {type: Number},
	sglthree: {type: Number},
	sglfour: {type: Number},
	sglfourb: {type: Number},
	sglfive: {type: Number},
	dblthree: {type: Number},
	dblfour: {type: Number},
	dblfourb: {type: Number},
	dblfive: {type: Number},
	trblthree: {type: Number},
	trblfour: {type: Number},
	trblfourb: {type: Number},
	trblfive: {type: Number},
	status : {type: String, default:"active"}
});

packageSchema.plugin(autoIncrement.plugin,{model: 'Package',startAt: 1});
var Package = mongoose.model('Package', packageSchema);
module.exports = Package;