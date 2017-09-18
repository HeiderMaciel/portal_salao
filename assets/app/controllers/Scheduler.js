PortalApp.controller('SchedulerController', ['$scope', '$http', function ($scope, $http) {
    $scope.customer = PortalApp.getLovalVar("customer");
    $scope.customerLogoUrl = $scope.customer.thumb_web;
    
    var start = encodeURIComponent(new Date().getDateBr());
    var end = encodeURIComponent(new Date().getNextMonth().getDateBr());
    $http.post(PortalApp.serviceUrl+"/../mobile/api/users?email="+
        $scope.customer.email+
        "&password="+$scope.customer.password+
        "&company="+$scope.customer.company
        ).then(function(rep){
        $scope.users = PortalApp.parseRequest(rep.data);
    });
    $scope.selectServices = function(){

        $http.post(PortalApp.serviceUrl+"/../mobile/api/activities?email="+
            $scope.customer.email+
            "&password="+$scope.customer.password+
            "&company="+$scope.customer.company+
            "&user="+$scope.user.id).then(function(rep){
            $scope.activityData = PortalApp.parseRequest(rep.data);
            $scope.activityData.hours = getHours($scope.activityData.start, $scope.activityData.end, $scope.activityData.interval);
            $scope.activityData.dates = getDates();
        });
    };
    $scope.schedule = function(user, date, hour, activity){
        var params = "?email="+$scope.customer.email+
                     "&password="+$scope.customer.password+
                     "&company="+$scope.customer.company+
                     "&user="+user.id+
                     "&customer="+$scope.customer.id+
                     "&date="+encodeURIComponent(date.value)+
                     "&hour_start="+encodeURIComponent(hour.name)+
                     "&activity="+encodeURIComponent(activity.id);
        $http.post(PortalApp.serviceUrl+"/../mobile/api/schedule"+params).then(function(rep){
            alert("Agendamento efetuado com sucesso!");
            $scope.openSchelules();
        });

    };

}]);
var getDates = function(){
    var ONE_DAY = 86400 * 1000;
    var today = new Date();
    var nextMonth = new Date().getNextMonth();
    var dates = [];
    // 02/07/2017 rigel - pega dia corrente - antes começava de amanhã
    dates.push({name : today.getTextWhenShort(), value: today.getDateBr()});
    while(today.getTime() < nextMonth.getTime()){
        today.setTime(today.getTime()+ONE_DAY);
        dates.push({name : today.getTextWhenShort(), value: today.getDateBr()});
    }
    return dates;
};
var getHours = function(start, end, interval){
    var MINUTE_IN_MILES = 60*1000;
    var date = new Date();
    var dayToday = Date.toDay().getDate();
    date.setHours(start);
    date.setMinutes(0);
    var increment = interval * MINUTE_IN_MILES;
    var hours = [];
    while(date.getHours() <= end && date.getDate() === dayToday ){
        hours.push({name : getHourBr(date), value: date});
        date.setTime(date.getTime()+increment);
    }
    return hours; 
};