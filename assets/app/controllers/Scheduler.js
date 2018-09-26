PortalApp.controller('SchedulerController', ['$scope', '$http', function ($scope, $http) {
    $scope.customer = PortalApp.getLovalVar("customer");
    $scope.customerLogoUrl = $scope.customer.thumb_web;
    if ($scope.customer.company == 334) {
        $scope.date_simple = true;
    } else {
        $scope.date_simple = false;
    }
    $scope.date = (new Date());
    $scope.date_old = (new Date());

    $scope.activityid = 134336;

    $scope.dateOptions = {
        minDate: (new Date()),
        maxDate: (new Date()).getNextMonth()
    };
    
    var start = encodeURIComponent(new Date().getDateBr());
    var end = encodeURIComponent(new Date().getNextMonth().getDateBr());
    $http.post(PortalApp.serviceUrl+"/../mobile/api/users?email="+
        $scope.customer.email+
        "&password="+$scope.customer.password+
        "&unit="+gup('unit')+
        "&company="+$scope.customer.company
        ).then(function(rep){
        $scope.users = PortalApp.parseRequest(rep.data);
    });
    $scope.selectServices = function(){
        $http.post(PortalApp.serviceUrl+"/../mobile/api/activities"+
            "?email="+$scope.customer.email+
            "&password="+$scope.customer.password+
            "&unit="+gup('unit')+
            "&company="+$scope.customer.company+
            "&user="+$scope.user.id
            //+
            //"&date="+encodeURIComponent($scope.date.getDateBr())+
            //"&activity=0"
            ).then(function(rep){
            $scope.activityData = PortalApp.parseRequest(rep.data);
            //$scope.activityData.hours = getHours($scope.activityData.start, $scope.activityData.end, $scope.activityData.interval, $scope.activityData.hoptions);
            //console.log($scope.activityData)
            //$scope.activityData.dates = getDates();
        });
    };

    $scope.selectHoptions = function(activity){
        var dateAux = encodeURIComponent($scope.date.getDateBr());
        if ($scope.date_old.value) {
            // alert ("vaiii " + $scope.date_old.value)
            // seleção data_old foi usada
            dateAux = encodeURIComponent($scope.date_old.value)
        }
        // tentativa de preservar a atividade qd troca a
        // data, o id vem, mas não consegui setar
        //alert ("vaiiiii act.id " + activity + "   " + $scope.activityid)
        //var actAux = activity.id
        if (activity != undefined && activity != "undefined") {
            $http.post(PortalApp.serviceUrl+"/../mobile/api/hoptions"+
                "?email="+$scope.customer.email+
                "&password="+$scope.customer.password+
                "&unit="+gup('unit')+
                "&company="+$scope.customer.company+
                "&user="+$scope.user.id+
                "&date="+dateAux+
                "&activity="+encodeURIComponent(activity.id)).then(function(rep){
                $scope.hoptionsData = PortalApp.parseRequest(rep.data);
                $scope.hoptionsData.hours = getHours($scope.hoptionsData.start, 
                    $scope.hoptionsData.end, $scope.hoptionsData.interval, $scope.hoptionsData.hoptions);
    //            $scope.activityData.dates = getDates();
            //activity.id = actAux
            //$scope.activityid = actAux;
            });
        }   
    };

    $scope.schedule = function(user, date, hour, activity){
        if (user == undefined || user == "") {
            alert ("Por favor informe um profissional!");
            return
        }
        if (activity == undefined || activity == "") {
            alert ("Por favor informe um serviço/procedimento!");
            return
        }
        if (hour == undefined || hour == "") {
            alert ("Por favor informe um horário!");
            return
        }

        var params = "?email="+$scope.customer.email+
                     "&password="+$scope.customer.password+
                     "&company="+$scope.customer.company+
                     "&unit="+gup('unit')+
                     "&user="+user.id+
                     "&customer="+$scope.customer.id+
                     "&date="+encodeURIComponent(date.getDateBr())+
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
// Rigel - 29/01/2018
// estes parms de start end interval, poderiam sair
// tanto daqui qto da api, deixei para demonstrar
// como era antes - sem verificar agendamentos e bloqueios
var getHours = function(start, end, interval, hoptions){
    var MINUTE_IN_MILES = 60*1000;
    var date = new Date();
    var dayToday = Date.toDay().getDate();
    date.setHours(start);
    date.setMinutes(0);
    var increment = interval * MINUTE_IN_MILES;
    var hours = [];
    // rigel 29/01/2018 - agora vem da api e verifica
    // agendamentos e bloqueios para o proifssional escolhido
    for (var i = 0, len = hoptions.length; i < len; i++) {
        date.setHours(hoptions[i].hour);
        date.setMinutes(hoptions[i].min);
        hours.push({name : getHourBr(date), value: date});
    }
    // Antes o Mateus ignorava os atendiemntos e gerava
    // todas as possibilidades entre inicio e fim com o intervalo
    // vou deixar comeentado aqui em baixo
/*
    while(date.getHours() <= end && date.getDate() === dayToday ){
        hours.push({name : getHourBr(date), value: date});
        date.setTime(date.getTime()+increment);
    }
*/
    return hours; 
};
