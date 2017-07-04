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

if (document.location.href.indexOf("local") != -1) {
	PortalApp.serviceUrl = "http://localhost:7171/site";//local
} else {
	PortalApp.serviceUrl = "http://ebelle.vilarika.com.br/site";//production
}