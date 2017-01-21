angular.module('adviser.jordan', [])
.controller('jordanController', function ($scope, Jordan, Destination) {
  var getJordan= function(){
    Destination.getAllDestinations()
    .then(function(destinations){
      for (var i=0 ; i<destinations.length ; i++){
        if (destinations[i].destinationName === "jordan" || destinations[i].destinationName === "Jordan" || destinations[i].destinationName === "JORDAN"){
          $scope.data = destinations[i];
          $("#dest").html(destinations[i].description);
        }
      }
    
    }).catch(function(error){
      alert("An Error Occured");
    });
  };

  var initePlaces = function () {
    Jordan.getPlaces()
      .then(function (places) {
        $scope.places = places;
        console.log(places);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  
  getJordan();
  initePlaces();
  });
