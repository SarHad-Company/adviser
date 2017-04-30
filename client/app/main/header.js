angular.module('adviser.header',[])
.controller('headerController', function($scope, Destination, Package){

	var getAllDestinations= function(){
		Destination.getAllDestinations()
		.then(function(destinations){
			$scope.destinations= destinations;
			console.log($scope.destinations);
		}).catch(function(error){
			throw error;
			console.log(error);
		});
	};
	getAllDestinations();

	var getTerms= function(){
		Destination.getTerms('terms & conditions')
		.then(function(terms){
			$("#terms").html(terms.description);
		}).catch(function(error){
			console.log(error);
		});
	};

	var getPolicy= function(){
		Destination.getTerms('policy')
		.then(function(policy){
			$("#policy").html(policy.description);
		}).catch(function(error){
			console.log(error);
		});
	};




	getTerms();
	getPolicy();


});

