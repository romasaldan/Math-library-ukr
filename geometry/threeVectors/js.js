var countScalProduct=0;
var countVectorProduct=0;
var countMixProduct=0;
var countLenA = 0;
var countLenB = 0;
var countLenC = 0;
function counter () {
    return function (str) {
        if (str=='scal') countScalProduct++;
        if (str=='vector') countVectorProduct++;
        if (str=='mix') countMixProduct++;
        if (str=='lengthA') countLenA++;
        if (str=='lengthB') countLenB++;
        if (str=='lengthC') countLenC++;
    }
}
var count = counter()
function createFormula(elem) {
    return '<img src="https://latex.codecogs.com/gif.latex?'+elem+'" title="\alpha" />';
}
function divide(a,b) { 
    return '&#92'+'frac{'+a+'}{'+b+'}';
    
}
function correctMinus(a) {
    if (a<0) {
        a = '('+a+')'
    }
    return a;
}
function createDeterminant2(vector1,vector2) {
    var startStr ='\u005C'+'begin{vmatrix}';
    var finishStr = '\u005C'+'end{vmatrix}';
    var line1=vector1.x+'&'+vector1.y+'&'+'\u005C'+'\u005C';
    var line2=vector2.x+'&'+vector2.y+'&';
    return createFormula(startStr+line1+line2+finishStr);
}

function mult3 (a,d,c) {
    return correctMinus(a)+'&#92' +'cdot' +correctMinus(d)+'&#92' +'cdot' +correctMinus(c)
}
function vec(a) {
    return '&#92'+'overrightarrow{'+a+'}'
}
function roundTo4(a) {
    return Math.round(a*10000)/10000;
}
function mult(a,b) {
    return correctMinus(a)+'&#92' +'cdot' +correctMinus(b);      
}
var Vector = function(x,y,z) {
    this.x=x;
    this.y=y;
    this.z=z;
}
Vector.prototype.showVector = function(str)  {
    if(typeof str=='undefined') {
    return '('+this.x+';'+this.y+';'+this.z+')'; 
    } else {
        return vec(str)+'='+'('+this.x+';'+this.y+';'+this.z+')';
    }
}
Vector.prototype.lengthVector = function() {
    return roundTo4(Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2)));
}
Vector.prototype.showModulOfVector = function(string) {
    var str= '|'+'&#92'+'overrightarrow{'+string+'}'+'|='+'&#92'+'sqrt{'+correctMinus(this.x)+'^2'+'+'+correctMinus(this.y)+'^2'+'+'+correctMinus(this.z)+'^2}'+'='+this.lengthVector();
    return createFormula(str);
}
function scalProduct (a,b) {//обчислити скалярний добуток
    return a.x*b.x+a.y*b.y+a.z*b.z;
}
function showScalProduct (a,b) { //віобразати скалярний добуток
    count('scal')
    var str = '('+vec('a')+'&#92'+'cdot'+vec('b')+')='+mult(a.x,b.x)+'+'+mult(a.y,b.y)+'+'+mult(a.z,b.z)+'='+scalProduct(a,b);
    return createFormula(str);
}
function findAngle(a,b) {//знайти кут
    count('scal')
    var div1=document.createElement('div');
    div1.innerHTML =createFormula(a.showVector('a'));    
    var div2=document.createElement('div');
    div2.innerHTML = createFormula(b.showVector('b'));    
    var div3=document.createElement('div');
    div3.innerHTML = a.showModulOfVector('a');    
    var div4=document.createElement('div');
    div4.innerHTML = b.showModulOfVector('b');
    var parent = document.querySelector('#angle');

    var str ='cos('+ '\u005C'+'angle'+'('+vec('a')+','+vec('b')+')'+')' +'='+ divide('('+vec('a')+','+vec('b')+')',mult('|'+vec('a')+'|','|'+vec('b')+'|'))+'='+divide(scalProduct(a,b),mult(a.lengthVector(),b.lengthVector()))+'='+roundTo4(scalProduct(a,b)/(a.lengthVector()*b.lengthVector()));
    var div6 = document.createElement('div');
    div6.innerHTML= createFormula(str);
    var angle = '\u005C'+'angle'+'('+vec('a')+','+vec('b')+')='+'arccos('+roundTo4(scalProduct(a,b)/(a.lengthVector()*b.lengthVector()))+')='+roundTo4(Math.acos((scalProduct(a,b)/(a.lengthVector()*b.lengthVector()))))+'='+roundTo4(Math.acos((scalProduct(a,b)/(a.lengthVector()*b.lengthVector())))) +divide('180','\u005C'+'pi')+'^\u005C'+'circ'+'='+roundTo4(Math.acos((scalProduct(a,b)/(a.lengthVector()*b.lengthVector())))*180/Math.PI)+'^'+'\u005C'+'circ';
    var finish = document.createElement('div');
    finish.innerHTML = createFormula(angle);

    parent.appendChild(div1);
    parent.appendChild(div2);
    parent.appendChild(div3);
    parent.appendChild(div4);
    if (countScalProduct<2) {
        var div5 = document.createElement('div');
        div5.innerHTML = showScalProduct(a,b);
        parent.appendChild(div5);
    }
    parent.appendChild(div6);
    parent.appendChild(finish);
}

