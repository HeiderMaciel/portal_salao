PortalApp.controller('UnitController', ['$scope', '$http', function ($scope, $http) {

	var buildRows = function(data, nIntens){
		//nIntens
		var rows = [];
		var row = [];
		data.forEach(function(item, i){
			if(i % nIntens === 0){
				if(row.length > 0){
					rows.push(row);
					row = [];
				}
			}
			row.push(item);
		});
		rows.push(row);
		return rows;
	};

	$http.get(PortalApp.serviceUrl+"/unities").then(function(repose){
		$scope.rows = buildRows(PortalApp.parseRequest(repose.data), 3);
	});
}]);