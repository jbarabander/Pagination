(function(root) {
	var ajax = {};
	var xhr;

	// function Ajax() {

	// }
 	function retrieveXHR() {
	 	if(root.XMLHttpRequest) {
			return new XMLHttpRequest();
		}
		try {
			return new ActiveXObject('Microsoft.XMLHTTP');
		} catch(e) {}
		try {
			return new ActiveXObject("Msxml2.XMLHTTP.3.0");
		} catch(e) {}
		try {
			return new ActiveXObject('Msxml2.XMLHTTP.6.0');
		} catch(e) {}
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {}
		return false;
 	}
	// var xhr = new root.XMLHttpRequest();
	if(typeof define === 'function' && define.amd) {
		define(ajax);
	} else if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
		module.exports = ajax;
	} else {
		root.pages = ajax; //FIXME
	}
})(window)