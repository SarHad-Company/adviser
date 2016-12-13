angular.module('adviser', [
  'adviser.services',
  'adviser.jordan',
  'adviser.jordanPlace',

  'adviser.cms',
  'adviser.jordanPlaceCms',

  'adviser.destinationCms',
  'adviser.destination',

  'ngFileUpload',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
  .when('/jordan', {
    templateUrl: 'app/jordan/jordan.html',
    controller: 'jordanController'
    })
  .when('/jordanPlace', {
      templateUrl: 'app/jordanPlace/jordanPlace.html',
      controller: 'jordanPlaceController'
    })
  .when('/jordan/:id', {
      templateUrl: 'app/jordanPlace/jordanPlace.html',
      controller: 'jordanPlaceController'
    })
  .when('/cms', {
      templateUrl: 'app/cms/login.html',
      controller: 'cmsController'
    })
  .when('/cms/dashboard', {
      templateUrl: 'app/cms/table.html'
      // controller: 'tableController'
    })
  .when('/cms/jordanPlaces', {
      templateUrl: 'app/cms/jordanPlaceCms.html',
      controller: 'jordanPlaceCmsController'
    })
  .when('/addDestination', {
    templateUrl: 'app/cms/destination/distinationCms.html',
    controller: 'destinationCmsController'
  })
  .when('/destinations', {
    templateUrl: 'app/destination/destination.html',
    controller: 'destinationController'
  })
  ;

    
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.adviser');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
