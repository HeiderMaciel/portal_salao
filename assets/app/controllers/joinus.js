PortalApp.controller('JoinusController', ['$scope', '$http', function ($scope, $http) {
	$scope.joinus = function(name, mobilephone, 
		phone, email, doc){
		if (email == undefined || email == "") {
			alert ("Por favor informe um email!");
			return
		}
/*
		if (password == undefined || password == "" || password.length < 6) {
			alert ("Por favor informe uma senha com no mínimo 6 caracteres!")
			return
		}
		if (password != password2) {
			alert ("Senhas não conferem!")
			return;
		}
*/
		if ((mobilephone == undefined || mobilephone == "") &&
		    (phone == undefined || phone == "")) {
			alert ("Pelo menos um dos telefones precisa ser informado!")
			return;
		}
		if (mobilephone == undefined) {
			mobilephone = "";
		}
		if (phone == undefined) {
			phone = "";
		}
		if (doc == undefined) {
			doc = "";
		}
		var params = "?company="+gup('id')+
					 "&name="+name+
					 "&mobilephone="+mobilephone+
					 "&phone="+phone+
					 "&email="+email+
					 "&doc="+doc;
		$http.post(PortalApp.serviceUrl+"/../mobile/api/joinus"+params).then(
			function(results){
				// rodar com f12 mostra estrutura do objeto
				//console.log(results)
	        if(results.data === 1 || results.data == "1"){
				alert("Cadastramento efetuado com sucesso!\n\nAcesse o email e clique no link para cadastrar sua senha.");
		        $http.post(PortalApp.serviceUrl+
		            "/../security/remember_customer_password", 
		            {email : email, company : gup('id')}).then(function(results){
		            if(results.data === 1 || results.data == "1"){
		                alert("Enviado com sucesso para " + email);
		            }else{
		                alert(results.data);
		            }
		        });    
		        // antes informava a senha e fazia o login sem
		        // confirmação do email
				// $scope.login(email, password);
	        }else{
		        alert(results.data);
	        }
		});
	};
}]);

