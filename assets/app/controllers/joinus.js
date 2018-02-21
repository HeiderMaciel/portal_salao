PortalApp.controller('JoinusController', ['$scope', '$http', function ($scope, $http) {
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
				// rodar com f12 mostra estrutura do objeto
				//console.log(results)
	        if(results.data === 1 || results.data == "1"){
				alert("Cadastramento efetuado com sucesso!");
				$scope.login(email, password);
	        }else{
		        alert(results.data);
	        }
		});
	};
}]);