var Determinant3 = function (a,b,c) {//функція конструктор
    this.firstLine = a;
    this.secondLine = b;
    this.thirdLine = c;
}
Determinant3.prototype.showMinor= function(number) { //створити мінори
    if (number==1) {
        var startStr ='\u005C'+'begin{vmatrix}';
        var finishStr = '\u005C'+'end{vmatrix}';
        var line1=this.secondLine.y+'&'+this.secondLine.z+'\u005C'+'\u005C';
        var line2=this.thirdLine.y+'&'+this.thirdLine.z;
        return startStr+line1+line2+finishStr;
    } else if (number==2) {
        var startStr ='\u005C'+'begin{vmatrix}';
        var finishStr = '\u005C'+'end{vmatrix}';
        var line1=this.secondLine.x+'&'+this.secondLine.z+'\u005C'+'\u005C';
        var line2=this.thirdLine.x+'&'+this.thirdLine.z;
        return startStr+line1+line2+finishStr;
    } else {
        var startStr ='\u005C'+'begin{vmatrix}';
        var finishStr = '\u005C'+'end{vmatrix}';
        var line1=this.secondLine.x+'&'+this.secondLine.y+'\u005C'+'\u005C';
        var line2=this.thirdLine.x+'&'+this.thirdLine.y;
        return startStr+line1+line2+finishStr;
    }
}
Determinant3.prototype.decomposeMinor = function() {//розкласти мінори 
        var str = '=('+mult(this.secondLine.y,this.thirdLine.z)+'-'+mult(this.secondLine.z,this.thirdLine.y)+mult(')',vec('i'))+'-'+'('+mult(this.secondLine.x,this.thirdLine.z)+'-'+mult(this.secondLine.z,this.thirdLine.x)+mult(')',vec('j'))+'+'+'('+mult(this.secondLine.x,this.thirdLine.y)+'-'+mult(this.secondLine.y,this.thirdLine.x)+mult(')',vec('k'))+'=';
    return str;
}
Determinant3.prototype.createFormula =function() {
    var startStr ='\u005C'+'begin{vmatrix}';
    var finishStr = '\u005C'+'end{vmatrix}';
    var line1= this.firstLine.x+'&'+this.firstLine.y+'&'+this.firstLine.z+'\u005C'+'\u005C';
    var line2= this.secondLine.x+'&'+this.secondLine.y+'&'+this.secondLine.z+'\u005C'+'\u005C';
    var line3= this.thirdLine.x+'&'+this.thirdLine.y+'&'+this.thirdLine.z;
    return (startStr+line1+line2+line3+finishStr);
}
Determinant3.prototype.showCalculaiting =function() {
    var str= '=';   str+=mult3(this.firstLine.x,this.secondLine.y,this.thirdLine.z)+'+'+mult3(this.firstLine.z,this.secondLine.x,this.thirdLine.y)+'+'+mult3(this.firstLine.y,this.secondLine.z,this.thirdLine.x)+'-'+mult3(this.firstLine.z,this.secondLine.y,this.thirdLine.x)+'-'+mult3(this.firstLine.y,this.secondLine.x,this.thirdLine.z)+'-'+mult3(this.firstLine.x,this.secondLine.z,this.thirdLine.y);
    return str;
}
function vectorProduct(a,b) {
    var x =a.y*b.z-a.z*b.y;
    var y =-a.x*b.z+a.z*b.x; 
    var z =a.x*b.y-a.y*b.x;
    return new Vector(x,y,z);
}
var VectorProduct =function(a,b) {
    this.firstLine = new Vector('i','j','k');
    this.secondLine = a;
    this.thirdLine = b;
};

VectorProduct.prototype = Object.create(Determinant3.prototype);
VectorProduct.prototype.constructor = VectorProduct;


