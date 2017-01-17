angular.module('adviser.addPackageCms', [])
.controller('addPackageCmsController', function($scope, $window, Package, Destination, Upload, $location){

	var package= {};
	$scope.photos= [];

	$scope.addPackage= function(){
		if ($scope.packageName == undefined || $scope.destination == undefined || $scope.outline == undefined|| $scope.type == undefined|| $scope.price == undefined|| $scope.childrenPrice == undefined || $scope.mainfile == undefined || $scope.photos.length === 0 ){
			$('#myModal').modal();
		}
		else{
			console.log($scope.packageName);
		package.packageName= $scope.packageName;
		package.description= $scope.tinymceModel;
		package.destination= $scope.destination;
		package.parentDestination= $scope.parentDestination;
		package.outline= $scope.outline;
		package.itinerary= $scope.itinerary;
		package.type= $scope.type;
		package.include= $scope.include;
		package.exclude=$scope.exclude;
		package.places= $scope.places;
		package.days= $scope.days;
		package.nights= $scope.nights;
		package.price= $scope.price;
		package.threeStarHotels= $scope.three;
		package.fourStarHotels= $scope.four;
		package.fiveStarHotels= $scope.five;
		package.startAvailableDate= $scope.startDate;
		package.endAvailableDate= $scope.endDate;
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
		Package.addNewPackage(package)
		.then(function(package){
			console.log(package);
			alert("package is created");
			$location.path("cms/packages/"+package.data.type);
		})
		.catch(function(error){
			alert("an error occured");
		});
	    };
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