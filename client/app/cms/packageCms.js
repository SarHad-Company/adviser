angular.module('adviser.packageCms', [])
.controller('packageCmsController', function($scope, $routeParams, Package, Destination, Upload, $location){

	$scope.data= {};
	var package= {};
	$scope.photos= [];
	$("#mainPhoto").hide();

	var getAllPackages= function(){
		Package.getPackages($routeParams.type)
		.then(function(packages){
			$scope.data= packages;
		}).catch(function(error){
			throw error;
			alert(error);
		});
	};
	getAllPackages();

	var getAllDestination= function(){
		Destination.getAllDestinations()
		.then(function(destinations){
			$scope.destinations= destinations;
		}).catch(function(error){
			throw error;
			console.log(error);
		});
	};
	getAllDestination();

	// update package 
	var getPackageInfo= function(){
		Package.getPackage($routeParams.id)
		.then(function(package){
		console.log(package);
		$scope.packageName = package.packageName;
		$scope.tinymceModel = package.description;
		$scope.destination = package.destination;
		$scope.parentDestination = package.parentDestination;
		$scope.outline = package.outline;
		$scope.itinerary = package.itinerary;
		$scope.type = package.type;
		$scope.include = package.include;
		$scope.exclude = package.exclude;
		$('#availableDay').val(package.places);
		$scope.days = package.days;
		$scope.nights = package.nights;
		$scope.price = package.price;
		$scope.three = package.threeStarHotels;
		$scope.four = package.fourStarHotels;
		$scope.fourB = package.fourStarBHotels;
		$scope.five = package.fiveStarHotels;
		// $scope.startDate = package.startAvailableDate;
		// $scope.endDate = package.endAvailableDate;
		$scope.mainfile = package.mainPhoto;
		$scope.photos = package.photos;
		$scope.childrenPrice = package.childPrice;
		$scope.sglthree = package.sglthree;
		$scope.sglfour = package.sglfour;
		$scope.sglfourb = package.sglfourb;
		$scope.sglfive = package.sglfive;
		$scope.dblthree = package.dblthree;
		$scope.dblfour = package.dblfour;
		$scope.dblfourb = package.dblfourb;
		$scope.dblfive = package.dblfive;
		$scope.trblthree = package.trblthree;
		$scope.trblfour = package.trblfour;
		$scope.trblfourb = package.trblfourb;
		$scope.trblfive = package.trblfive;
        $("#status").val(package.status);
        $scope.highSublThree = package.highSublThree;
		$scope.highSublFour = package.highSublFour;
		$scope.highSublFourB = package.highSublFourB;
		$scope.highSublFive = package.highSublFive;
		}).catch(function(error){
			throw error;
		});
	};
	getPackageInfo();

	$scope.updatePackageInfo = function(){
		if ($scope.packageName == undefined || $scope.packageName == "" || $scope.destination == undefined || $scope.outline == undefined || $scope.outline == "" || $scope.type == undefined|| $scope.price == undefined|| $scope.childrenPrice == undefined || $scope.mainfile == undefined || $scope.photos.length === 0 ){
			$('#myModal1').modal();
		}
		else{
		package.packageName= $scope.packageName;
		package.description= $scope.tinymceModel;
		package.destination= $scope.destination;
		package.parentDestination= $scope.parentDestination;
		package.outline= $scope.outline;
		package.itinerary= $scope.itinerary;
		package.type= $scope.type;
		package.include= $scope.include;
		package.exclude=$scope.exclude;
		package.places= $('#availableDay').val();
		package.days= $scope.days;
		package.nights= $scope.nights;
		package.price= $scope.price;
		package.threeStarHotels= $scope.three;
		package.fourStarHotels= $scope.four;
		package.fourStarBHotels= $scope.fourB;
		package.fiveStarHotels= $scope.five;
		// package.startAvailableDate= $scope.startDate;
		// package.endAvailableDate= $scope.endDate;
		package.mainPhoto= $scope.mainfile;
		package.photos= $scope.photos;
		package.childPrice= $scope.childrenPrice;
		package.sglthree= $scope.sglthree;
		package.sglfour= $scope.sglfour;
		package.sglfourb= $scope.sglfourb;
		package.sglfive= $scope.sglfive;
		package.dblthree= $scope.dblthree;
		package.dblfour= $scope.dblfour;
		package.dblfourb= $scope.dblfourb;
		package.dblfive= $scope.dblfive;
		package.trblthree= $scope.trblthree;
		package.trblfour= $scope.trblfour;
		package.trblfourb= $scope.trblfourb;
		package.trblfive= $scope.trblfive;
		package.status= $("#status").val();
		package.highSublThree= $scope.highSublThree;
		package.highSublFour= $scope.highSublFour;
		package.highSublFourB= $scope.highSublFourB;
		package.highSublFive= $scope.highSublFive;
        console.log("update", package)
		Package.updatePackage($routeParams.id, package)
		.then(function (package) {
			console.log(package);
			alert ("You Update Your Package Successfully ");

		}).catch(function (error){
			alert("An Error Ocurred!!");
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

	// delete package
		$scope.deletePackage = function(){
		if (confirm("Are You Sure From Deleting This Package?!") == true) {  
			Package.deletePackage($routeParams.id)
			.then(function (package){
				console.log(package);
				Package.deletePhoto(package.data.mainPhoto)
					for (var i=0; i<package.data.photos.length; i++){
						Package.deletePhoto(package.data.photos[i]);
					}
					alert("Your Package is deleted");
					$location.path('cms/packages/'+package.data.type);

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
		height: 200,
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

