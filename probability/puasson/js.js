function factorial(n) { //факторіал
    var k=1;
    for (var i=1;i<n+1;i++) { 
        k=k*i;
    }
    return k;
}
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
function resultOfPoissone(l,k) {
    return Math.exp(-l)*Math.pow(l,k)/factorial(k);
}
function roundTo4(a) {
    return Math.round(a*10000)/10000;
}
function mult(a,b) {
    return a+'&#92' +'cdot' +b;      
}
function poisson () {
    var l =chooseTypeProblem();
    l = roundTo4(l)    
    var n = document.querySelector('#n').value;
    var p = document.querySelector('#p').value;
    var k = document.querySelector('#probability').value;
    var str = 'P(X='+k+')='+'e^{-'+'&#92'+'lambda}' +'&#92'+'cdot '+'&#92'+'frac{'+'&#92'+'lambda ^k}{k!}=e^{-'+l+'}'+divide(l+'^{'+k+'}',k+'!')+'&#92'+'approx '+roundTo4(Math.exp(-l)*Math.pow(l,k)/factorial(+k));
    var div = document.createElement('div');
    div.innerHTML = createFormula(str);
    var parent =document.querySelector('#probabilityOfSuccess');
    parent.appendChild(div);
}
function calculate() {
    if (document.querySelector('#prob').checked) {
        document.querySelector("p[description='kSuccess']").style.display='block';
        document.querySelector("#probabilityOfSuccess").style.display='block';
        document.querySelector('#calculL').style.display = 'block';
        poisson();
    };    
    if (document.querySelector('#checkIntervalProblem').checked) {
        document.querySelector("p[description='fromTo']").style.display='block';
        probabilityForInterval();
    };    
    if (document.querySelector('#checkAtLeast').checked) {
        document.querySelector("p[description='atLeast']").style.display='block';
        atLeast();
    };
    
}
function chooseTypeProblem() {
    if (document.querySelector('#switchForN').checked) {
    var n = document.querySelector('#n').value;
    var p = document.querySelector('#p').value;
    var str = '&#92'+'lambda'+'=np='+mult(n,p)+'='+roundTo4(n*p);
    var div = document.createElement('div');
    div.innerHTML =createFormula(str);
    var parent = document.querySelector('#expectedValue');
        
    parent.appendChild(div);
        return  roundTo4(n*p);
    } else {
        var l=+document.querySelector('#l').value;
        l = roundTo4(l)    
        document.querySelector('#parametr').style.display='block';
        document.querySelector('#valueParam').innerHTML = "="+l;
        return l;
    }
}
function  probabilityForInterval(){
    var l =chooseTypeProblem();  
    l = roundTo4(l)
    var n = +document.querySelector('#n').value;
    var p = +document.querySelector('#p').value;
    var condition =document.querySelector('#interval').value;
    var position = condition.indexOf('x');
    if( document.querySelectorAll('#expectedValue div').length ==2) {
        document.querySelectorAll('#expectedValue div')[0].style.display = 'none';
    }
    var formula ='P('+condition+')=';
    var calculating = '=';
    var calculating2 = '=';
    var sum = 0;
    var bool = true;
    if (position!=0) {
        for (i=0;i<100;i++) {
            var con1 = condition.slice(0,position+1);
            var x = i;
            var con2 = condition.slice(position,condition.length);
            if ((eval(con1)) && (eval(con2))) {
                if (bool) {
                    document.querySelector('#from').innerHTML =''+x;
                    bool=false;
                };
                formula+='P(x='+x+')+';
                calculating+='e^{-'+l+'}'+divide(l+'^{'+x+'}',x+'!')+'+';
                calculating2+=roundTo4(resultOfPoissone(l,i))+'+'; 
                sum+=resultOfPoissone(l,i);
                var k = x;
            };
        };
        document.querySelector('#to').innerHTML =' '+k;
        formula = formula.slice(0,formula.length-1);
        calculating = calculating.slice(0,calculating.length-1);
        calculating2 = calculating2.slice(0,calculating2.length-1);
        formula+='=';
        calculating+='=';
        calculating2+='=';
        var result = formula;
        var result2 = calculating;
        var result3 = calculating2+roundTo4(sum);
        var parent = document.querySelector('#intervalProblem');
        var div = document.createElement('div');
        var div2 = document.createElement('div');
        var div3 = document.createElement('div');
        div.innerHTML = createFormula(result);
        div2.innerHTML = createFormula(result2);
        div3.innerHTML = createFormula(result3);
        parent.appendChild(div);
        parent.appendChild(div2);
        parent.appendChild(div3);
    } else {
        for (i=0;i<100;i++) {
            var x=i;
            if (eval(condition)) {
                formula+='P(x='+x+')+';
                calculating+='e^{-'+l+'}'+divide(l+'^{'+x+'}',x+'!')+'+';
                calculating2+=roundTo4(resultOfPoissone(l,i))+'+'; 
                sum+=resultOfPoissone(l,i);
                var k = x;                
            }
            
        }
        document.querySelector('#to').innerHTML =' '+k;
        document.querySelector('#from').innerHTML =''+0;
        formula = formula.slice(0,formula.length-1);
        calculating = calculating.slice(0,calculating.length-1);
        calculating2 = calculating2.slice(0,calculating2.length-1);
        formula+='=';
        calculating+='=';
        calculating2+='=';
        var result = formula;
        var result2 = calculating;
        var result3 = calculating2+roundTo4(sum);
        var parent = document.querySelector('#intervalProblem');
        var div = document.createElement('div');
        var div2 = document.createElement('div');
        var div3 = document.createElement('div');
        div.innerHTML = createFormula(result);
        div2.innerHTML = createFormula(result2);
        div3.innerHTML = createFormula(result3);
        parent.appendChild(div);
        parent.appendChild(div2);
        parent.appendChild(div3);
    }

}
function atLeast () {
        var l =chooseTypeProblem();   
         l = roundTo4(l)    
        var n = +document.querySelector('#n').value;
        var p = +document.querySelector('#p').value;
        if( document.querySelectorAll('#expectedValue div').length ==3) {
            document.querySelectorAll('#expectedValue div')[1].style.display = 'none';
        } 
        var k = +document.querySelector('#atLeast').value;
        for (var i = 0;i<document.querySelectorAll("span[attribute='last']").length; i++) {
                 document.querySelectorAll("span[attribute='last']")[i].innerHTML =k;
            }
        var formula ='P('+'&#92'+'overline{A})='+'P(x<'+k+')=';
        var calculating = '=';
        var sum=0;
        var calculating2 = '=';
        var b =  document.getElementsByName('type');
        if(b[0].checked) {
            for (var i = 0;i<document.querySelectorAll("span[atLeast='number']").length; i++) {
                document.querySelectorAll("span[atLeast='number']")[i].style.display = 'inline';
                console.log(document.querySelectorAll("span[atLeast='number']")[i].style.display)
            }
            for (i=0;i<100;i++) {
                var x=i;
                if (x<k) {
                    formula+='P(x='+x+')+';
                    calculating+='e^{-'+l+'}'+divide(l+'^{'+x+'}',x+'!')+'+';
                    calculating2+=roundTo4(resultOfPoissone(l,i))+'+'; 
                    sum+=resultOfPoissone(l,i);                
                }
            }
        } else {
            for (var i = 0;i<document.querySelectorAll("span[moreThen='number']").length; i++) {
                 document.querySelectorAll("span[moreThen='number']")[i].style.display = 'inline';
                console.log(document.querySelectorAll("span[moreThen='number']")[i])
            }
            for (i=0;i<100;i++) {
                var x=i;
                if (x<=k) {
                    formula+='P(x='+x+')+';
                    calculating+='e^{-'+l+'}'+divide(l+'^{'+x+'}',x+'!')+'+';
                    calculating2+=roundTo4(resultOfPoissone(l,i))+'+'; 
                    sum+=resultOfPoissone(l,i);                
                }
            }
        }
        formula = formula.slice(0,formula.length-1);
        calculating = calculating.slice(0,calculating.length-1);
        calculating2 = calculating2.slice(0,calculating2.length-1);
        formula+='=';
        calculating+='=';
        calculating2+='=';
        var result = formula;
        var result2 = calculating;
        var result3 = calculating2+roundTo4(sum);
        var parent = document.querySelector('#writeLastProblem');
        var div = document.createElement('div');
        var div2 = document.createElement('div');
        var div3 = document.createElement('div');
        div.innerHTML = createFormula(result);
        div2.innerHTML = createFormula(result2);
        div3.innerHTML = createFormula(result3);
        parent.appendChild(div);
        parent.appendChild(div2);
        parent.appendChild(div3);
    var finish = document.createElement('div');
    var finStr = 'P(A)=1-'+'P('+'&#92'+'overline{A})=1-'+roundTo4(sum) +'='+roundTo4((1-sum));
    finish.innerHTML  = createFormula(finStr);
    parent.appendChild(finish);
}
