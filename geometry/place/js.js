function Point(x,y,mark) {
    this.x = x;
    this.y = y;
    this.mark = mark;
}
Point.prototype.showPoint = function(parentselector,after) {
    var str = this.mark+'=('+this.x+';'+this.y+')'
    if (typeof after=='undefined') {
        recordElement(str,parentselector,'div')
    } else {
        recordElementAfter(str,parentselector,after,'div')
    }
}
function lengthSide (a,b) {
    return Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2));
}
function Side(a,b) {
    this.A = a;
    this.B = b;
    this.length = lengthSide(this.A,this.B);
    this.markSide = this.A.mark+this.B.mark;
}
Side.prototype.getNormVector =function () {
        var n = new Vector (this.A,this.B);
        var x = n.x; 
        var y = n.y;
        n.x=y;
        n.y=-x;
        n.markVector = vec('n_{'+this.A.mark+this.B.mark+'}')
        return n;
}
Side.prototype.getMiddlePoint = function () {
        var point = {};
        point.x = (+this.A.x+(+this.B.x))/2
        point.y = (+this.A.y+(+this.B.y))/2
        point.mark = 'E_{'+this.A.mark+this.B.mark+'}'
        return new Point(point.x,point.y,point.mark);
}
Side.prototype.showCalculatingMiddlePoint = function (parentSelector) {
        var point = this.getMiddlePoint();
        var strX = point.mark+'='+divide(this.A.mark+'_{x}'+'+'+this.B.mark+'_{x}',2)+'='+divide(correctMinus(this.A.x)+'+'+correctMinus(this.B.x),2)+'='+point.x
        var strY = point.mark+'='+divide(this.A.mark+'_{y}'+'+'+this.B.mark+'_{y}',2)+'='+divide(correctMinus(this.A.y)+'+'+correctMinus(this.B.y),2)+'='+point.y
        recordtext('Обчислимо координати середньої точки ' +this.markSide,parentSelector,'p')
        recordElement(strX,parentSelector,'div');
        recordElement(strY,parentSelector,'div');
        point.showPoint(parentSelector)
}
function Vector(a,b) {
    this.x = roundTo4(b.x-a.x);
    this.y = roundTo4(b.y-a.y);
    this.mark = a.mark +''+ b.mark;
    this.length = Math.sqrt(this.x*this.x+this.y*this.y);
    this.markVector = vec(a.mark+b.mark);   
}
Vector.prototype.showVector = function (parentselector,after) {
    var str = this.markVector+'=('+this.x+';'+this.y+')';
    if (typeof after=='undefined') {
        recordElement(str,parentselector,'div')
    } else {
        recordElementAfter(str,parentselector,after,'div')
    }
}
Vector.prototype.showModulOfVector = function (parentselector,after) {
    var str ='|'+ this.markVector+'|='+'\u005C'+'sqrt{'+correctMinus(this.x)+'^2+'+correctMinus(this.y)+'^2}='+roundTo4(this.length)
    if (typeof after=='undefined') {
        recordElement(str,parentselector,'div')
    } else {
        recordElementAfter(str,parentselector,after,'div')
    }
}
function NSD(a,b,c) {
    var A = [];
    A[0]=a;
    A[1]=b;
    A[2]=c;
    var n = A.length, x = Math.abs(A[0]);
    for (var i = 1; i < n; i++)
     { var y = Math.abs(A[i]);
       while (x && y){ x > y ? x %= y : y %= x; }
       x += y;
     }
    return x;
}
function correctNormEquation(str) {
    var  k1 =str.indexOf('--');
    var  k2 =str.indexOf('+-');
    var result = '';
    if ((k1!=-1)&&(k2!=-1)) {
        result=str.slice(0,k1)+'+'+str.slice(k1+2,k2)+'-'+str.slice(k2+2);
    } else if (k1!=-1) {
        result=str.slice(0,k1)+'+'+str.slice(k1+2)
    } else if (k2!=-1) {
        result = str.slice(0,k2)+'-'+str.slice(k2+2)
    } else {
        result = str;
    }
    
    return result;
}
function straight(a,b) {
    l= {
    };
    l.k = (b.y-a.y)/(b.x-a.x);
    l.b = a.y-a.x*(b.y-a.y)/(b.x-a.x);
    return l;
}
function recordStraightEquationByUsingNormVector(Vector,Point,parent) {
    var explaining=[];
    var solving=[];
    explaining[0] = 'Запишемо рівняння висоти з точки '+Point.mark+' і за допомогою вектора ' + createFormula(Vector.markVector);
    solving[0]='('+mult('x-'+Point.x+')',Vector.x)+'+'+mult('(y-'+Point.y+')',Vector.y)+'=0';
    solving[0]=correctNormEquation(solving[0]);
    solving[0]=correctNormEquation(solving[0]);
    solving[0]=correctNormEquation(solving[0]);
    explaining[1] = 'Запишемо рівняння прямої у загальному вигляді'
    solving[1]=mult('('+'x-'+Point.x+')',Vector.x)+'+'+mult('('+'y-'+Point.y+')',Vector.y)+'=0'
    solving[1]=correctNormEquation(solving[1]);
    solving[1]=correctNormEquation(solving[1]);
    solving[1]=correctNormEquation(solving[1]);
    solving[2]= mult('x',' '+correctMinus(Vector.x))+'-'+mult(Point.x,' '+correctMinus(Vector.x))+'+'+mult('y',' '+correctMinus(Vector.y))+'-'+mult(Point.y,' '+correctMinus(Vector.y))+'=0';
        solving[2]=correctNormEquation(solving[2]);
        solving[2]=correctNormEquation(solving[2]);
        solving[2]=correctNormEquation(solving[2]);
    if (Vector.x==0) {
         explaining[2]= 'Рівняння матиме вигляд';
         solving[3] = 'y=-'+Point.y;
        for (var i=0;i<explaining.length;i++) {
            recordtext(explaining[i],parent,'p');
            recordElement(solving[i],parent,'div')
        }
        recordElement(solving[i],parent,'div');
        return 1;
    }
    if (Vector.y==0) {
         explaining[2] = 'Рівняння матиме вигляд';
         solving[3] = 'x=-'+Point.y;
        for (var i=0;i<explaining.length;i++) {
            recordtext(explaining[i],parent,'p');
            recordElement(solving[i],parent,'div')
        }
        recordElement(solving[i],parent,'div');
        return 1;
    }    
    var cal = roundTo4(Vector.x*(-Point.x)-Vector.y*Point.y)
    solving[3] = Vector.x+'\u005C'+'cdot'+' '+'x'+'+'+Vector.y+'\u005C'+'cdot'+' '+'y'+'+'+cal+'=0';
    var divider = NSD(Vector.y,Vector.x,Vector.x*Point.y-Vector.y*Point.x)
    solving[3]=correctNormEquation(solving[3]);
    solving[3]=correctNormEquation(solving[3]);
    solving[3]=correctNormEquation(solving[3]);
    var k = 0;
    var a = Vector.x/divider;
    var b = Vector.y/divider;
    var c = roundTo4((Vector.x*(-Point.x)-Vector.y*Point.y)/divider); 
    var bool = false;
    if (a=='1') {
        a='';
        k++;   
         bool = true;
    } else if (a=='-1') {
        a='-';
        k++;
    } else {;
        a=a+'\u005C'+'cdot';
    }
    if (b=='1') {
        b='';
        k++;
    } else if (b=='-1') {
        b='-';
        k++;
    } else {
        b=b+'\u005C'+'cdot'+' '
    }
    if (k>0) {
        solving[4]= a+' '+'x'+'+'+b+'y'+'+'+c+'=0';
        solving[4]=correctNormEquation(solving[4]); 
        solving[4]=correctNormEquation(solving[4]); 
        solving[4]=correctNormEquation(solving[4]); 
    }
    for (var i=0;i<2;i++) {
        recordtext(explaining[i],parent,'p')
        recordElement(solving[i],parent,'div')
    }
    for (i=2;i<solving.length;i++) {
        if (i==3) {
            if (bool) {
                continue;
            }
        }
        recordElement(solving[i],parent,'div') 
    }
}
Side.prototype.showSearchingStraightEquation=function(parentselector) {
    var explain1 = 'Обчисимо координати напрямного вектора';
    var vect = new Vector(this.A,this.B);
    var solv1 = vect.markVector+'=('+(this.B.x-this.A.x)+';'+(this.B.y-(this.A.y))+')';
    var explain2 = 'Запишемо рівняння прямої в канонічному вигляді';
    var solv2 = divide('x-'+correctMinus(this.A.x),vect.x)+'='+divide('y-'+correctMinus(this.A.y),vect.y);
    if (vect.x==0) {
        var explain3 = 'Рівняння матиме вигляд';
        var solv3 = 'x='+this.A.x;
        recordtext(explain1,parentselector,'p');
        recordElement(solv1,parentselector,'div')
        recordtext(explain2,parentselector,'p');
        recordElement(solv2,parentselector,'div')
        recordtext(explain3,parentselector,'p');
        recordElement(solv3,parentselector,'div')
        return 1;
    }
    if (vect.y==0) {
        var explain3 = 'Рівняння матиме вигляд';
        var solv3 = 'y='+this.A.y;
        recordtext(explain1,parentselector,'p');
        recordElement(solv1,parentselector,'div')
        recordtext(explain2,parentselector,'p');
        recordElement(solv2,parentselector,'div')
        recordtext(explain3,parentselector,'p');
        recordElement(solv3,parentselector,'div')
        return 1;
    }
    var explain3 = 'Запишемо в загальному вигляді';
    var solv3 = mult('(x-'+correctMinus(this.A.x)+')',vect.y)+'='+mult('(y-'+correctMinus(this.A.y)+')',vect.x);
    var solv4= vect.y+'\u005C'+'cdot'+' '+'x'+'-'+vect.x+'\u005C'+'cdot'+' '+'y'+'+'+roundTo4(vect.x*this.A.y-vect.y*this.A.x)+'=0';
    var divider = NSD(vect.y,vect.x,vect.x*this.A.y-vect.y*this.A.x)
    var a = vect.y/divider;
    var b = vect.x/divider;
    var c = roundTo4((vect.x*this.A.y-vect.y*this.A.x)/divider);
    if (a=='1') {
        a=''
    } else if (a=='-1') {
        a='-'
    } else {;
        a=a+'\u005C'+'cdot';
    }
    if (b=='1') {
        b=''
    } else if (b=='-1') {
        b='-'
    } else {
        b=b+'\u005C'+'cdot'+' '
    }
    var solv5= a+' '+'x'+'-'+b+'y'+'+'+c+'=0';
    solv4=correctNormEquation(solv4);
    solv5=correctNormEquation(solv5);
    recordtext(explain1,parentselector,'p');
    recordElement(solv1,parentselector,'div')
    recordtext(explain2,parentselector,'p');
    recordElement(solv2,parentselector,'div')
    recordtext(explain3,parentselector,'p');
    recordElement(solv3,parentselector,'div')
    recordElement(solv4,parentselector,'div')
    recordElement(solv5,parentselector,'div')
}
Side.prototype.showLengthSide = function (parentselector,after) {
    var str = this.markSide+'='+'\u005C'+'sqrt{('+this.A.x+'-'+correctMinus(this.B.x)+')^2+('+this.A.y+'-'+correctMinus(this.B.y)+')^2}='+roundTo4(this.length);
    if (typeof after=='undefined') {
        recordElement(str,parentselector,'div')
    } else {
        recordElementAfter(str,parentselector,after,'div')
    }    
}
function Triangle(a,b,c) {
    this.A = a;
    this.B = b;
    this.C = c; 
    this.mark = '\u005C'+'triangle'+' '+this.A.mark+this.B.mark+this.C.mark
    this.AB = new Side(a,b)
    this.AC = new Side(a,c)
    this.BC = new Side(b,c)
    this.medianaA = new Side(this.A,this.BC.getMiddlePoint())
    this.medianaB = new Side(this.B,this.AC.getMiddlePoint())
    this.medianaC = new Side(this.C,this.AB.getMiddlePoint())    
}
Triangle.prototype.place = function (parent) {
    recordtext('Площу обчислимо за формулою',parent,'p')
    recordElement('S='+divide(1,2)+'ah',parent,'div');
    recordtext('Нехай a=|AB|, a h висота проведена з точки c',parent,'p');
    this.AB.showLengthSide(parent)
    this.AB.showSearchingStraightEquation(parent)
    var h = lengthHeight(this.C,this.AB,parent)
    var result = 'S=' +divide(1,2)+mult(roundTo4(h),roundTo4(this.AB.length))+'='+roundTo4(1/2*h*this.AB.length)
    recordElement(result,parent,'div')
}
 function lengthHeight(Point,Side,parent) {
    recordtext('Обчислимо відстань від точки '+Point.mark+'(x<sub>0</sub>;y<sub>0</sub>) до прямої '+Side.markSide +' за формулою:',parent,'p')
    var formula = 'd('+Point.mark+',l_{'+Side.markSide+'})='+divide('|Ax_0+By_0+C|','\u005C'+'sqrt{A^2+B^2}')
    recordtext('де А і B компоненти нормального вектора до прямої '+Side.markSide,parent,'p')
    var n = Side.getNormVector();
    var a = n.x;
    var b = n.y;
    var c = -n.x*Side.A.x-n.y*Side.A.y;
    var calculating='d('+Point.mark+',l_{'+Side.markSide+'})='+'|'+divide(mult(a,Point.x)+'+'+mult(b,Point.y)+'+'+correctMinus(c),'\u005C'+'sqrt{'+correctMinus(a)+'^2'+'+'+correctMinus(b)+'^2'+'}')+'|='+divide('|'+(a*Point.x+b*Point.y+c)+'|','\u005C'+'sqrt{'+(n.x*n.x+n.y*n.y)+'}')+'='+roundTo4(Math.abs((a*Point.x+b*Point.y+c)/Math.sqrt(n.x*n.x+n.y*n.y)))
    recordElement(formula,parent,'div')
    recordElement(calculating,parent,'div')
    if ((a*Point.x+b*Point.y+c)==0) {
        recordtext('Точка '+Point.mark+' належить прямій '+Side.markSide,parent,'p')
    }
     return Math.abs((a*Point.x+b*Point.y+c)/Math.sqrt(n.x*n.x+n.y*n.y))
}
function scalProduct(vector1,vector2) {
    return vector1.x*vector2.x+vector1.y*vector2.y;
}
function showScalProduct(vector1,vector2,parentselector,after) {
    var explain = 'Обчислимо скалярний добуток векторів '+createFormula(vector1.markVector)+' і '+createFormula(vector2.markVector);
    var str ='('+vector1.markVector+';'+vector2.markVector+')='+mult(vector1.x,vector2.x)+'+'+mult(vector1.y,vector2.y)+'='+scalProduct(vector1,vector2);

    if (typeof after=='undefined') {
        recordtext(explain,parentselector,'p')
        recordElement(str,parentselector,'div')
    } else {
        recordtextAfter(explain,parentselector,after,'p')
        recordElementAfter(str,parentselector,after,'div')
    }     
}
function getDegree(number){
    var degree = Math.round(number*100)/100;
    var minute = Math.round(((degree  - Math.round(degree))*0.6)*100)/100;
    degree = Math.round(degree);
    minute+=' ';
    minute = minute.slice(2,minute.length);
    return degree+'^'+'\u005C'+'circ '//+minute+"'"
}
function findAngle (vector1,vector2,parentselector,after){
    var explain = 'Обчислимо косинус кута між векторами '+createFormula(vector1.markVector)+' і  '+createFormula(vector2.markVector)+' за формулою:';
    var solv ='cos('+'\u005C'+'angle'+'('+(vector1.markVector)+';'+(vector2.markVector)+'))='+divide('('+(vector1.markVector)+';'+(vector2.markVector)+')',mult('|'+vector1.markVector+'|','|'+vector2.markVector+'|'));
    if (typeof after=='undefined') {
        recordtext(explain,parentselector,'p')
        recordElement(solv,parentselector,'div')
    } else {
        recordtextAfter(explain,parentselector,after,'p')
        recordElementAfter(solv,parentselector,after,'div')
    }
    vector1.showModulOfVector(parentselector);
    vector2.showModulOfVector(parentselector);
    showScalProduct(vector1,vector2,parentselector,parentselector+' div');
    var solv2 = 'cos('+'\u005C'+'angle'+'('+(vector1.markVector)+';'+(vector2.markVector)+'))='+divide(scalProduct(vector1,vector2),mult(''+roundTo4(vector1.length),' '+roundTo4(vector2.length)))+'='+roundTo4(scalProduct(vector1,vector2)/(vector1.length*vector2.length));
    var solv3 = 'arccos('+'\u005C'+'angle'+'('+(vector1.markVector)+';'+(vector2.markVector)+'))'+'=arccos('+roundTo4(scalProduct(vector1,vector2)/(vector1.length*vector2.length))+')='+roundTo4(Math.acos(scalProduct(vector1,vector2)/(vector1.length*vector2.length)))
    var explain2 = 'Градусна міра кута буде рівна:'
    var solv4 ='\u005C'+'angle'+'('+(vector1.markVector)+';'+(vector2.markVector)+')'+'=arccos('+roundTo4(scalProduct(vector1,vector2)/(vector1.length*vector2.length))+')'+divide(180,'\u005C'+'pi')+'\u005C'+'approx'+getDegree(180/Math.PI*Math.acos(scalProduct(vector1,vector2)/(vector1.length*vector2.length)))
    recordElement(solv2,parentselector,'div')
    recordElement(solv3,parentselector,'div')
    recordtext(explain2,parentselector,'p');
    recordElement(solv4,parentselector,'div')
}
function createProblemForm() {
    getAnElement('#problem').style.display = 'block';
    var A = new Point(getAnElement('#ax').value,getAnElement('#ay').value,getAnElement('#aMark').value);
    var B = new Point(getAnElement('#bx').value,getAnElement('#by').value,getAnElement('#bMark').value);
    var C = new Point(getAnElement('#cx').value,getAnElement('#cy').value,getAnElement('#cMark').value);
    var abc = new Triangle(A,B,C);  
    var parent = getAnElement('#problem form');
    getAnElement('#AB').innerHTML = abc.AB.markSide
    getAnElement('#AC').innerHTML = abc.AC.markSide
    getAnElement('#BC').innerHTML = abc.BC.markSide
    getAnElement('#eAB').innerHTML = abc.AB.markSide
    getAnElement('#eAC').innerHTML = abc.AC.markSide
    getAnElement('#eBC').innerHTML = abc.BC.markSide
    getAnElement('#angleA').innerHTML = abc.A.mark
    getAnElement('#angleB').innerHTML = abc.B.mark
    getAnElement('#angleC').innerHTML = abc.C.mark
    getAnElement('#mA').innerHTML=abc.A.mark
    getAnElement('#mB').innerHTML=abc.B.mark
    getAnElement('#mC').innerHTML=abc.C.mark 
    getAnElement('#lmA').innerHTML=abc.A.mark
    getAnElement('#lmB').innerHTML=abc.B.mark
    getAnElement('#lmC').innerHTML=abc.C.mark   
    getAnElement('#hA').innerHTML=abc.A.mark
    getAnElement('#hB').innerHTML=abc.B.mark
    getAnElement('#hC').innerHTML=abc.C.mark
    getAnElement('#lhA').innerHTML=abc.A.mark
    getAnElement('#lhB').innerHTML=abc.B.mark
    getAnElement('#lhC').innerHTML=abc.C.mark
    getAnElement('#abc').innerHTML= createFormula(abc.mark)     
}
function calculate () {
    getAnElement('#problem').style.display = 'block';
    var A = new Point(getAnElement('#ax').value,getAnElement('#ay').value,getAnElement('#aMark').value);
    var B = new Point(getAnElement('#bx').value,getAnElement('#by').value,getAnElement('#bMark').value);
    var C = new Point(getAnElement('#cx').value,getAnElement('#cy').value,getAnElement('#cMark').value);
    var abc = new Triangle(A,B,C);  
    if (getAnElement('#AB').previousSibling.previousSibling.checked) {
        abc.AB.showLengthSide('#length2')
    }
    if (getAnElement('#AC').previousSibling.previousSibling.checked) {
        abc.AC.showLengthSide('#length2')
    }
    if (getAnElement('#BC').previousSibling.previousSibling.checked) {
        abc.BC.showLengthSide('#length2')
    }
    if(getAnElement('#eAB').previousSibling.previousSibling.checked) {
        abc.AB.showSearchingStraightEquation('#EAB')
    }
    if(getAnElement('#eAC').previousSibling.previousSibling.checked) {
        abc.AC.showSearchingStraightEquation('#EAB')
    }
    if(getAnElement('#eBC').previousSibling.previousSibling.checked) {
        abc.BC.showSearchingStraightEquation('#EAB')
    }
    if(getAnElement('#angleA').previousSibling.previousSibling.checked) {
        findAngle(new Vector(abc.A,abc.B),new Vector(abc.A,abc.C),'#angle')
    }
    if(getAnElement('#angleB').previousSibling.previousSibling.checked) {
       findAngle(new Vector(abc.B,abc.A),new Vector(abc.B,abc.C),'#angle')
    }
    if(getAnElement('#angleC').previousSibling.previousSibling.checked) {
        findAngle(new Vector(abc.C,abc.A),new Vector(abc.C,abc.B),'#angle')
    }
    if(getAnElement('#mA').previousSibling.previousSibling.checked) {
        abc.BC.showCalculatingMiddlePoint('#mediana')
        abc.medianaA.showSearchingStraightEquation('#mediana')
    }
    if(getAnElement('#mB').previousSibling.previousSibling.checked) {
       abc.AC.showCalculatingMiddlePoint('#mediana')
        abc.medianaB.showSearchingStraightEquation('#mediana')
    }
    if(getAnElement('#mC').previousSibling.previousSibling.checked) {
        abc.AB.showCalculatingMiddlePoint('#mediana')
        abc.medianaC.showSearchingStraightEquation('#mediana')
    } 
    if(getAnElement('#lmA').previousSibling.previousSibling.checked) {
        if (!getAnElement('#mA').previousSibling.previousSibling.checked) {
            abc.BC.showCalculatingMiddlePoint('#mediana')
        }
        recordtext('Довжина медіани рівна','#mediana','p')
        abc.medianaA.showLengthSide('#mediana')
    }
    if(getAnElement('#lmB').previousSibling.previousSibling.checked) {
        if (!getAnElement('#mB').previousSibling.previousSibling.checked) {
            abc.AC.showCalculatingMiddlePoint('#mediana')
        }
        recordtext('Довжина медіани рівна','#mediana','p')
        abc.medianaB.showLengthSide('#mediana')
    }
    if(getAnElement('#lmC').previousSibling.previousSibling.checked) {
         if (!getAnElement('#mC').previousSibling.previousSibling.checked) {
            abc.AB.showCalculatingMiddlePoint('#mediana')
        }
        recordtext('Довжина медіани рівна','#mediana','p')        
        abc.medianaC.showLengthSide('#mediana')
    }
    if(getAnElement('#hA').previousSibling.previousSibling.checked){
        recordtext('Враховуючи, що напрямний вектор протилежної сторони має вигляд','#hAB','p')
        var p = new Vector(abc.B,abc.C);
        p.showVector('#hAB')        
        recordtext('<b>Запишемо рівняння висоти з точки С</b>','#hAB','p')
         var n =abc.BC.getNormVector()
         //n.showVector('#hAB')
         recordStraightEquationByUsingNormVector(p,abc.A,'#hAB')
    } 
    if(getAnElement('#hB').previousSibling.previousSibling.checked){
        recordtext('Враховуючи, що напрямний вектор має вигляд','#hAB','p')
        var p = new Vector(abc.A,abc.C);
        p.showVector('#hAB')
        recordtext('<b>Запишемо рівняння висоти з точки С</b>','#hAB','p')
        var n =abc.AC.getNormVector()
        // n.showVector('#hAB')
        recordStraightEquationByUsingNormVector(p,abc.B,'#hAB')        
    }
    if(getAnElement('#hC').previousSibling.previousSibling.checked){
        recordtext('Враховуючи, що напрямний вектор має вигляд','#hAB','p')
        var p = new Vector(abc.A,abc.B);
        p.showVector('#hAB')
        recordtext('<b>Запишемо рівняння висоти з точки С</b>','#hAB','p')
        var n =abc.AB.getNormVector()
        //n.showVector('#hAB')
        recordStraightEquationByUsingNormVector(p,abc.C,'#hAB')        
    }  
    if(getAnElement('#lhA').previousSibling.previousSibling.checked){
        recordtext('Обчислимо довжину висоти з точки '+abc.A.mark,'#hAB','p')
        recordtext('В даному випадку це відстань до протилежної прямої','#lengthOfHeight','p')
        lengthHeight(abc.A,abc.BC,'#lengthOfHeight')
    } 
    if(getAnElement('#lhB').previousSibling.previousSibling.checked){
        recordtext('Обчислимо довжину висоти з точки '+abc.B.mark,'#hAB','p')
        recordtext('В даному випадку це відстань до протилежної прямої','#lengthOfHeight','p')
        lengthHeight(abc.B,abc.AC,'#lengthOfHeight')       
    }
    if(getAnElement('#lhC').previousSibling.previousSibling.checked){
        recordtext('Обчислимо довжину висоти з точки '+abc.C.mark,'#hAB','p')
        recordtext('В даному випадку це відстань до протилежної прямої','#lengthOfHeight','p')
        lengthHeight(abc.C,abc.AB,'#lengthOfHeight')       
    }
    if(getAnElement('#abc').nextSibling.nextSibling.checked){
    abc.place('#place')
    }

}
