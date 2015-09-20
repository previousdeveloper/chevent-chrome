var chevent = angular.module("chevent",[
	'controllers'
]);

angular.module('controllers', [])
	   .controller('cheventctrl', ['$scope', '$http', function($scope, $http) {
		    $http.get("http://apifn.com/api/v1/events/")
		    .success(function(response) {
		    	$scope.events = response.item;
		    });


		    $scope.eventGo = function(slug){
			    chrome.tabs.create({url: slug});
     			return false;
			}
		}]);