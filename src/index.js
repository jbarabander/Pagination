function Page(arr, limit) {
    this._limit = limit || arr.length || 10; //FIXME: should it really be 10???
    this._data = arr || [];
    this.mapPages(this._limit);
    this._currentPg = 0;
    this._current = this._pages[this._currentPg];
}

Page.prototype.mapPages = function(limit) {
    var self = this;
    self._limit = limit;
    self._pages = [];
    self._data.forEach(function(element, index) {
        var page = parseInt(index / limit);
        if(!self._pages[page]) {
            self._pages[page] = [];
        }
        self._pages[page].push(element);
    })
    if(this._currentPg > this._pages.length - 1) {
        this._currentPg = this._pages.length - 1;
    }
    this._current = this._pages[this._currentPg];
}

Page.prototype.next = function() {
    if(!this._limit) {
        return this._data;
    }
    if(this._currentPg + 1 > parseInt(this._data.length / this._limit)) {
        return this._current;
    }
    this._currentPg++;
    this._current = this._pages[this._currentPg];
    return this._current;
};

Page.prototype.first = function() {
    if(!this._limit) {
        return this._data;
    }
    this._currentPg = 0;
    this._current = this._pages[0];
    return this._current;
};

function withinLimits(lowerLimit, upperLimit, index) {
    return lowerLimit <= index && index <= upperLimit;
}

Page.prototype.last = function() {
    if(!this._limit) {
        return this._data;
    }
    this._currentPg = this._pages.length - 1;
    this._current = this._pages[this._currentPg];
    return this._current;
};

Page.prototype.previous = function() {
    if(!this._limit) {
        return this._data;
    }
    if(this._currentPg === 0) {
        return this._current;
    }
    this._currentPg--;
    this._current = this._pages[this._currentPg];
    return this._current;
};

Page.prototype.getCurrent = function() {
    return this._current;
};

Page.prototype.getCurrentPg = function() {
    return this._currentPg;
};

Page.prototype.goToPage = function(num) {
    if(num >= this._pages.length - 1) {
        this._currentPg = this._pages.length - 1;
        this._current = this._pages[this._currentPg];
    } else if(num <= 0) {
        this._currentPg = 0;
        this._current = this._pages[0];
    } else {
        this._currentPg = num;
        this._current = this._pages[num];
    }
    return this._current;
}

//next step - add ajax pagination