function Point (x,y,z,name) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.name = name;
}
function Vector (x,y,z,name) {
    this.x = x; 
    this.y = y; 
    this.z = z; 
    this.name =name;
    this.squareLength = Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2);
    this.length = Math.sqrt(this.squareLength)
}
var a = new Point(1,2,3,'A')
var b = new Point(2,3,4,'B')
function Straight (Vector,Point) {
    this.point = Point;
    this.directionVector = Vector; 
}
function PlaceEquation (a,b,c,d,name) {
    this.a=a;
    this.b=b;
    this.c=c;
    this.d=d;
    this.name = name;
}
function addVectors(a,b) {
    return new Vector(a.x+b.x,a.y+b.y,a.z+b.z,a.name+b.name)
}
function scalProduct (a,b) {
    return a.x*b.x+a.y*b.y+a.z*b.z;
} 
