function altMult(a,b) {
    if (a=='') {
        return b;
    }
    if(a=='-') {
        return '-'+b;
    }
    return a+'\u005C'+ 'cdot '+b
}
function altMult3(a,b,c) {
    return a+'\u005C'+ 'cdot '+b+'\u005C'+ 'cdot '+c
}
function takeOutOne(str){
    if(str=='1') {
        return '';
    } 
    if(str=='-1') {
        return '-';
    }      
    return str;
}


function correctNorm(condition,number) {
    for (var i=0;i<number;i++) {
        condition = correctNormEquation(condition)
    }
    return condition;
}

var Equation = function (a,b,c) {
    this.a = a;
    this.b = b;
    this.c = c;
}
var SystemEquation = function (equation1,equation2) {
    this.equation1 = equation1;
    this.equation2 = equation2;
}
Equation.prototype.multiplayEquation = function(n)  {
    return new Equation((n*this.a),(n*this.b),(n*this.c))
}
Equation.prototype.createEquation = function () {
    if (typeof this.c == 'string' ) {
        this.c=+this.c;
    }
    var str = createLinearEquation(this.a,this.b,0,multFraction(this.c,-1))
    return str;
}
SystemEquation.prototype.writeSystemEquation = function () {
    return '\u005C' +'left'+'\u005C'+'{'+'\u005C'+'begin{matrix}'+this.equation1.createEquation()+'\u005C'+'\u005C'+this.equation2.createEquation()+'\u005C'+'end{matrix}'+'\u005C'+'right.'
}
SystemEquation.prototype.substractionEquation = function () {
    var newEquation = new Equation(this.equation2.a-this.equation1.a,this.equation2.b-this.equation1.b,this.equation2.c-this.equation1.c)
    return new SystemEquation(this.equation1,newEquation);
}
SystemEquation.prototype.multiplayEquations = function(n1,n2) {
    return new SystemEquation(this.equation1.multiplayEquation(n1),this.equation2.multiplayEquation(n2))
}
SystemEquation.prototype.getY = function () {
    var frac = new Fraction(this.equation2.c,this.equation2.b)
    return frac.isNum()
}
SystemEquation.prototype.getX = function () {
    if (this.equation2.c==0) {
        return this.equation1.c/this.equation1.a
    }
    var x = multFraction(this.equation1.b,this.equation2.c)
    console.log(this.equation1.b+'    '+this.equation2.c)
    console.log(x)
    x= substrationFraction(this.equation1.c,x)
    console.log(x)
    if (x==0) {
        return 0;
    }
    x = divideFraction(x,this.equation1.a)
    console.log(x)
    return x;
}
function calculate() { 
    var x2 = getFirstForm('x2').value;
    var xy = getFirstForm('xy').value;
    var y2 = getFirstForm('y2').value;
    var x = getFirstForm('x').value;
    var y = getFirstForm('y').value;
    var a = getFirstForm('a').value;
    recordtext('Знайти екстремум функції','#condition','p')
    var condition =altMult(takeOutOne(x2),'x^2')+'+'+altMult3(takeOutOne(xy),'x','y')+'+'+altMult(takeOutOne(y2),'y^2')+'+'+altMult(takeOutOne(x),'x')+'+'+altMult(takeOutOne(y),'y')+'+'+a+'=0';
    recordtext('Знайдемо частинні похідні','#partial','p')
    condition = correctNorm(condition,6)
    recordElement(condition,'#condition','div')
    var derivativeX = createLinearEquation(2*x2,xy,x)
    var derivativeY = createLinearEquation(xy,2*y2,y)
    derivativeX = derivativeX.slice(0,derivativeX.length-2)
    derivativeY = derivativeY.slice(0,derivativeY.length-2)
    var partialX ='\u005C'+'frac{'+'\u005C'+'partial z}{'+'\u005C'+'partial x}='+derivativeX;
    var partialY ='\u005C'+'frac{'+'\u005C'+'partial z}{'+'\u005C'+'partial y}='+derivativeY;
    recordElement(partialX,'#partial','div')
    recordElement(partialY,'#partial','div')


    var equation1 = new Equation(2*x2,xy,x)
    var equation2 = new Equation(xy,2*y2,y)


    var system = new SystemEquation(equation1,equation2)
    recordtext("Знайдемо розв'язок системи рівнянь",'#systemEquation','p')
    recordElement(system.writeSystemEquation(),'#systemEquation','div')
    var product = NSK(new Array(system.equation1.a,system.equation2.a))
    var divider = system.equation1.a;
    system =system.multiplayEquations(product/system.equation1.a,product/system.equation2.a);
    recordElement(system.writeSystemEquation(),'#systemEquation','div')
    recordtext('Віднімемо від другого рівняння перше','#systemEquation','p')
    system = system.substractionEquation()
    system= system.multiplayEquations(divider/product,1)
    recordElement(system.writeSystemEquation(),'#systemEquation','div')
    var solvY= system.getY()
    if (typeof solvY != 'number') {
        solvY=solvY.isNum()
    }
    system = new SystemEquation(system.equation1,new Equation(0,1,solvY))
    recordElement(system.writeSystemEquation(),'#systemEquation','div')
    console.log(system)
    var solvX= system.getX()
    if (typeof solvX != 'number') {
        solvX=solvX.isNum()
    }

    system = new SystemEquation(new Equation(1,0,solvX),system.equation2)
    recordElement(system.writeSystemEquation(),'#systemEquation','div')
    recordtext('Перевіримо достатні умови екстремуму','#enoughCondition','p')
    recordElement('\u005C'+'Delta'+'=AC-B^2','#enoughCondition','div')
    recordElement('A='+'\u005C'+'frac{'+'\u005C'+'partial^2 z}{'+'\u005C'+'partial x^2}='+2*x2,'#enoughCondition','div')
    recordElement('C='+'\u005C'+'frac{'+'\u005C'+'partial^2 z}{'+'\u005C'+'partial y^2}='+2*y2,'#enoughCondition','div')
    recordElement('B='+'\u005C'+'frac{'+'\u005C'+'partial^2 z}{'+'\u005C'+'partial y '+'\u005C' +'partial x }='+xy,'#enoughCondition','div')
    if ((x2*y2*4-xy*xy)>0) {
        var str = '>0'
        var bool = true;
    } else if((x2*y2*4-xy*xy)<0) {
        var str = '<0';
        recordtext('Екстремум відсутній','#conclusion','p')
        var bool = false;
    } else {
        var str = '=0'
        recordtext('Потрібне додаткове дослідження','#conclusion','p')
        var bool = false;
    }
    recordElement('\u005C'+'Delta'+'='+mult(2*x2,2*y2)+'-'+correctMinus(xy)+'^2'+'='+(x2*y2*4-xy*xy)+str,'#enoughCondition','div')
    if (bool) {
        if (x2>0) {
        recordElement('A='+(2*x2)+'>0','#conclusion','div') 
        recordtext('Точка локального мінімуму','#conclusion','p')
        }
        if (x2<0) {
        recordElement('A='+(2*x2)+'<0','#conclusion','div') 
        recordtext('Точка локального максимуму','#conclusion','p')
        }
    }    
}