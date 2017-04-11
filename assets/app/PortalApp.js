var PortalApp = angular.module('PortalApp', ['ngSanitize']);
PortalApp.parseRequest = function(data) {
	data = data.substring(0, data.length - 1);
	return JSON.parse(data);
};
PortalApp.setLovalVar = function(name, data) {
	localStorage.setItem(name,JSON.stringify(data));
};
PortalApp.getLovalVar = function(name) {
	return JSON.parse(localStorage.getItem(name));
};

PortalApp.serviceUrl = "https://ebelle.vilarika.com.br/site";//production
//PortalApp.serviceUrl = "https://66.228.57.73:7171/site";//local