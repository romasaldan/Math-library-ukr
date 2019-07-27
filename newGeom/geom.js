'use strict';
class Point {
	constructor (name,x=0,y=0,z) {
		this._name = name;
		var coor = [];
		for (let i =1;(i<arguments.length)&&(i<4);i++){
			coor[i-1] = arguments[i];
		}
		this._coordinates = coor;
	};
	set name(value) {
       this._name = value;
		
    }
	get name() {
		return this._name;
	}
	set coordinates(arr) {
		this._coordinates = [];
		for (let i =0;((i<arr.length)&&(i<3));i++) {
			 this._coordinates[i]= arr[i];
		}
	}
	get coordinatesImage() {
		var str = this._name+'(';
		for (let i = 0; i<this._coordinates.length;i++) {
			str+= this._coordinates[i];
			if ((this._coordinates.length-1)!=i) {
				str+=';'
			}
		}
		return str+')';
	}
	get coordinates () {
		return this._coordinates;
	}

}
class Vector {
	constructor (name,x=0;y=0,z) {
		this._name = name;
		
	}
}
var a = new Point('B',1,2,3);
a.name  = 'A';
a.coordinates = [1,2,7]
console.log(a);
