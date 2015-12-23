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

 	function queryStringify(params) {
 		var stringParsed = '';
 		if(!params) return stringParsed;
 		var keys = Object.keys(params);
	 	if(!keys.length) return stringParsed;
 		stringParsed = keys[0] + '=' + params[keys[0]];
 		for(var i = 1; i < keys.length; i++) {
 			stringParsed += '&' + keys[i] + '=' + params[keys[i]];
 		}
 		return stringParsed;
 	}

 	
 	function get(url, options, cb) {
 		var request = retrieveXHR();
 		request.onreadystatechange = function() {
 			if(request.readyState === 4) {
 				cb(request.responsetext);
 			}
 		}
 		if(!request) {
 			throw new Error("Sorry this browser does not support Ajax");
 		}
 		request.open('GET', url + queryStringParsing(options.params))
 	}

 	function put(url, data, options) {

 	}

 	function post(url, data, options) {

 	}

 	function delete(url, options) {

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