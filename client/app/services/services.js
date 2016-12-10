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

  var getPlaceInfo = function () {
    return $http({
      method: 'GET',
      url: '/api/jordanPlace'
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

  return {
    getJordanInfo: getJordanInfo,
    addPlace : addPlace,
    getPlaceInfo : getPlaceInfo,
    uploadPicture : uploadPicture  
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
