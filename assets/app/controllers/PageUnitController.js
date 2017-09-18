PortalApp.controller('PageUnitController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var unit = (new URL(window.location.href)).searchParams.get('unit');
    $http.get(PortalApp.serviceUrl+"/unitByName?name="+unit).then(function(repose){
        $scope.unit = PortalApp.parseRequest(repose.data);
        setTimeout(function(){
            initializeMap();
        }, 500);
    });
}]);