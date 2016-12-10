angular.module('adviser.jordan', [])

.controller('jordanController', function ($scope, Jordan) {
  // Your code here

  $scope.data = {};

  var inite = function () {
    Jordan.getJordanInfo()
      .then(function (jordan) {
        $scope.data = jordan;
        console.log($scope.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  inite();
  });
