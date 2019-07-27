var count =0; //кількість запусків
function co() {
    return function () {
        count++;
    }
}
var counter = co()

function calculate() {
    var condition1 = getAnElement('input[placeholder="k1"]').value
    var condition2 = getAnElement('input[placeholder="k2"]').value
    var describe1 = getAnElement('input[placeholder="describe1"]').value
    var describe2 = getAnElement('input[placeholder="describe2"]').value
    var describe = getAnElement('input[placeholder="describe"]').value
    var take = getFirstForm('take').value
    recordtext('Було '+condition1+' '+describe1 +' i '+ condition2+' '+describe2,'#condition','p')
    recordtext('Витягнули ' +take +' '+ describe,'#condition','p')
}
function probability(value,parent) {
    counter();
    var condition1 = +getAnElement('input[placeholder="k1"]').value
    var condition2 = +getAnElement('input[placeholder="k2"]').value
    var describe1 = getAnElement('input[placeholder="describe1"]').value
    var describe2 = getAnElement('input[placeholder="describe2"]').value
    var describe = getAnElement('input[placeholder="describe"]').value
 //   var k = +getAnElement('input[prob="one"]').value
    var take = +getFirstForm('take').value
    recordtext('A<sub>'+count+'</sub> - витягнули '+value + ' '+describe1,parent,'p');
    var result = new Fraction(combination(condition1,value)*combination(condition2,take-value),combination(condition1+condition2,take))
    var str =divide(('C_{'+condition1+'}^{'+value+'}'+'C_{'+condition2+'}^{'+(take-value)+'}'),'C_{'+(+condition1+(+condition2))+'}^{'+take+'}')+'='+divide(showComb(condition1,value)+showComb(condition2,take-value),showComb((+condition1+(+condition2)),take))+'='+result+'&#92'+'approx '+result.result(5)    
    recordElement('P(A_{'+count+'})='+str,parent,'div')
}    
function  probabilityInterval(k1,k2,desc,parent,helpDescription) {
    var condition1 = +getAnElement('input[placeholder="k1"]').value
    var condition2 = +getAnElement('input[placeholder="k2"]').value       
    if (k1==Math.min(k2,condition1))  {
        recordtext('Імовірність того, що знайшли' +helpDescription+' '+ k1+' '+desc+' буде рівна '+ 'A<sub>'+(count+1)+'</sub>',parent,'p') 
        probability(k1,parent)
        return 1 
    }    
    if (k2==Math.max(k1,condition2))  {
        recordtext('Імовірність того, що знайшли' +helpDescription+' '+ k1+' '+desc+' буде рівна '+ 'A<sub>'+(count+1)+'</sub>',parent,'p') 
        probability(k1,parent)
        return 1 
    }
    counter();
    var k = +getAnElement('input[prob="one"]').value   
    var take = +getFirstForm('take').value;    
    recordtext('A<sub>'+count+'</sub> - ' +' Вийняли від '+k1+ ' до '+Math.min(k2,condition1)+ ' '+desc,parent,'p')
    var str = [];
    str[0]='P(A_'+count+')='
    for (var i=k1;i<=k2;i++) {
        if (condition2<(take-i)) {
            continue;
        }
        if (i>take) {
            continue;
        }

        str[0]+='P(x='+i+')';
        if (i==k2) {
            str[0]+='=' 
        } else {
            str[0]+='+'
        }
    }
    str[0]=str[0].slice(0,str[0].length-1)+'='
    str[1]='='
    for (var i=k1;i<=Math.min(k2,condition1);i++) {
        if (condition2<(take-i)) {
            continue;
        }
        if (i>take) {
            continue;
        }
        
        str[1]+=divide(('C_{'+condition1+'}^{'+i+'}'+'C_{'+condition2+'}^{'+(take-i)+'}'),'C_{'+(+condition1+(+condition2))+'}^{'+take+'}')
        if (i==k2) {
            str[1]+='=' 
        } else {
            str[1]+='+'
        }        
    }
     str[1] = str[1].slice(0,str[1].length-1)+'='     
    for (var i=k1;i<=Math.min(k2,condition1);i++) { 
        if (condition2<(take-i)) {
            continue;
        }
        if (i>take) {
            continue;
        }
        
        str[1]+=divide(showComb(condition1,i)+showComb(condition2,take-i),showComb((+condition1+(+condition2)),take))
        if (i==k2) {
            str[1]+='=' 
        } else {
            str[1]+='+'
        }         
    }
     str[1] = str[1].slice(0,str[1].length-1)+'=' 
    str[2]='='
     var result = []
     var accumulatedResult = 0;
    for (var i=k1;i<=Math.min(k2,condition1);i++) {
        if (condition2<(take-i)) {
            continue;
        }
        if (i>take) {
            continue;
        }        
        result[i] = new Fraction(combination(condition1,i)*combination(condition2,take-i),combination(condition1+condition2,take))
        accumulatedResult = addFraction(accumulatedResult,result[i])
        str[2]+=result[i]
        if (i==k2) {
            str[2]+='=' 
        } else {
            str[2]+='+'
        }         
    }
    str[2]+=accumulatedResult+'='+roundTo4(accumulatedResult.numerator/accumulatedResult.denominator)
    for (var i=0;i<str.length;i++) {
        recordElement(str[i],parent,'div')
    }
}
function processData() {
    var condition1 = +getAnElement('input[placeholder="k1"]').value
    var condition2 = +getAnElement('input[placeholder="k2"]').value
    var describe1 = getAnElement('input[placeholder="describe1"]').value
    var describe2 = getAnElement('input[placeholder="describe2"]').value
    var describe = getAnElement('input[placeholder="describe"]').value
    var k = +getAnElement('input[prob="one"]').value
    var take = +getFirstForm('take').value
    var k1 = +getFirstForm('k1').value
    var k2 = +getFirstForm('k2').value
    var check = document.querySelectorAll('input[type="checkbox"]')
    calculate()
    probability(k,'#probability')
    if(check[0].checked) {
        probabilityInterval(k1,k2,describe,'#fromTo')
    }
    if(check[1].checked) {
        var moreThan = getFirstForm('mor').value;
        if (getFirstForm('more').checked) {
            var str = getFirstForm('more').nextSibling.textContent;
            probabilityInterval(k1+2,take,describe1,'#fromTo',str)
        } else {
            var str = document.getElementsByName('more')[1].nextSibling.textContent
            probabilityInterval(k1+1,take,describe1,'#fromTo',str)
        }
    }
    if(check[2].checked) {
        var lessThan = getFirstForm('less','#to').value;
        if (getFirstForm('les').checked) {
            var str = getFirstForm('les').nextSibling.textContent;
            probabilityInterval(0,lessThan,describe1,'#from',str)
             
        } else {
            var str = document.getElementsByName('les')[1].nextSibling.textContent;
            probabilityInterval(0,lessThan+1,describe1,'#from',str) 
        }
    }
}