VectorProduct.prototype.calculateVectorProduct = function () {
    var x = this.secondLine.y*this.thirdLine.z-this.secondLine.z*this.thirdLine.y;
    var y = -this.secondLine.x*this.thirdLine.z+this.secondLine.z*this.thirdLine.x;
    var z = this.secondLine.x*this.thirdLine.y-this.secondLine.y*this.thirdLine.x;
    return new Vector(x,y,z);
}
VectorProduct.prototype.showCalculatingVectorProduct =function () {
    count('vector')
    var str =this.createFormula()
    str+='='+mult(this.showMinor(1),'&#92'+'overrightarrow{'+'i'+'}')+'-'+mult(this.showMinor(2),'&#92'+'overrightarrow{'+'j'+'}')+'+'+mult(this.showMinor(3),'&#92'+'overrightarrow{'+'k'+'}')+'=';
    var  str2=this.decomposeMinor();
    str2+=this.calculateVectorProduct().showVector();
    var div = document.createElement('div');
    var div2 = document.createElement('div');
    var parent = document.querySelector('#solveVectorProduct');
    div.innerHTML = createFormula(str);
    div2.innerHTML = createFormula(str2);
    parent.appendChild(div);
    parent.appendChild(div2);
}
var MixProduct = function (a,b,c) {
    this.firstLine = a;
    this.secondLine = b;
    this.thirdLine = c;
}
MixProduct.prototype = Object.create(Determinant3.prototype);
MixProduct.prototype.constructor = MixProduct;
MixProduct.prototype.calculateMixProduct = function () {
    return this.firstLine.x*(this.secondLine.y*this.thirdLine.z-this.secondLine.z*this.thirdLine.y) - this.firstLine.y*(this.secondLine.x*this.thirdLine.z-this.secondLine.z*this.thirdLine.x)+this.firstLine.z*(this.secondLine.x*this.thirdLine.y-this.secondLine.y*this.thirdLine.x);    
}
MixProduct.prototype.showCalculatingMixProduct = function () {
    count('mix')
    var str = this.createFormula();
    str +=this.showCalculaiting();
    str +='='+this.calculateMixProduct();
    var div = document.createElement('div');
    var parent = document.querySelector('#solveMixProduct');
    div.innerHTML = createFormula(str);
    parent.appendChild(div);
}
VectorProduct.prototype.placeRectangle=function() {
    count('vector');
    this.secondLine.showVector('a');
    this.thirdLine.showVector('b');
    var str = 'S=|['+vec('a')+'\u005C'+'times'+vec('b')+']|=';
    if (countVectorProduct<2) {
        this.showCalculatingVectorProduct(); 
    }
    var vector = this.calculateVectorProduct();
    str+='&#92'+'sqrt{'+correctMinus(vector.x)+'^2'+'+'+correctMinus(vector.y)+'^2'+'+'+correctMinus(vector.z)+'^2}'+'='+vector.lengthVector();
+'+'+vector.lengthVector();
    var div = document.createElement('div');
    div.innerHTML = createFormula(str);
    document.querySelector('#placeRectangle').appendChild(div);
}
VectorProduct.prototype.placeTriangle=function() {
    count('vector')
    this.secondLine.showVector('a');
    this.thirdLine.showVector('b');
    var str = 'S='+divide('1','2')+'|['+vec('a')+'\u005C'+'times'+vec('b')+']|=';
    if (countVectorProduct<2) {
        this.showCalculatingVectorProduct(); 
    }
    var vector = this.calculateVectorProduct();
    str+=divide('1','2')+'&#92'+'sqrt{'+correctMinus(vector.x)+'^2'+'+'+correctMinus(vector.y)+'^2'+'+'+correctMinus(vector.z)+'^2}'+'='+vector.lengthVector()/2;
+'+'+vector.lengthVector();
    var div = document.createElement('div');
    div.innerHTML=createFormula(str);
    document.querySelector('#showPlaceTriangle').appendChild(div);
}
MixProduct.prototype.calculateExtentCube = function(piramide) {
    count('mix')
    this.firstLine.showVector('a');
    this.secondLine.showVector('b');
    this.thirdLine.showVector('c');
    if (countMixProduct<2) {
        this.showCalculatingMixProduct(); 
    }
    if(piramide)  {
    var str = 'V='+divide('1','6')+'|('+vec('a')+','+vec('b')+','+vec('c')+')|='+divide('1','6')+'|'+this.calculateMixProduct()+'|='+roundTo4(Math.abs(this.calculateMixProduct())/6) } else {
        var str ='V=|('+vec('a')+','+vec('b')+','+vec('c')+')|=|'+this.calculateMixProduct()+'|='+roundTo4(Math.abs(this.calculateMixProduct())) 
    }
    var div = document.createElement('div');
    div.innerHTML = createFormula(str);
    if (piramide) {
    document.querySelector('#solveExtendCube').appendChild(div); } else {
        document.querySelector('#solveExtendCube').appendChild(div);
    }
}

