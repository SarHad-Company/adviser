angular.module('adviser.services', [])

.factory('Jordan', function ($http, Upload) {
 var getJordanInfo = function () {
    return $http({
      method: 'GET',
      url: '/api/jordan'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addPlace = function (place) {
    return $http({
      method: 'POST',
      url: '/api/jordanPlace',
      data: place
    });
  };

  var addJordanInfo = function (place) {
    return $http({
      method: 'POST',
      url: '/api/jordan',
      data: place
    });
  };

  var getPlaceInfo = function (id) {
    return $http({
      method: 'GET',
      url: '/api/jordanPlace/placeInfo/'+id
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var uploadPicture = function (file) {//upload an image to the game
    return Upload.upload({
          url: '/api/upload', //webAPI exposed to upload the file
          data:{file:file} //pass file as data, should be user ng-model
      }).then(function (resp) {
          return resp;
    });
  };

  var getPlaces = function () {
    return $http({
      method: 'GET',
      url: '/api/jordanPlace/allPlaces'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getJordanInfo: getJordanInfo,
    addPlace : addPlace,
    getPlaceInfo : getPlaceInfo,
    uploadPicture : uploadPicture,
    getPlaces : getPlaces,
    addJordanInfo: addJordanInfo
  };


  })
.factory('Destination', function($http,Upload){

  var addDestination = function (destination) {
    return $http({
      method: 'POST',
      url: '/api/addDestination',
      data: destination
    });
  };

  var uploadPicture = function (file) {//upload an image to the game
    return Upload.upload({
          url: '/api/upload', //webAPI exposed to upload the file
          data:{file:file} //pass file as data, should be user ng-model
      }).then(function (resp) {
          return resp;
    });
  };

  var getAllDestinations = function () {
    return $http({
      method: 'GET',
      url: '/api/destination'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getDestinationInfo = function (id) {
    return $http({
      method: 'GET',
      url: '/api/destination/destinationInfo/'+id
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return{
    addDestination: addDestination,
    uploadPicture: uploadPicture,
    getAllDestinations: getAllDestinations,
    getDestinationInfo: getDestinationInfo
  };

})
.factory('Package', function ($http) {

  var addNewPackage = function (package) {
    return $http({
      method: 'POST',
      url: '/api/package',
      data: package
    });
  };

  var getPackages = function (type) {
    return $http({
      method: 'GET',
      url: '/api/package/allPackages/'+type
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getPackage = function (id) {
    return $http({
      method: 'GET',
      url: '/api/package/packageInfo/'+id
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addEnquiry = function (enquiry) {
    return $http({
      method: 'POST',
      url: '/api/package/addEnquiry',
      data: enquiry
    });
  };

  var updatePackage = function (id, package) {
      return $http({
        method: 'PUT',
        url: '/api/package/packageUpdate/' + id,
        data: package
      });
    };

  var deletePhoto = function (photo) {
    console.log("service", photo)
      return $http({
        method: 'PUT',
        url: '/api/package/deletePhoto',
        data: {photo: photo}
      });
    };

  var deletePackage = function (id) {
      return $http({
        method: 'DELETE',
        url: '/api/package/deletePackage/' + id,
      });
    };

  return {
    getPackages: getPackages,
    addNewPackage: addNewPackage,
    getPackage: getPackage,
    addEnquiry : addEnquiry,
    updatePackage: updatePackage,
    deletePhoto: deletePhoto,
    deletePackage: deletePackage

  };


  })
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.adviser');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.adviser');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
