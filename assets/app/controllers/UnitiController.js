PortalApp.controller('UnitController', ['$scope', '$http', function ($scope, $http) {

	var buildRows = function(data, nIntens, nRowToPage){
		var pages = [];
		var rows = [];
		var row = [];
		data.forEach(function(item, i){
			if(i % nIntens === 0){
				if(row.length > 0){
					rows.push(row);
					row = [];
				}
				if(rows.length === nRowToPage){
					pages.push({ rows: rows});
					rows = [];
				}
			}
			row.push(item);
		});
		if(row.length){
			rows.push(row);
		}
		if(rows.length){
			pages.push({ rows : rows});
		}
		return pages;
	};

	$http.get(PortalApp.serviceUrl+"/unities").then(function(repose){
		$scope.pages = buildRows(PortalApp.parseRequest(repose.data), 4, 1);
		$scope.page = $scope.pages[0];
	});
	$scope.chagePage = function(page){
		$scope.page = page;
	};
	$scope.nextPage = function(){
		var currentIndex = $scope.pages.indexOf($scope.page)-1;
		currentIndex++;
		if(currentIndex === $scope.pages.length){
			currentIndex = 0;			
		}
		$scope.page = $scope.pages[currentIndex];
	};	
	$scope.prevPage = function(){
		var currentIndex = $scope.pages.indexOf($scope.page)-1;
		currentIndex--;
		if(currentIndex === -1){
			currentIndex = $scope.pages.length;
		}
		$scope.page = $scope.pages[currentIndex];
	};		
}]);