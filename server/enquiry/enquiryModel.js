var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');


 //creating Enquiry Model
var enquirySchema = new mongoose.Schema({
	checkin: {type: Date},
	checkout: {type: Date},
	passengers: [
		{firstName: {type: String, required: true},
		lastName: {type: String, required: true},
		passport: {type: String},
		birthDate: {type: Date, required: true}	,
		gender: {type: String} }
		 ],
	adults: {type: Number},
	children: {type: Number},
	pax: {type: Number},
	room: {
		single: {type: Number, default: 0},
		double: {type: Number, default: 0},
		triple: {type: Number, default: 0}
	},
	cost: {
		sgl: {type: Number, default: 0},
		dbl: {type: Number, default: 0},
		trbl: {type: Number, default: 0},
		childDiscount: {type: Number, default: 0},
		highSeasonCost: {type: Number, default: 0} 
	},
	hotelType: {type: String},
	city: {type: String},
	country: {type: String},
	mobile: {type: Number},
	email: {type: String},
	package:{type: Number},
	packageName: {type: String},
	totalCost: {type: Number},
	arrivalInfo: {
		flight: {type: String},
		port: {type: String},
		carrier: {type: String},
		flightNumber: {type: String},
		arrivalTime: {type: Date}		
	},
	departureInfo: {
		flight: {type: String},
		port: {type: String},
		carrier: {type: String},
		flightNumber: {type: String},
		departureTime: {type: Date}		
	},
	enquiryDate: {type: Date, default: Date.now}

});

enquirySchema.plugin(autoIncrement.plugin,{model: 'Enquiry',startAt: 1});
var Enquiry = mongoose.model('Enquiry', enquirySchema);
module.exports = Enquiry;