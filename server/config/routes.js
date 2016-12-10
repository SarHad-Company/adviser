var helpers = require('./helpers.js'); // our custom middleware
var utils = require('./utils.js');
var jordanController = require('../jordan/jordanController.js');
var jordanPlaceController = require('../jordanPlace/jordanPlaceController.js');
module.exports = function (app, express) {

// jordan api 
app.get('/api/jordan',jordanController.jordanInfo);
app.post('/api/jordan',jordanController.createJordan);
// jordanPlace api
app.get('/api/jordanPlace',jordanPlaceController.placeInfo);
app.post('/api/jordanPlace',jordanPlaceController.createNewJordanPlace);

// upload an image 
app.post('/api/upload',utils.uploadImg)
  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

