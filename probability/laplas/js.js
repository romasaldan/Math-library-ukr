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
    if (add>4) {
        return 0.5;
    }
    var n=100000;
    var b=-5;
    if (add<b) {
        return -0.5;
    }
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
function check() {
    if (count>=1) {
        return 1
    }
    var p = getFirstForm('probability').value;
    var n = getFirstForm('dimension').value;
    recordtext('Теорема Муавра-Лапласа дає задовільне наближення при npq>9, де q=1-p. Також потрібно врахувати, що n має бути достатньо велике','#check','p');
    recordElement('npq='+mult3(n,p,roundTo4(1-p))+'='+roundTo4(n*p*(1-p)),'#check','div')  
    if (n*p*(1-p)>9) {
        recordtext('В даному випадку теорема Лапласа дає непогане наближення','#check','p')
    } else {
        recordtext('В даному випадку теорема Лапласа не ефективна','#check','p')        
    }
}
var fi ='&#92' +'phi';
var Fi ='&#92' +'Phi';
var pi ='&#92' +'pi';
    var n = getFirstForm('dimension').value;
    var k1 = getFirstForm('from').value
    var k2 = getFirstForm('to').value  

function oneProbability() {
    var p = getFirstForm('probability').value;
    var n = getFirstForm('dimension').value;
    var k = getFirstForm('findProbAnElement').value;
    recordtext('Щоб обчислити імовірність, що відбулося рівно '+k+' успіхів у '+n+'  випробуваннях використаємо диференціальну теорему Муавра-Лапласа','#onlyKSuccess','p')
    recordElement('P_{'+'n'+'}('+'k'+')'+'&#92'+'approx'+divide(fi+'(x)','&#92'+'sqrt{npq}'),'#onlyKSuccess','div')
    recordElement(fi+'(x)='+divide('e^{'+divide('-x^2',2)+'}','&#92'+'sqrt{2'+pi+'}'),'#onlyKSuccess','div')
    var q = roundTo4(1-p);
    recordElement('x='+divide('k-np','&#92'+'sqrt{npq}'),'#onlyKSuccess','div')
    var calculating =  'x='+divide(k+'-'+mult(n,p),'&#92'+'sqrt{'+mult3(n,p,q)+'}') +'='+ roundTo4((k-n*p)/Math.sqrt(n*p*q))
    recordElement(calculating,'#onlyKSuccess','div')
    recordElement(fi+'('+roundTo4((k-n*p)/Math.sqrt(n*p*q))+')='+divide('e^{'+divide('-'+correctMinus(roundTo4((k-n*p)/Math.sqrt(n*p*q)))+'^2',2)+'}','&#92'+'sqrt{2'+pi+'}')+'='+roundTo4(difLaplas(((k-n*p)/Math.sqrt(n*p*q)))),'#onlyKSuccess','div')
    recordElement('P_{'+n+'}('+k+')='+divide(roundTo4(difLaplas(((k-n*p)/Math.sqrt(n*p*q)))),'&#92'+'sqrt{'+mult3(n,p,q)+'}')+'='+roundTo4(difLaplas(((k-n*p)/Math.sqrt(n*p*q)))/Math.sqrt(n*p*q)),'#onlyKSuccess','div')
}
var count = 0;
function counter() {
    return function () {
        count++;
    }
}
var co = counter();

//oneProbability()
function findProbabilityFromTo(k1,k2,parent) {
    co()
    var n = getFirstForm('dimension').value;
    if (k1==0) {
        recordtext('Знайдемо імовірність, що відбудеться не більше ніж '+k2+' випробовувань',parent,'p')
    }
    if (k2==n) {
        recordtext('Знайдемо імовірність, що відбудеться не менше ніж '+k1+' випробовувань',parent,'p')
    }
    var p = getFirstForm('probability').value;
    var q =roundTo4(1-p) 
    if (count==1) {
        recordtext('Для того щоб обчислити імовірність, що відбудеться '+k1+'&le;'+' k'+'&le; '+k2+' успіхів використаємо формулу Муавра Лапласа',parent,'p')
        recordElement('P(k_1'+'&#92'+'leq '+'k'+'&#92'+'leq '+'k_2)'+'&#92'+'approx'+Fi+'('+divide('k_2-np','&#92'+'sqrt{npq}')+')'+'-'+Fi+'('+divide('k_1-np','&#92'+'sqrt{npq}')+')',parent,'p')
    }
    var x1 = roundTo4((k1-n*p)/Math.sqrt(n*p*q));
    var x2 = roundTo4((k2-n*p)/Math.sqrt(n*p*q));
    if (count==1) {
        recordtext('Ф -інтегральна функція Лапласа',parent,'p') 
    }
    recordElement('x_1='+divide('k_1-np','&#92'+'sqrt{npq}')+'='+divide(k1+'-'+mult(n,p),'&#92'+'sqrt{'+mult3(n,p,q)+'}')+'='+x1,parent,'p')
    recordElement('x_2='+divide('k_2-np','&#92'+'sqrt{npq}')+'='+divide(k2+'-'+mult(n,p),'&#92'+'sqrt{'+mult3(n,p,q)+'}')+'='+x2,parent,'p')
    recordElement('P('+k1+'&#92'+'leq '+'k'+'&#92'+'leq '+k2+')'+'&#92'+'approx'+Fi+' ('+x2+')'+'-'+Fi+'('+x1+')'+'&#92'+'approx'+correctMinus(intLaplas(x2))+'-'+correctMinus(intLaplas(x1))+'=',parent,'p')
    recordElement('='+roundTo4(intLaplas(x2)-intLaplas(x1)),parent,'p')
    
}
var fromTo = getFirstForm('fromTo').value
var toN = getFirstForm('toN').value
function processingData() {
    var n = getFirstForm('dimension').value;
    var k1 = getFirstForm('from').value
    var k2 = getFirstForm('to').value    
    check();
    oneProbability()
    if (getFirstForm('interval').checked) {
        findProbabilityFromTo(k1,k2,'#fromTo')
    }
    if (getFirstForm('toN').checked) {
        findProbabilityFromTo(0,getFirstForm('toNSucsess').value,'#ToN')
    }
    if (getFirstForm('fromTo').checked) {
        findProbabilityFromTo(getFirstForm('from0').value,n,'#from0')
    }
}
