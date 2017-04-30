var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

 //creating Link Model
var linkSchema = new mongoose.Schema({
	linkName: {type: String},
	description: {type: String}
	
});

linkSchema.plugin(autoIncrement.plugin,{model: 'Link',startAt: 1});
var Link = mongoose.model('Link', linkSchema);
module.exports = Link;