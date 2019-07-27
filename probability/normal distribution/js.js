function difLaplas (x) {
    return Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);
}
function roundTo4(a) {
    return Math.round(a*10000)/10000;
}
function intLaplas(add) {
    var a = 0;
    if (add<0) {
        a=add*(-1);
    } else {
        a=add;
    }
    var n=10000;
    var b=-5;
    var step = (a-b)/n;
    var unpair=0;
    var pair=0;
    var lap = step/3*(difLaplas(a)+difLaplas(b));
    for (var i=1;i<n;i=i+2) {
        b=b+step*2;
        unpair+=difLaplas(b);
    }
    b=-5;
    for (i=2;i<n-1;i=i+2) {
        b=b+step*2;
        pair+=difLaplas(b);
    } 
    if (add>0) {
    return roundTo4(lap+4*step/3*unpair+2/3*step*pair-0.5001); 
    } else {
        return -(roundTo4(lap+4*step/3*unpair+2/3*step*pair-0.5001));
    }
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

function calculateProbabilityInterval () {
    var mx = +document.querySelector('#mx').value;
    var a = +document.querySelector('#a').value;
    var b = +document.querySelector('#b').value;
    var dx = +document.querySelector('#dx').value;
    var minus1 = b +'-'+mx;
    var minus1 = a +'-'+mx;
    var helpStr = 'P(a<x<b)='+'&#92'+'Phi('+divide('b-M(X)','&#92'+'sigma(X)')+')-'+'&#92'+'Phi('+divide('a-M(X)','&#92'+'sigma(X)')+')';
    var helpStr1 = 'P('+a+'<x<'+b+')='+'&#92'+'Phi('+divide(b+'-'+mx,'&#92'+'sqrt{'+dx+'}')+')-'+'&#92'+'Phi('+divide(a+'-'+mx,'&#92'+'sqrt{'+dx+'}')+')='+'&#92'+'Phi('+roundTo4((b-mx)/Math.sqrt(dx))+')'+'-'+'&#92'+'Phi('+roundTo4((a-mx)/Math.sqrt(dx))+')=';
    var helpStr2 = '='+roundTo4(correctMinus(intLaplas((b-mx)/Math.sqrt(dx))))+'-'+(correctMinus(roundTo4(intLaplas((a-mx)/Math.sqrt(dx)))))+'='+roundTo4(intLaplas((b-mx)/Math.sqrt(dx))-intLaplas((a-mx)/Math.sqrt(dx)));
    var parent = document.querySelector('#probInterval');
    var div = document.createElement('div');
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    div.innerHTML = '<img src="https://latex.codecogs.com/gif.latex?'+helpStr+'" title="\Phi" />'    
    div1.innerHTML = '<img src="https://latex.codecogs.com/gif.latex?'+helpStr1+'" title="\Phi" />'   
    div2.innerHTML = '<img src="https://latex.codecogs.com/gif.latex?'+helpStr2+'" title="\Phi" />'
    parent.appendChild(div);
    parent.appendChild(div1);
    parent.appendChild(div2);
}
function mult(a,b) {
    return a+'&#92' +'cdot' +b;      
}
function probabilityOfSymmetryInterval () {
    var mx = +document.querySelector('#mx').value;
    var dx = +document.querySelector('#dx').value;
    var d = +document.querySelector('#d').value;
    var str = 'P(|X-M(X)|<d)=2'+'&#92'+'Phi('+divide('&#92'+'delta','&#92'+'sigma')+')=2'+'&#92'+'Phi ('+divide(d,'&#92'+'sqrt{'+dx+'}')+')=2'+'&#92'+'Phi('+roundTo4(d/roundTo4(Math.sqrt(dx)))+')=';
    var str2 = '='+mult(2,roundTo4(intLaplas(d/Math.sqrt(dx)))) + '='+ 2*roundTo4(intLaplas(d/Math.sqrt(dx)));
    var div = document.createElement('div');
    var div2 = document.createElement('div2');
    var parent = document.querySelector('#symmetryInterval');
    div.innerHTML = '<img src="https://latex.codecogs.com/gif.latex?'+str+'" title="\Phi" />'    
    div2.innerHTML = '<img src="https://latex.codecogs.com/gif.latex?'+str2+'" title="\Phi" />'    
    parent.appendChild(div);
    parent.appendChild(div2);
}

function breaker() {
    if (document.querySelector('#checkerForInterval').checked) {
        document.querySelector("p[description='interval']").style.display='block';
        document.querySelector("#probInterval").style.display='block';
        calculateProbabilityInterval();
    }    
    if (document.querySelector('#checkedForSymmetryInterval').checked) {
        document.querySelector("p[description='symmetryInterval']").style.display='block';
        document.querySelector("#probInterval").style.display='block';
        probabilityOfSymmetryInterval();
    }   
}