angular.module('adviser.jordanPlaceCms', [])

.controller('jordanPlaceCmsController', function ($scope, $window, $routeParams, Jordan, $location, Package, Upload) {
  // Your code here

  $scope.data = {};
  var place = {};
  $("#mainPhoto").hide();

  var inite = function () {
    Jordan.getPlaces()
      .then(function (place) {
        $scope.data = place;
        console.log($scope.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  inite();

  // get jordanPlace info
  var getJordanPlace= function (){
    Jordan.getPlaceInfo($routeParams.id)
    .then(function (place){
      $scope.placeName = place.placeName;
      $scope.tinymceModel = place.description;
      $scope.mainfile = place.mainPhoto;
      $scope.photos = place.photos;
       
    })
    .catch(function (error){
      throw error;
    })
  };

  getJordanPlace();

  //update jordanPlace
  $scope.updatePlace= function (){
    if ($scope.placeName == undefined || $scope.placeName == "" || $scope.mainfile == undefined || $scope.photos.length === 0 ){
      $('#myModal5').modal();
    }
    else{
      place.placeName = $scope.placeName;
      place.description = $scope.tinymceModel;
      place.mainPhoto = $scope.mainfile;
      place.photos = $scope.photos;
      Jordan.updatePlace($routeParams.id, place)
      .then(function (place){
        alert("place is updated");
      })
      .catch(function (error){
        alert(error);
      })
    }
  };

  $scope.uploadMain= function(file){
     Upload.upload({
            url: '/api/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        })
    .then(function(resp){
      if(resp.data.error_code===0){
        $scope.mainfile = '../../uploads/'+resp.data.file.filename;
        $("#mainPhoto").hide();
        $("#removePhoto").show();
      }else{
        $window.alert('An error occured!!!')
      }
    },function (resp) { //catch error
      $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
  };

  $scope.submitMain= function(){
    if($scope.mainfile){
      $scope.uploadMain($scope.mainfile);
    }
  };
  
  $scope.uploadFiles= function(){
    if($scope.files && $scope.files.length){
      for(var i=0; i<$scope.files.length; i++){
         Upload.upload({
            url: '/api/upload', //webAPI exposed to upload the file
            data:{file:$scope.files[i]} //pass file as data, should be user ng-model
        }).then(function(resp){
          if(resp.data.error_code===0){
            $scope.photo='../../uploads/'+resp.data.file.filename;
                    $scope.photos.push($scope.photo);
                    $("#photos").hide();

          }else{
            $window.alert('An error occured!!!');
          }
        },function (resp) { //catch error
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.progress1 = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
      }
    }
  }

  // delete Place
    $scope.deletePlace = function(){
    if (confirm("Are You Sure From Deleting This Place?!") == true) {  
      Jordan.deletePlace($routeParams.id)
      .then(function (place){
        console.log(place);
        Package.deletePhoto(place.data.mainPhoto);
          for (var i=0; i<place.data.photos.length; i++){
            Package.deletePhoto(place.data.photos[i]);
          }
          alert("Your Place is deleted");
          $location.path('cms/jordanPlaces');

      }).catch(function (error){
        alert("An Error Occured!!");
      });
      } 
  }

  // delete main photo
  $scope.deleteMainPhoto = function (){
    Package.deletePhoto($scope.mainfile)
    .then(function (data){
      alert("photo is deleted");
      $("#mainPhoto").show();
      $("#removePhoto").hide();
      delete $scope.mainfile;
    }).catch(function (error){
      alert("An Error Occured!!");
      delete $scope.mainfile;
      $("#mainPhoto").show();
      $("#removePhoto").hide();
    });
  };

  // delete photo from photos 
  $scope.deletePhoto = function (f){
    var index = $scope.photos.indexOf(f);
    console.log(f)
    Package.deletePhoto(f)
    .then(function (data){
      console.log(data);
      alert("photo is deleted");
      delete $scope.photos[index];
      $scope.photos.splice(index,1);

    }).catch(function (error){
      console.log(error);
      alert("An Error Occured!!");
        $scope.photos.splice(index,1);
    });
  
  }

  
  
  $scope.tinymceOptions = {
   height: 400,
  plugins: [
    "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
    "table contextmenu directionality emoticons template textcolor paste textcolor colorpicker textpattern"
  ],

  toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
  toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor | table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",

  menubar: false,
  toolbar_items_size: 'small',

  style_formats: [{
    title: 'Bold text',
    inline: 'b'
  }, {
    title: 'Red text',
    inline: 'span',
    styles: {
      color: '#ff0000'
    }
  }, {
    title: 'Red header',
    block: 'h1',
    styles: {
      color: '#ff0000'
    }
  }, {
    title: 'Example 1',
    inline: 'span',
    classes: 'example1'
  }, {
    title: 'Example 2',
    inline: 'span',
    classes: 'example2'
  }, {
    title: 'Table styles'
  }, {
    title: 'Table row 1',
    selector: 'tr',
    classes: 'tablerow1'
  }]
  };

  });
