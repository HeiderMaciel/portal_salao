var PortalApp = angular.module('PortalApp', ['ngSanitize']);
PortalApp.parseRequest = function(data) {
	data = data.substring(0, data.length - 1);
	return JSON.parse(data);
};

PortalApp.serviceUrl = "http://ebelle.vilarika.com.br/site";//production
//PortalApp.serviceUrl = "http://localhost:7171/site";//local