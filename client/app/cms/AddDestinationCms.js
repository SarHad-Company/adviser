angular.module('adviser.addDestinationCms', [])
.controller('addDestinationCmsController', function($scope, $window, Destination, $location){

	$scope.data= {};
	$scope.destination= {};
	$scope.photos= [];
	$("#wait").hide();
	$("#waitMap").hide();
	$("#waitPhotos").hide();


	$scope.addDestination= function(){
		if ($scope.destinationName == undefined || $scope.mainfile == undefined || $scope.mapfile == undefined|| $scope.photos.length === 0 ){
			$('#myModal2').modal();
		}
		else{
			$scope.destination.destinationName= $scope.destinationName;
			$scope.destination.description= $scope.tinymceModel;
			$scope.destination.mainPhoto= $scope.mainfile;
			$scope.destination.mapPhoto= $scope.mapfile;
			$scope.destination.photos= $scope.photos;
			Destination.addDestination($scope.destination)
			.then(function(destination){
				alert("destination is created");
				$location.path('cms/destinations');
			})
			.catch(function(error){
				throw error;
				alert(error);
			});
	    }
	};

	$scope.uploadMain= function(file){
		$("#wait").show();
		Destination.uploadPicture(file)
		.then(function(resp){
			if(resp.data.error_code===0){
				$scope.mainfile= '../../uploads/'+resp.data.file.filename;
				$("#mainPhoto").hide();
				$('#wait').hide();
			}else{
				$window.alert('An error occured!!!')
				console.log(resp)
			}
		},function (resp) { //catch error
			$window.alert('Error status: ' + resp.status);
			console.log(resp)
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

	$scope.uploadMap= function(file){
		$("#waitMap").show();
		Destination.uploadPicture(file)
		.then(function(resp){
			if(resp.data.error_code===0){
				$scope.mapfile= '../../uploads/'+resp.data.file.filename;
				$("#map").hide();
				$("#waitMap").hide();
			}else{
				$window.alert('An error occured!!!')
			}
		},function (resp) { //catch error
			$window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.progressMap = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
	};

	$scope.submitMap= function(){
		if($scope.mapfile){
			$scope.uploadMap($scope.mapfile);
		}
	};

	$scope.uploadFiles= function(){
		$("#waitPhotos").show();
		if($scope.files && $scope.files.length){
			for(var i=0; i<$scope.files.length; i++){
				Destination.uploadPicture($scope.files[i])
				.then(function(resp){
					if(resp.data.error_code===0){
						$scope.photo='../../uploads/'+resp.data.file.filename;
                		$scope.photos.push($scope.photo);
                		$("#photos").hide();
                		if($scope.photos.length === $scope.files.length){
                			console.log(i);
                			$("#waitPhotos").hide();
                		}
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