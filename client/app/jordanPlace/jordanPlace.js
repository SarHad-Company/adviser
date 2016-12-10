angular.module('adviser.jordanPlace', [])

.controller('jordanPlaceController', function ($scope, $route, $window, Jordan) {
  // Your code here

  $scope.data = {};
  $scope.place={};
  var photos=[];
  var inite = function () {
    Jordan.getPlaceInfo()
      .then(function (place) {
        $scope.data = place;
        console.log($scope.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
console.log("dddddd")
  $scope.addJordanPlace= function (){
    console.log("add")
    $scope.place.placeName=$scope.placeName;
    $scope.place.description = $scope.description;
    $scope.place.mainPhoto = $scope.picture;
    $scope.place.photos = photos;
    Jordan.addPlace($scope.place)
    .then(function (place){
      console.log(place);
    })
    .catch(function (error){
      console.error(error);
    })
  }

$scope.submit = function(){ //function to call on upload 
    if ($scope.file) { //check if file is loaded
        upload($scope.file); //call upload function
    }
}

var upload = function (file) {//upload an image to the game
        Jordan.uploadPicture(file)
        .then(function (resp) {
               console.log(resp,"placessss") //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $scope.picture='../../uploads/'+resp.data.file.filename;
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };


    $scope.uploadFiles = function () {
      if ($scope.files && $scope.files.length) {
        for (var i = 0; i < $scope.files.length; i++) {
          Jordan.uploadPicture($scope.files[i])
        .then(function (resp) {
               //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $scope.photo='../../uploads/'+resp.data.file.filename;
                photos.push($scope.photo);

            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            var progressPercentage1 = parseInt(100.0 * evt.loaded / evt.total);
            $scope.progress1 = 'progress: ' + progressPercentage1 + '% '; // capture upload progress
        });
        }
      }
    }
  
  });
