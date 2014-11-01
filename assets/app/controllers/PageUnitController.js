PortalApp.controller('PageUnitController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

	$http.get(PortalApp.serviceUrl+"/unitByName?name="+$location.$$path.replace('/','')).then(function(repose){
		$scope.unit = PortalApp.parseRequest(repose.data);
	});
}]);