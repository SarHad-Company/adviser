angular.module('adviser.package', [])
.controller('packageController', function($scope, $routeParams, Package){
	$scope.currentPage = 1;
	$scope.pageSize = 6;
	$scope.data = [];

	var getAllPackages= function(){
		Package.getPackages($routeParams.type)
		.then(function(packages){
			for (var i=0; i<packages.length; i++){
				if (packages[i].status === "active"){
					$scope.data.push(packages[i]);				
				}	
			}
		}).catch(function(error){
			alert("an error occured");
		});
	};
	getAllPackages();

});