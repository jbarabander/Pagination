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
 		var paramsArr = [];
 		if(!params) return '';
 		var keys = Object.keys(params);
	 	if(!keys.length) return '';
 		// stringParsed = keys[0] + '=' + params[keys[0]];
 		for(var i = 0; i < keys.length; i++) {
 			var currentKey = keys[i];
 			var currentParam = params[currentKey];
 			var stringifiedParam;
 			switch(typeof currentParam) {
 				case 'object':
 					stringifiedParam = queryStringify(currentParam);
 					break;
 				case 'string':
 					stringifiedParam = currentParam;
 					break;
 				default:
 					stringifiedParam = currentParam;
 					break;
 			}
 			paramsArr.push(currentKey + '=' + encodeParam(stringifiedParam));
 		}
 		return paramsArr.join('&');
 	}

 	// function recursivePortion(params) {
 	// 	if(!params) return '';
 	// 	var keys = Object.keys(param)
 	// }
 	var checkForEncChars = (function() {
 		var encodedChars = [
 			'%0A', '%0D', '%20', '%21', '%22', '%23', '%24', '%25', '%26', 
 			'%27', '%28', '%29', '%2A', '%2B', '%2C', '%2D', '%2E', '%2F', '%3A', 
 			'%3B', '%3C', '%3D', '%3F', '%40', '%5B', '%5D'
 		]
 		return function(str) {
 			return encodedChars.indexOf(str) !== -1;
 		}
 	})();
 	function encodeParam(param) {
 		//POC - to be fleshed out with another function
 		var str = '';
 		if(typeof param === 'string') {
 			for(var i = 0; i < param.length; i++) {
 				switch(param[i]) {
 					case ' ':
 						str += '%20';
 						break;
 					case '!':
 						str += '%21';
 						break;
 					case '$':
 						str += '%24';
 						break;
 					case '%':
 						if(checkForEncChars(param.slice(i, i + 3))) {
 							str += '%';
 						} else {
 							str += '%25';
 						}
 						break;
 					case '&':
 						str += '%26';
 						break;
 					case "'":
 						str += '%27';
 					 	break;
 					case "=":
 						str += '%3D';
 						break;
 					case "?":
 						str += '%3F';
 					default: 
 						str += param[i];
 						break;	
 				}
 			}
 		}
 		return str;
 	}
 	
 	// function multipleReplace(str, arrOfSearchAndReplaces, arrOfReplaces) {
 	// 	while()
 	// }

 	
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
 		request.open('GET', url + queryStringify(options.params))
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