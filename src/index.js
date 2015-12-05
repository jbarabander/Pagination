function Page(arr, limit) {
    this._limit = limit || null;
    this._data = arr;
    this._current = arr;
    this._currentPg = 0;
}

Page.prototype.next = function() {
    var self = this;
    if(self._currentPg + 1 >= parseInt(self._data.length / self._limit)) {
        return self._current;
    }
    self._currentPg++;
    var lowerLimit = self._limit * self._currentPg;
    var upperLimit = self._limit * (self._currentPg + 1) - 1;
    self._current = self._data.filter(function(element, index) {
        return withinLimits(lowerLimit, upperLimit, index);
    });
    return self._current;
};

Page.prototype.first = function() {
    var self = this;
    var lowerLimit = 0;
    var upperLimit = self._limit - 1;
    self._currentPg = 0;
    self._current = self._data.filter(function(element, index) {
        return withinLimits(lowerLimit, upperLimit, index);
    });
    return self._current;
};

function withinLimits(lowerLimit, upperLimit, index) {
    return lowerLimit <= index || index <= upperLimit;
}

Page.prototype._checkIfTooHigh = function(upperLimit) {
    return self._data.length >= upperLimit;
};

Page.prototype.last = function() {
    var self = this;
    self._currentPg = parseInt(self._data.length / self._limit);
    var lowerLimit = self._limit * self._currentPg;
    var prelimUpperLimit = self._limit * (self._currentPg + 1) - 1;
    var upperLimit =  prelimUpperLimit > self._data.length - 1 ? self._data.length - 1 : prelimUpperLimit;
    self._current = self._data.filter(function(element, index) {
        return withinLimits(lowerLimit, upperLimit, index);
    });
    return self._current;
};

Page.prototype.previous = function() {
    var self = this;
    if(self._currentPg === 0) {
        return;
    }
    self._currentPg--;
    var lowerLimit = self._limit * self._currentPg;
    var upperLimit = self._limit
}

Page.prototype.getCurrent = function() {
    return this._current;
};