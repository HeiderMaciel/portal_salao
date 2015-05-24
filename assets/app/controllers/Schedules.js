PortalApp.controller('SchedulesController', ['$scope', '$http', function ($scope, $http) {
	$scope.customer = PortalApp.getLovalVar("customer");
	var start = encodeURIComponent(new Date().getDateBr());
	var end = encodeURIComponent(new Date().getNextMonth().getDateBr());
	$http.post(PortalApp.serviceUrl+"/../mobile/api/history?email="+$scope.customer.email+"&password="+$scope.customer.password+"&startDate="+start+"&endDate="+end).then(function(rep){
		$scope.history = PortalApp.parseRequest(rep.data);
		$scope.history = $scope.history.map(function(iten){
			iten.title = iten.title.split("<br/>")[1];
			iten.start = new Date(iten.start);
			iten.start_hour = iten.start.getHourBr();
			iten.start_date = iten.start.getDateBr();
			return iten;
		});
	});

}]);