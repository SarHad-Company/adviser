angular.module('adviser.addJordanPlaceCms', [])

.controller('addJordanPlaceCmsController', function ($scope, Jordan, $location) {
  // Your code here

  $scope.place={};
  $scope.photos=[];
  $("#wait").hide();
  $("#waitPhotos").hide();
  
  $scope.addJordanPlace= function (){
    if ($scope.placeName == undefined || $scope.picture == undefined || $scope.photos.length === 0 ){
      $('#myModal4').modal();
    }
    else{
      $scope.place.placeName=$scope.placeName;
      $scope.place.description = $scope.tinymceModel;
      $scope.place.mainPhoto = $scope.picture;
      $scope.place.photos = $scope.photos;
      Jordan.addPlace($scope.place)
      .then(function (place){
        alert("place is created");
        $location.path('cms/jordanPlaces');
      })
      .catch(function (error){
        alert(error);
      })
    }
  };

$scope.submit = function(){ //function to call on upload 
    if ($scope.file) { //check if file is loaded
        $scope.upload($scope.file); //call upload function
    }
}

$scope.upload = function(file) {//upload an image to the game
        $("#wait").show();
        Jordan.uploadPicture(file)
        .then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $scope.picture='../../uploads/'+resp.data.file.filename;
                $("#mainPhoto").hide();
                $('#wait').hide();
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
      $("#waitPhotos").show();
      if ($scope.files && $scope.files.length) {
        for (var i = 0; i < $scope.files.length; i++) {
          Jordan.uploadPicture($scope.files[i])
        .then(function (resp) {
               //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $scope.photo='../../uploads/'+resp.data.file.filename;
                $scope.photos.push($scope.photo);
                $("#photos").hide();
                    if($scope.photos.length === $scope.files.length){
                      $("#waitPhotos").hide();
                    }

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
 
  
   //  console.log($scope.tinymceModel.replace(/<[^>]*>/ig, ' ')
   // .replace(/<\/[^>]*>/ig, ' ')
   // .replace(/&nbsp;|&#160;/gi, ' ')
   // .replace(/\s+/ig, ' ')
   // .trim());
   // var te=tinyMCE.activeEditor.getBody().textContent;
   // console.log(te);
  
  });
