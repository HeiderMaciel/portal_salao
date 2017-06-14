PortalApp.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
	$scope.cutomer = PortalApp.getLovalVar("customer");
	if($scope.cutomer){
		$scope.pageUrl = "./scheduler/schedules.html";
	}else{
		$scope.pageUrl = "./scheduler/login.html";
	}
	$scope.openSchelule = function(){
		$scope.pageUrl = "./scheduler/scheduler.html";
	};
	$scope.exit = function(){
		PortalApp.setLovalVar("customer", null);
		$scope.pageUrl = "./scheduler/login.html";
	};	
	$scope.openSchelules = function(){
		$scope.pageUrl = "./scheduler/schedules.html";
	};	
	$scope.login = function(user, password){
		if (user == undefined || user == "") {
			alert ("Por favor informe um email!");
			return
		}
		if (password == undefined || password == "") {
			alert ("Por favor informe uma senha!")
			return
		}
		$http.post(PortalApp.serviceUrl+"/../mobile/api/login?email="+user+"&password="+password).then(function(rep){
			var customer = PortalApp.parseRequest(rep.data);
			customer.password = password;
			PortalApp.setLovalVar("customer",customer);
			$scope.pageUrl = "./scheduler/schedules.html";
		}, function(){
			alert("E-mail ou senha invalidos!");
		});
	};
}]);