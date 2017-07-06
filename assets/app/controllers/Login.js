//Funcion utils
// duplicada de util.js
// rigel 02/07/2017
function gup(name) {
	var searchString = window.location.search.substring(1);
	var variableArray = searchString.split('&');
	var results = [];
	var result = "";
	for (var i = 0; i < variableArray.length; i++) {
		var keyValuePair = variableArray[i].split('=');
		if (keyValuePair[0] == name) {
			results.push(decodeURIComponent(keyValuePair[1]).replace("+", " "));
		}
	}
	if (results.length == 1) {
		return results[0];
	} else if (results.length > 1) {
		result = results;
	}
	return result;
}

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
	$scope.joinus = function(){
		//PortalApp.setLovalVar("customer", null);
		$scope.pageUrl = "./scheduler/joinus.html";
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
		$http.post(PortalApp.serviceUrl+"/../mobile/api/login?email="+user+
			"&password="+password+"&company="+gup('id')).then(function(rep){
			var customer = PortalApp.parseRequest(rep.data);
			customer.password = password;
			PortalApp.setLovalVar("customer",customer);
			$scope.pageUrl = "./scheduler/schedules.html";
		}, function(){
			alert("E-mail ou senha invalidos!");
		});
	};
}]);