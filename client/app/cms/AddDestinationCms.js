angular.module('adviser.addDestinationCms', [])
.controller('addDestinationCmsController', function($scope, $window, Destination){

	$scope.data= {};
	$scope.destination= {};
	var photos= [];

	$scope.addDestination= function(){
		$scope.destination.destinationName= $scope.destinationName;
		$scope.destination.description= $scope.tinymceModel;
		$scope.destination.mainPhoto= $scope.mainfile;
		$scope.destination.mapPhoto= $scope.mapfile;
		$scope.destination.photos= photos;
		Destination.addDestination($scope.destination)
		.then(function(destination){
			console.log(destination);
			alert("destination is created");
		})
		.catch(function(error){
			throw error;
			alert(error);
		});
	};

	$scope.uploadMain= function(file){
		Destination.uploadPicture(file)
		.then(function(resp){
			if(resp.data.error_code===0){
				$scope.mainfile= '../../uploads/'+resp.data.file.filename;
			}else{
				$window.alert('An error occured!!!')
			}
		},function (resp) { //catch error
			$window.alert('Error status: ' + resp.status);
        });
	};

	$scope.submitMain= function(){
		if($scope.mainfile){
			$scope.uploadMain($scope.mainfile);
		}
	};

	$scope.uploadMap= function(file){
		Destination.uploadPicture(file)
		.then(function(resp){
			if(resp.data.error_code===0){
				$scope.mapfile= '../../uploads/'+resp.data.file.filename;
			}else{
				$window.alert('An error occured!!!')
			}
		},function (resp) { //catch error
			$window.alert('Error status: ' + resp.status);
        });
	};

	$scope.submitMap= function(){
		if($scope.mapfile){
			$scope.uploadMap($scope.mapfile);
		}
	};

	$scope.uploadFiles= function(){
		if($scope.files && $scope.files.length){
			for(var i=0; i<$scope.files.length; i++){
				Destination.uploadPicture($scope.files[i])
				.then(function(resp){
					if(resp.data.error_code===0){
						$scope.photo='../../uploads/'+resp.data.file.filename;
                		photos.push($scope.photo);
					}else{
						$window.alert('An error occured!!!');
					}
				},function (resp) { //catch error
            		$window.alert('Error status: ' + resp.status);
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