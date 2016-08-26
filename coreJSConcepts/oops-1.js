// This file explains the best module pattern with Object Oriented JavaScript.


var BaseView = (function () {
 
    function BaseView() {
    }
 
    BaseView.prototype.createChildren = function () {
    };
 
    BaseView.prototype.layoutChildren = function () {
    };
	
	  BaseView.prototype.destroy = function() {
        this.disable();
        // Nulls out all properties of the class to prevent memory leak.
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                this[key] = null;
            }
        }
    };
 
    return BaseView;
})();



var AnotherView = (function () {
 
    var _super = Extend(AnotherView, BaseView);
 
    function AnotherView() {
        _super.call(this);
    }
 
    AnotherView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
 
    AnotherView.prototype.layoutChildren = function () {
    };
 
    return AnotherView;
})();


/* What `_super` allows you to do is call the functions/methods on the class you extended.
If you look at Extend in `var _super = Extend(AnotherView, BaseView);` it is a helper function that allows you to extend other classes easily. 
It will take the first class (AnotherView) and extend it with the second class (BaseView).
Below is the 12 line Extend function/class. */

var Extend = function (inheritorClass, baseClass) {
    for (var p in baseClass) {
        if (baseClass.hasOwnProperty(p)) {
            inheritorClass[p] = baseClass[p];
        }
    }
    function __() {
        this.constructor = inheritorClass;
    }
    __.prototype = baseClass.prototype;
    inheritorClass.prototype = new __();
    return baseClass;
};

