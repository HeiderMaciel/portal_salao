PortalApp.controller('SchedulesController', ['$scope', '$http', function ($scope, $http) {
    $scope.customer = PortalApp.getLovalVar("customer");
    $scope.customerLogoUrl = $scope.customer.thumb_web;
    $scope.trStatusdecode = function(status, status2){
    // duplicado do treatments_conference.js
      var statstr = '' 
      var title = ''
      if (status == '0') {
        statstr = 'open'
        title ='agendado'
      } else if (status == '1') {
        statstr = 'missed'
        title ='faltou'
      } else if (status == '2') {
        statstr = 'Arrived'
        title ='chegou'
      } else if (status == '3') {
        statstr = 'Ready'
        title ='atendido'
      } else if (status == '4') {
        if (Status2 == '3') {
          statstr = 'ready_paid'
          title ='atendido / pago'
        } else {
          statstr = 'paid'
          title ='pago'
        }
      } else if (status == '5') {
        statstr = 'Deleted'
        title ='excluído'
      } else if (status == '6') {
        statstr = 'Confirmed'
        title ='confirmado'
      } else if (status == '7') {
        statstr = 'PreOpen'
        title ='pré agendado'
      } else if (status == '8') {
        statstr = 'ReSchedule'
        title ='desmarcou'
      } else if (status == '9') {
        statstr = 'Budget'
        title ='orçamento'
      }
        return "<img title='" + title + 
           "' src='http://ebelle.vilarika.com.br/images/treatment_"+statstr.toLowerCase()+"1.png' width='24'/> " + title 
    }

    $scope.loadHistory = function () {
        $http.post(PortalApp.serviceUrl+"/../mobile/api/history?email="+
            $scope.customer.email+
            "&password="+$scope.customer.password+
            "&company="+$scope.customer.company+
            "&unit="+gup('unit')+
            "&startDate="+start+"&endDate="+end).then(function(rep){
            $scope.history = PortalApp.parseRequest(rep.data);
            $scope.history = $scope.history.map(function(item){
                item.title = item.title.split("<br/>")[1];
                item.start = FactoryDate.byTime(item.start);
                item.start_hour = item.start.getHourBr();
                item.start_date = item.start.getDateBr();
                return item;
            });
        });
    }
    $scope.deleteItem = function (id, status) {
        var msg = "";
        var msgout = "";
        if (status == "7") { // preopen
            msg = "Tem certeza que deseja excluir o agendamento?";
            msgout = "excluido";
        } else if (status == "0") { // open
            msg = "Tem certeza que deseja desmarcar o agendamento?";
            msgout = "alterado";
        } else {
            alert ("Este agendamento não pode ser modificado!");
            return;
        }
        if (confirm (msg)) {
            $http.post(PortalApp.serviceUrl+"/../mobile/api/reschedule?email="+
            $scope.customer.email+
            "&password="+$scope.customer.password+
            "&company="+$scope.customer.company+
            "&unit="+gup('unit')+
            "&trid="+id+
            "&status="+status).then(function(rep){
                alert("Agendamento " + msgout + " com sucesso!");
                $scope.loadHistory();
            })
        }
    }
    var start = encodeURIComponent( (new Date()).getDateBr() );
    var end = encodeURIComponent( (new Date()).getNextMonth().getDateBr() );
    $scope.loadHistory();

}]);
