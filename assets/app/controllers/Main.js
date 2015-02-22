PortalApp.controller('MainController', ['$scope', '$http', function ($scope, $http) {

	$http.get(PortalApp.serviceUrl+"/cities").then(function(repose){
		$scope.cities = PortalApp.parseRequest(repose.data);
	});
}]);