var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

 //creating agent Model
var agentSchema = new mongoose.Schema({
	agency: {type: String, required: true},
	userName: {type: String},
	password: {type: String},
	email: {type: String},
	phone: {type: String},
	salt: {type: String}	
});

// agentSchema.methods.comparePasswords = function (candidatePassword) {
//   var savedPassword = this.password;
// 	return bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
// 	  if (err) {
// 	  	console.log(err);
// 	    return err;
// 	  } else {
// 	  	console.log(isMatch);
// 	    return isMatch;
// 	  }
// 	});
// };

agentSchema.pre('save', function (next) {
  var agent = this;

  // only hash the password if it has been modified (or is new)
  if (!agent.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(agent.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      agent.password = hash;
      agent.salt = salt;
      next();
    });
  });
});

agentSchema.plugin(autoIncrement.plugin,{model: 'Agent',startAt: 1});
var Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;