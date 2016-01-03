(function(root) {

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

	function queryStringify(params, upperParam) {
		var paramsArr = [];
		if(!params) return '';
			var keys = Object.keys(params);
		if(!keys.length) return '';
		for(var i = 0; i < keys.length; i++) {
			var currentKey = keys[i];
			var currentParam = params[currentKey];
			var newKey = upperParam ? upperParam + '[' + currentKey + ']' : currentKey;
			//serves as a way of getting the nested key string
			switch(typeof currentParam) {
				case 'object':
				//if it is an object then its nested and we have to make another go at it
				//we will pass in the key string so far for use in the next step
				stringifiedParam = qStringify(currentParam, newKey);
				break;
			case 'string':
				stringifiedParam = newKey + '=' + encodeURIComponent(currentParam);
				break;
			}
			paramsArr.push(stringifiedParam);
		}
		return paramsArr.join('&');
	}

	function querySerialize(str) {
		var splitQuery = str.split('&');
		// console.log(splitQuery);
		var query = {};
		var priorParameter;
		for(var i = 0; i < splitQuery.length; i++) {
			var currentQueryPortion = splitQuery[i];
			var keyAndValue = currentQueryPortion.split('=');
			var keys = keyAndValue[0].split('[').map(function(element, index) {
				if(index === 0) {
					return element;
				} else {
					return element.slice(0, element.length - 1);
				}
			});
			var value = keyAndValue[1];
			if(keys.length === 1) {
				query[keys[0]] = decodeURIComponent(value);
			} else {
				var currentObj = query;
				for(var j = 0; j < keys.length - 1; j++) {
					var currentKey = keys[j];
					// if(j !== 0) {
					// 	currentKey = currentKey.slice(0, currentKey.length - 1);
					// 	console.log(currentKey);
					// }
					if(!currentObj[currentKey]) {
						currentObj[currentKey] = {};
					}
					currentObj = currentObj[currentKey];
				}
				currentObj[keys[keys.length - 1]] = decodeURIComponent(value);
			}
		}
		return query;
	}
 	
 	// function multipleReplace(str, arrOfSearchAndReplaces, arrOfReplaces) {
 	// 	while()
 	// }

 	
 	function get(url, options, cb) {
 		var request = retrieveXHR();
		if(!request) {
			throw new Error("Sorry this browser does not support Ajax!");
		}
		var requestUrl = options.params ? url + '?' + queryStringify(options.params) : url;
		request.open('GET', requestUrl);
 		request.onreadystatechange = function() {
 			if(request.readyState === 4) {
 				cb(request.responseText);
 			}
 		};
		request.send();
 	}

 	function put(url, data, options) {

 	}

 	function post(url, data, options) {

 	}

 	function del(url, options) {

 	}

 	var ajax = {
 		get: get
 	};

	// var xhr = new root.XMLHttpRequest();
	if(typeof define === 'function' && define.amd) {
		define(ajax);
	} else if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
		module.exports = ajax;
	} else {
		root.pages = ajax; //FIXME
	}
})(window)