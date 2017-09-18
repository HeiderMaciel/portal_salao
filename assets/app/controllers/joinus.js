PortalApp.controller('JoinusController', ['$scope', '$http', function ($scope, $http) {
	//$scope.customer = PortalApp.getLovalVar("customer");
/*	var start = encodeURIComponent( (new Date()).getDateBr() );
	var end = encodeURIComponent( (new Date()).getNextMonth().getDateBr() );
	$http.post(PortalApp.serviceUrl+"/../mobile/api/history?email="+
		$scope.customer.email+
		"&password="+$scope.customer.password+
		"&company="+$scope.customer.company+
		"&startDate="+start+"&endDate="+end).then(function(rep){
		$scope.history = PortalApp.parseRequest(rep.data);
		$scope.history = $scope.history.map(function(iten){
			iten.title = iten.title.split("<br/>")[1];
			iten.start = FactoryDate.byTime(iten.start);
			iten.start_hour = iten.start.getHourBr();
			iten.start_date = iten.start.getDateBr();
			return iten;
		});
	});
*/
	$scope.joinus = function(name, mobilephone, 
		phone, email, password, password2){
		if (email == undefined || email == "") {
			alert ("Por favor informe um email!");
			return
		}
		if (password == undefined || password == "" || password.length < 6) {
			alert ("Por favor informe uma senha com no mínimo 6 caracteres!")
			return
		}
		if (password != password2) {
			alert ("Senhas não conferem!")
			return;
		}
		var params = "?company="+gup('id')+
					 "&name="+name+
					 "&mobilephone="+mobilephone+
					 "&phone="+phone+
					 "&email="+email+
					 "&password="+password;
		$http.post(PortalApp.serviceUrl+"/../mobile/api/joinus"+params).then(
			function(results){
	        if(results === 1 || results == "1"){
				alert("Cadastramento efetuado com sucesso!");
				$scope.login(email, password);
	        }else{
		        alert(results);
	        }
		});
	};
}]);

