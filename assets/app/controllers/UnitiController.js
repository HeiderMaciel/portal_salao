PortalApp.controller('UnitController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

	$scope.$on('$locationChangeSuccess', function(){
		updateUnities();
	});

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
	var updateUnities = function(){
		var cityName = $location.$$path.replace('/','');
		$http.get(PortalApp.serviceUrl+"/unities?cityName="+cityName).then(function(repose){
			$scope.pages = buildRows(PortalApp.parseRequest(repose.data), 4, 3);
			$scope.page = $scope.pages[0];
		});		
	};
	updateUnities();
	$scope.chagePage = function(page){
		$scope.page = page;
	};
	$scope.nextPage = function(){
		var currentIndex = $scope.pages.indexOf($scope.page);
		currentIndex++;
		if(currentIndex === $scope.pages.length){
			currentIndex = 0;			
		}
		$scope.page = $scope.pages[currentIndex];
	};	
	$scope.prevPage = function(){
		var currentIndex = $scope.pages.indexOf($scope.page);
		currentIndex--;
		if(currentIndex === -1){
			currentIndex = $scope.pages.length;
		}
		$scope.page = $scope.pages[currentIndex];
	};		
}]);