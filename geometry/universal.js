function createFormula(elem) {
    return '<img src="https://latex.codecogs.com/gif.latex?'+elem+'" title="\alpha" />';
}
function divide(a,b) { 
    return '&#92'+'frac{'+a+'}{'+b+'}';
    
}

function getElements (selector) {
    return document.querySelectorAll(selector);
}
function setPropertyToPoint(elem,width,height,color) { //надати властивості
    elem.style.position = 'absolute';
    elem.style.width =width+'px';
    elem.style.height=height+'px';
    elem.style.backgroundColor =color;
}
function correctMinus(a) {
    if (a<0) {
        a = '('+a+')'
    }
    return a;
}
function mult3 (a,d,c) {
    return correctMinus(a)+'&#92' +'cdot' +correctMinus(d)+'&#92' +'cdot' +correctMinus(c)
}
function mult4 (a,d,c,b) {
    return correctMinus(a)+'&#92' +'cdot'  +correctMinus(d)+'&#92' +'cdot' + correctMinus(c)+' \u005C'+ 'cdot' +correctMinus(b);
}
function vec(a) {
    return '&#92'+'overrightarrow{'+a+'}'
}
function factorial(n) { //факторіал
    var k=1;
    for (var i=1;i<n+1;i++) { 
        k=k*i;
    }
    return k;
}
function combination(n,k) { //комбінації
    return factorial(n)/(factorial(n-k)*factorial(k));
}
function roundTo4(a) {
    return Math.round(a*10000)/10000;
}function roundTo6(a) {
    return Math.round(a*1000000)/1000000;
}
function mult(a,b) {
    return correctMinus(a)+'&#92' +'cdot' +correctMinus(b);      
}
function getAnElement(selector) {
    return document.querySelector(selector);
}
function recordElement (str,parent,typeelement) {
    var par = document.querySelector(parent);
    var div = document.createElement(typeelement);
    div.innerHTML = createFormula(str);
    par.appendChild(div);
}
function recordtextAfter (str,parent,after,typeelement) {
    var par = document.querySelector(parent);
    var div = document.createElement(typeelement);
    var after =document.querySelector(after).nextSibling; 
    div.innerHTML = (str);
    par.insertBefore(div,after);
}
function recordElementAfter(str,parent,after,typeelement) {
    var par = document.querySelector(parent);
    var bef = document.querySelector(after).nextSibling.nextSibling;
    var div = document.createElement(typeelement);
    div.innerHTML = createFormula(str);
    par.insertBefore(div,bef);
}
function recordtext (str,parent,typeelement) {
    var par = document.querySelector(parent);
    var div = document.createElement(typeelement);
    div.innerHTML = (str);
    par.appendChild(div);
}
