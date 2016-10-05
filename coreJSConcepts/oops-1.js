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


// OR IN SIMPLE MANNER FOLLOWING CAN BE DONE:
//EXAMPLE - 1:
function Person(name){
    this.name = name;
}
Person.prototype.getName = function(){
    console.log(this.name);
}
function Student(id, name){
    this.id = id;
    Person.call(this, name);
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

/*
Object.create() is an excellent choice for creating an object without going through its constructor.
You can omit Person.cal() method and use the following:
Student.prototype = Object.create(Person.prototype, {name:{writable: false, value:"Bala"}});
See the second example below:
*/

Student.prototype.getId = function(){
    console.log(this.id);
}

var s = new Student(822985, "Bala");

//EXAMPLE - 2:

function Person(name){
    this.name = name;
}
Person.prototype.getName = function(){
    console.log(this.name);
}
Person.prototype.getInfo = function(){
    console.log("My description is " + this.desc);
};
function Student(id, name){
    this.id = id;
}
Student.prototype = Object.create(Person.prototype, 
                        {name: {writable: true, configurable:true, value:"MOhanty"}, 
                         desc: {configurable:true, 
                                get: function (){return this.name;}, 
                                set: function(value){this.name=value;}
                               }
                         }
                        );
Student.prototype.constructor = Student;

Student.prototype.getId = function(){
    console.log(this.id);
}

var s = new Student(822985, "Bala");
