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
  places: {type: Number},//available day
  days: {type: Number},
  nights: {type: Number},
  price: {type: Number},
  threeStarHotels: {type: String},
  fourStarHotels: {type: String},
  fourStarBHotels: {type: String},
  fiveStarHotels: {type: String},
  startAvailableDate: {type: Date, default: Date.now},
  endAvailableDate: {type: Date, default: Date.now},
  notes: {type: String},
  mainPhoto: {type: String},
  photos: [String],
  childPrice: {type: Number, default: 0},
  sglthree: {type: Number, default: 0},
  sglfour: {type: Number, default: 0},
  sglfourb: {type: Number, default: 0},
  sglfive: {type: Number, default: 0},
  dblthree: {type: Number, default: 0},
  dblfour: {type: Number, default: 0},
  dblfourb: {type: Number, default: 0},
  dblfive: {type: Number, default: 0},
  trblthree: {type: Number, default: 0},
  trblfour: {type: Number, default: 0},
  trblfourb: {type: Number, default: 0},
  trblfive: {type: Number, default: 0},
  status : {type: String, default:"active"}, 
  highSeason1:{
    min: {type: String, default:'03-12' },
    max: {type: String, default: '05-27'}
  },
  highSeason2:{
    min: {type: String, default:'09-13' },
    max: {type: String, default: '11-14'}
  },
  highSeason3: {
    min: {type: String, default:'12-18' },
    max: {type: String, default:'12-31'}
  },
  highSeason4: {
    min: {type: String, default:'01-01' },
    max: {type: String, default:'01-06'}
  },
  highSublThree: {type: Number, default: 0},
  highSublFour: {type: Number, default: 0},
  highSublFourB: {type: Number, default: 0},
  highSublFive: {type: Number, default: 0}
});

packageSchema.plugin(autoIncrement.plugin,{model: 'Package',startAt: 1});
var Package = mongoose.model('Package', packageSchema);
module.exports = Package;