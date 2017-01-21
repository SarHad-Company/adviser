angular.module('adviser.destinationCms', [])
.controller('destinationCmsController', function($scope, $window, Package, Destination, $routeParams, $location, Upload){

	$scope.data= {};
	var destination={};
	$scope.photos= [];
	$("#mainPhoto").hide();
	$("#mapPhoto").hide();

	var getAllDestination= function(){
		Destination.getAllDestinations()
		.then(function(destinations){
			$scope.data= destinations;
		}).catch(function(error){
			throw error;
			console.log(error);
		});
	};
	getAllDestination();

	//get Destination information for updating
	var getDestination= function(){
		Destination.getDestinationInfo($routeParams.id)
		.then(function(destination){
		$scope.destinationName = destination.destinationName;
		$scope.tinymceModel = destination.description;
		$scope.mainfile = destination.mainPhoto;
		$scope.mapfile = destination.mapPhoto;
		$scope.photos = destination.photos;
		})
		.catch(function(error){
			throw error;
		});
	    
	};

	getDestination();

	//update destination info
	$scope.updateDestinationInfo = function(){
		if ($scope.destinationName == undefined || $scope.destinationName == "" || $scope.mainfile == undefined || $scope.mapfile == undefined|| $scope.photos.length === 0 ){
			$('#myModal3').modal();
		}
		else{
			destination.destinationName= $scope.destinationName;
			destination.description= $scope.tinymceModel;
			destination.mainPhoto= $scope.mainfile;
			destination.mapPhoto= $scope.mapfile;
			destination.photos= $scope.photos;
			Destination.updateDestination($routeParams.id, destination)
			.then(function(destination){
				alert('Your Destination Is updated successfully');
			})
			.catch(function(error){
				throw error;
				alert(error);
			});
	    }
	};

	$scope.uploadMain= function(file){
		 Upload.upload({
            url: '/api/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        })
		.then(function(resp){
			if(resp.data.error_code===0){
				$scope.mainfile= '../../uploads/'+resp.data.file.filename;
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

	$scope.uploadMap= function(file){
		Destination.uploadPicture(file)
		.then(function(resp){
			if(resp.data.error_code===0){
				$scope.mapfile= '../../uploads/'+resp.data.file.filename;
				$("#mapPhoto").hide();
				$("#removeMap").show();
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

	// delete Destination
		$scope.deleteDestination = function(){
		if (confirm("Are You Sure From Deleting This Destination?!") == true) {  
			Destination.deleteDestination($routeParams.id)
			.then(function (destination){
				console.log(destination);
				Package.deletePhoto(destination.data.mainPhoto);
				Package.deletePhoto(destination.data.mapPhoto);
					for (var i=0; i<destination.data.photos.length; i++){
						Package.deletePhoto(destination.data.photos[i]);
					}
					alert("Your Destination is deleted");
					$location.path('cms/destinations');

			}).catch(function (error){
				alert("An Error Occured!!");
			});
   		} 
	}

	// delete main photo
	$scope.deleteMainPhoto = function (){
		console.log($scope.mainfile)
		Package.deletePhoto($scope.mainfile)
		.then(function (data){
			console.log(data);
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

	//delete map Photo
	$scope.deleteMapPhoto = function (){
		console.log($scope.mapfile)
		Package.deletePhoto($scope.mapfile)
		.then(function (data){
			console.log(data);
			alert("photo is deleted");
			$("#mapPhoto").show();
			$("#removeMap").hide();
			delete $scope.mapfile;

		}).catch(function (error){
			alert("An Error Occured!!");
			delete $scope.mapfile;
			$("#mapPhoto").show();
			$("#removeMap").hide();
		});
	}

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