function checkParallel(a,b) {

    var k  = a.x/b.x;
    if (k!=(a.y)/b.y) {
        var str2 = divide('a_x','b_x')+'\u005C'+'neq'+divide('a_y','b_y')
        var str = divide(a.x,b.x)+'\u005C'+'neq' +divide(a.y,b.y);
        var div = document.createElement('div');
        var div2 = document.createElement('div');
        div.innerHTML = createFormula(str);
        div2.innerHTML = createFormula(str2);
        document.querySelector('#parallel').insertBefore(div2,document.querySelector('#conclusionParallel'));
        document.querySelector('#parallel').insertBefore(div,document.querySelector('#conclusionParallel'));
        return false;
    }
    if (k!=(a.z/b.z)) {
        var str2 = divide('a_x','b_x')+'\u005C'+'neq'+divide('a_z','b_z')
        var str = divide(a.x,b.x)+'\u005C'+'neq' +divide(a.z,b.z);
        var div = document.createElement('div');
        var div2 = document.createElement('div');
        div.innerHTML = createFormula(str);
        div2.innerHTML = createFormula(str2);
        document.querySelector('#parallel').insertBefore(div2,document.querySelector('#conclusionParallel'));
        document.querySelector('#parallel').insertBefore(div,document.querySelector('#conclusionParallel'));
        return false;
    }     
    k  = a.y/b.y
    if (k!=(a.z/b.z)) {
        var str2 = divide('a_y','b_y')+'\u005C'+'neq'+divide('a_z','b_z')
        var str = divide(a.y,b.y)+'\u005C'+'neq' +divide(a.z,b.z);
        var div = document.createElement('div');
        var div2 = document.createElement('div');
        div.innerHTML = createFormula(str);
        div2.innerHTML = createFormula(str2);
        document.querySelector('#parallel').insertBefore(div2,document.querySelector('#conclusionParallel'));
        document.querySelector('#parallel').insertBefore(div,document.querySelector('#conclusionParallel'));
        return false;
    } 
    var str2 = divide('a_x','b_x')+'='+divide('a_y','b_y')+'='+divide('a_z','b_z')
    var str = divide(a.x,b.x)+'=' +divide(a.y,b.y)+'='+divide(a.z,b.z)+'='+a.x/b.x;
    var div = document.createElement('div');
    div.innerHTML = createFormula(str);
        document.querySelector('#parallel').insertBefore(div,document.querySelector('#conclusionParallel'));    
    return true;
}
function processingData () {
    var vectors = [];
    var name = [];
    name[0] ='a'; 
    name[1] ='b'; 
    name[2] ='c'; 
    vectors[0] = new Vector(document.querySelector('#ax').value,document.querySelector('#ay').value,document.querySelector('#az').value);
    vectors[1] = new Vector(document.querySelector('#bx').value,document.querySelector('#by').value,document.querySelector('#bz').value);
    vectors[2] = new Vector(document.querySelector('#cx').value,document.querySelector('#cy').value,document.querySelector('#cz').value);
    if(document.querySelector('#lengthVector').checked) {
        document.querySelector("p[description='lengthVector']").style.display = 'block';
        var parent=document.querySelector('#modulOfVectors');
        var check = document.querySelectorAll('.length');
        for (var i =0;i<3;i++) {
            if(check[i].checked) {
                var div = document.createElement('div');
                div.innerHTML = vectors[i].showModulOfVector(name[i]);
                parent.appendChild(div);
            }
        }                     
    }
    if (document.querySelector('#scalProduct').checked) {
         document.querySelector("p[description='scalProduct']").style.display = 'block';
        var parent=document.querySelector('#solveScalProduct');
        var div = document.createElement('div');
        div.innerHTML = showScalProduct(vectors[0],vectors[1]);
        parent.appendChild(div);
    }    
    if (document.querySelector('#vectorProduct').checked) {
         document.querySelector("p[description='vectorProduct']").style.display = 'block';
        var parent=document.querySelector('#solveVectorProduct');
        var div = document.createElement('div');
        var vectorProduct = new VectorProduct(vectors[0],vectors[1]);
        vectorProduct.showCalculatingVectorProduct();
    }    
    if (document.querySelector('#mixProduct').checked) {
         document.querySelector("p[description='mixProduct']").style.display = 'block';
        var parent=document.querySelector('#solveMixProduct');
        var div = document.createElement('div');
        var mixProduct = new MixProduct(vectors[0],vectors[1],vectors[2]);
        mixProduct.showCalculatingMixProduct();
    }    
    if (document.querySelector('#checkAngle').checked) {            document.querySelector("p[description='angle']").style.display = 'block';
        findAngle(vectors[0],vectors[1]);
    }
    if (document.querySelector('#extentCube').checked) {
         document.querySelector("p[description='extendCube']").style.display = 'block';
        var parent=document.querySelector('#solveExtendCube');
        var mixProduct = new MixProduct(vectors[0],vectors[1],vectors[2]);
        mixProduct.calculateExtentCube(false);
    }     
    if (document.querySelector('#extentPiramida').checked) {
         document.querySelector("p[description='extendPiramida']").style.display = 'block';
        var parent=document.querySelector('#solveExtentPiramida');
        var mixProduct = new MixProduct(vectors[0],vectors[1],vectors[2]);
        mixProduct.calculateExtentCube(true);
    }     
    if (document.querySelector('#placeQuadrangle').checked) {
         document.querySelector("p[description='placeQuadrangle']").style.display = 'block';
        var vectorProduct = new VectorProduct(vectors[0],vectors[1]);
        vectorProduct.placeRectangle();
    }   
    if (document.querySelector('#placeTriangle').checked) {
         document.querySelector("p[description='placeTriangle']").style.display = 'block';
        var vectorProduct = new VectorProduct(vectors[0],vectors[1]);
        vectorProduct.placeTriangle();
    }     
    if (document.querySelector('#checkParallel').checked) {
        document.querySelector("p[desciption='showVectorA']").style.display = 'block';
        document.querySelector("p[desciption='showVectorB']").style.display='block';
        document.querySelector("p[desciption='showVectorA']").innerHTML=createFormula(vectors[0].showVector('a'));
        document.querySelector("p[desciption='showVectorB']").innerHTML=createFormula(vectors[1].showVector('b'));         
        document.querySelector("p[description='parallel']").style.display = 'block';
         document.querySelector("div[description='parallel2']").style.display = 'block';
        var bool =checkParallel(vectors[0],vectors[1]);
        if(bool) {
        document.querySelector('#conclusionParallel').style.display='block';
        document.querySelector('#conclusionParallel').innerHTML='Вектори колінеарні';
        } else {
        document.querySelector('#conclusionParallel').style.display='block';
        document.querySelector('#conclusionParallel').innerHTML='Вектори не колінеарні';            
        }
    } 
    if (document.querySelector('#complan').checked) {
        count('mix')
         document.querySelector("p[description='mixProduct']").style.display = 'block';
        document.querySelector("span[description='checkComplan']").style.display = 'inline';
        var parent=document.querySelector('#checkComplan');
        var div = document.createElement('div');
        var mixProduct = new MixProduct(vectors[0],vectors[1],vectors[2]);
        if (countMixProduct<2) {
            mixProduct.showCalculatingMixProduct(); 
        }
        var conclusion = document.querySelector('#conclusion');
        if (mixProduct.calculateMixProduct()==0) {
            conclusion.innerHTML = ' вектори a,b,c компланарні';
        } else {
            conclusion.innerHTML = 'вектори a,b,c не компланарні';
        }
    }
    if (document.querySelector('#checkOrtogon').checked) {
        count('scal')
        if (countScalProduct<2) {
        var str = showScalProduct(vectors[0],vectors[1]); 
        } 
        var div = document.createElement('div');
        div.innerHTML = str;
        document.querySelector("#lastTask").style.display = 'block';        
        document.querySelector("p[description='concl']").style.display = 'block';        
        document.querySelector('#ortogon').insertBefore(div,document.querySelector('#lastTask').nextSibling.nextSibling);
        if(scalProduct(vectors[0],vectors[1])==0) {
        document.querySelector("p[description='concl']").innerHTML='Вектори ортогональні';
        } else {
            document.querySelector("p[description='concl']").innerHTML='Вектори не ортогональні'; 
        }
        
    }
    
}