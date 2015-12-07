(function(root) {
	var ajax = {};
	// var xhr = new root.XMLHttpRequest();
	if(typeof define === 'function' && define.amd) {
		define(ajax);
	} else if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
		module.exports = ajax;
	} else {
		root.paginate = ajax; //FIXME
	}
})(window)