angular.module('adviser.agentCms', [])

.controller('agentCmsController', function ($scope, $location, Agent, $routeParams) {

	$scope.agent={};
	var agent = {};
	$scope.addAgent= function(){
		if ($scope.agency !== undefined && $scope.userName !== undefined && $scope.password !== undefined){
			$scope.agent.agency= $scope.agency;
			$scope.agent.userName= $scope.userName;
			$scope.agent.password= $scope.password;
			$scope.agent.email= $scope.email;
			$scope.agent.phone= $scope.phone;
			Agent.addAgent($scope.agent)
			.then(function(agent){
				alert("agent is created");
				$location.path('cms/agents');
			})
			.catch(function(error){
				alert(error);
			});
		}
	};

	var getAllAgents = function(){
		Agent.getAgents()
		.then(function(agents){
			$scope.data= agents;
		}).catch(function(error){
			console.log(error);
		});
	};
	getAllAgents();

	var getAgent= function(){
			Agent.getAgentInfo($routeParams.id)
			.then(function(agent){
				$scope.agency = agent.agency;
				$scope.userName = agent.userName;
				$scope.password = agent.password;
				$scope.email = agent.email;
				$scope.phone = agent.phone;
			})
			.catch(function(error){
				console.log(error);
			});
	};

	getAgent();

	$scope.updateAgent= function(){
		if ($scope.agency !== undefined && $scope.userName !== undefined && $scope.password !== undefined){
			agent.agency= $scope.agency;
			agent.userName= $scope.userName;
			agent.password= $scope.password;
			agent.email= $scope.email;
			agent.phone= $scope.phone;
			Agent.updateAgent($routeParams.id, agent)
			.then(function(agent){
				alert("agent is Updated");
			})
			.catch(function(error){
				alert(error);
			});
		}
	};


});


