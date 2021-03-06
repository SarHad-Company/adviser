var helpers = require('./helpers.js'); // our custom middleware
var utils = require('./utils.js');
var jordanPlaceController = require('../jordanPlace/jordanPlaceController.js');
var destinationController= require('../destination/destinationController.js');
var packageController= require('../package/packageController.js');
var enquiryController = require('../enquiry/enquiryController.js');
var agentController = require('../agent/agentController.js');
var linkController = require('../link/linkController.js');
module.exports = function (app, express) {

// jordanPlace api
app.get('/api/jordanPlace/placeInfo/:id',jordanPlaceController.placeInfo);
app.post('/api/jordanPlace',jordanPlaceController.createNewJordanPlace);
app.get('/api/jordanPlace/allPlaces',jordanPlaceController.getAllPlaces);
app.put('/api/jordanPlace/updatePlace/:id', jordanPlaceController.updatePlace);
app.delete('/api/jordanPlace/deletePlace/:id', jordanPlaceController.deletePlace);

// package api 
app.get('/api/package/allPackages/:type', packageController.getPackagesDependonType);
app.post('/api/package', packageController.createNewPackage);
app.get('/api/package/packageInfo/:id', packageController.packageInfo);
app.post('/api/package/addEnquiry', enquiryController.createNewEnquiry);
app.put('/api/package/packageUpdate/:id', packageController.updatePackage);
app.put('/api/package/deletePhoto', packageController.deleteMainPhoto);
app.delete('/api/package/deletePackage/:id', packageController.deletePackage);

// destination api
app.post('/api/addDestination', destinationController.createNewDestination);
app.get('/api/destination', destinationController.getAllDestination);
app.get('/api/destination/destinationInfo/:id', destinationController.destinationInfo);
app.put('/api/destination/updateDestination/:id', destinationController.updateDestination);
app.delete('/api/destination/deleteDestination/:id', destinationController.deleteDestination);

// agent api
app.post('/api/addAgent', agentController.createNewAgent);
app.get('/api/agent', agentController.getAllAgents);
app.get('/api/agent/agentInfo/:id', agentController.agentInfo);
app.delete('/api/agent/deleteAgent/:id', agentController.deleteAgent);
app.put('/api/agent/updateAgent/:id', agentController.updateAgent);
app.post('/api/agent/signIn', agentController.signIn);

// link api
app.post('/api/link/newLink', linkController.newLink);
app.get('/api/link/linkInfo/:linkName', linkController.linkInfo);

// upload an image 
app.post('/api/upload',utils.uploadImg);
app.post('/api/sendMail', utils.voucherEmail);
app.post('/api/sendConfirmMail', utils.confirmEmail);

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
app.use(helpers.errorLogger);
app.use(helpers.errorHandler);
};

