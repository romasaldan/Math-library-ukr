var count = 0;
function co() {
    return function () {
        count++;
    }
}
var counter = co();
function getProbability() {
    var str = getFirstForm('probability').value;
    var k = str.indexOf('/');
    if (k==-1) {
        return +str;
    } else {
        var m = +str.slice(0,k);
        var n = +str.slice(k+1,str.length);
        return new Fraction(m,n)
    }
}
function probability(k,parent) {
    counter()
    var n = getFirstForm('n').value
    var p = getProbability()
    var q = substrationFraction(1,p)
    recordtext('A<sub>'+count+'</sub> - відбулося '+k+' '+(getFirstForm('nameOf').value),parent,'p')
    if (count==1) {
    recordtext('Враховуючи, що всі події незалежні і рівноймовірні, то ми можемо використати формулу Бернуллі',parent,'p'); 
    }
    if (typeof p =='number') {
        q = roundTo6(q)
        var frac1 = Math.pow(p,k)
        var frac2 = Math.pow(q,n-k)
    } else {
        var frac1 = p.power(k)
        var frac2 = q.power(n-k)
    }
    var result = multFracs(combination(+n,+k),frac1,frac2)
    if (typeof result == 'number') {
        var conclusion = roundTo6(result)
    } else {
        var conclusion =' '+ result+'=' + result.result(5);
    }
    var str ='P(X='+k+')=P_{'+n+'}^{'+k+'}'+'='+'C_'+n+'^'+k+'p^'+k+'q^'+(n-k)+'='+showComb(n,k)+'('+p+')'+'^{'+k+'}'+'('+q+')'+'^{'+(n-k)+'}='+conclusion;
    recordElement(str,parent,'div')
}
function probabilityInterval(k1,k2,parent,str) {
    counter()
    if (count==1) {
    recordtext('Враховуючи, що всі події незалежні і рівноймовірні, то ми можемо використати формулу Бернуллі',parent,'p'); 
    }
    var check = document.querySelectorAll('input[type="checkbox"]')
    
    if(typeof str !='undefined')    {
        recordtext('<b>A<sub>'+count+'</sub> - Відбулося ' + str+' '+ getFirstForm('nameOf').value+'</b>',parent,'p')
    }
    recordtext('A<sub>'+count+'</sub> - Відбулося від '+k1+' до '+ k2+' '+ getFirstForm('nameOf').value,parent,'p')
    var valueArr = [];
    valueArr[0] = 'P(A_{'+count+'})='
    var helpArr = [];
    helpArr[0] = '';
    helpArr[1] = '';
    valueArr[1] = '='
    valueArr[2] = '='
    var accumulated = 0;
    for (var i = k1;i<=k2;i++) {
        var n = +getFirstForm('n').value
        var p = getProbability()
        var q = substrationFraction(1,p)   
        if (typeof p =='number') {
            q = roundTo6(q)
            var frac1 = Math.pow(p,i)
            var frac2 = Math.pow(q,n-i)
        }   else  {
            var frac1 = p.power(i)
            var frac2 = q.power(n-i)
        }   
        valueArr[0] +='P_{'+n+'}^{'+i+'}+'
        helpArr[0]+='C_{'+n+'}^{'+i+'}p^{'+i+'}q^{'+(n-i)+'}+'
        valueArr[1] +=showComb(n,i)+'('+p+')'+'^{'+i+'}'+'('+q+')'+'^{'+(n-i)+'}'+'+';
        var result = multFracs(factorial(n)/(factorial(n-i)*factorial(i)),frac1,frac2)
        accumulated = addFraction(accumulated,result)
        if (typeof result == 'number') {
            var conclusion ='='+ (result)
        } else {
            var conclusion =' '+ result+'=' ;
        }
        if (typeof result == 'number') {
             valueArr[2]+=roundTo6(result)+'+'
        } else {
            valueArr[2]+=(result)+'+';
        }
    }
    for (var i=0;i<valueArr.length;i++) {
        valueArr[i] = valueArr[i].slice(0,valueArr[i].length-1) + '='
    }    
    for (var i=0;i<helpArr.length;i++) {
        helpArr[i] = helpArr[i].slice(0,helpArr[i].length-1) + '='
    }
        
    if (typeof accumulated != 'number') {
        
        valueArr[2]+='='+accumulated.result(5)
    } else {
        valueArr[2]+=roundTo6(accumulated)
    }
    valueArr[0]+=helpArr[0];
    for (var i=0;i<valueArr.length;i++) {
        recordElement(valueArr[i],parent,'div')
    }
}
function cal() {
    var k = getAnElement("input[prob='one']").value;
    var k1 = +getFirstForm('k1').value
    var k2 = +getFirstForm('k2').value    
    var n = getFirstForm('n').value    
    if (typeof k != 'undefined') {
        probability(k,'#probability')
    }
    var check = document.querySelectorAll('input[type="checkbox"]')
    if (check[0].checked) {
        probabilityInterval(k1,k2,'#fromTo')
    }
    if(check[1].checked) {
        var moreThan = getFirstForm('mor').value;
        if (getFirstForm('more').checked) {
            var str = getFirstForm('more').nextSibling.textContent +' '+(+moreThan);
            probabilityInterval(+moreThan+1,n,'#fromTo',str)
        } else {
            var str = document.getElementsByName('more')[1].nextSibling.textContent +' '+(+moreThan)
            probabilityInterval(+moreThan,n,'#fromTo',str)
        }
    }
    if(check[2].checked) {
        var lessThan = getFirstForm('less','#to').value;
        if (getFirstForm('les').checked) {
            var str = getFirstForm('les').nextSibling.textContent+' '+lessThan;
            probabilityInterval(0,+lessThan-1,'#from',str)
             
        } else {
            var str = document.getElementsByName('les')[1].nextSibling.textContent+' '+lessThan;
            probabilityInterval(0,+lessThan,'#from',str) 
        }
    }    

}