var roadOfValue = document.querySelector('#value');
var roadOfProbability = document.querySelector('#probability');

 function createObject() {
    var dimension = +document.querySelector('#dimension').value;
    var describeDimension = document.querySelector('#describeDimension');
    describeDimension.innerHTML = 'сформувати таблицю, де є '+dimension+' елементів';
    roadOfProbability.innerHTML = '<th>p<sub>k</sub></th>';
    roadOfValue.innerHTML = '<th>X<sub>k</sub></th>'; 
    for (i=0;i<dimension;i++) {
        roadOfValue.appendChild(document.createElement('td'));
        roadOfValue.lastChild.appendChild(document.createElement('input'));
        roadOfProbability.appendChild(document.createElement('td'));
        roadOfProbability.lastChild.appendChild(document.createElement('input'));
    }
}
function checkProbability() {
    var probability = document.querySelectorAll('#probability td input');
    var n = +document.querySelector('#dimension').value;
    var conclusion = document.querySelector('#sumOfProb');
    var help = 0;
    for (var i=0;i<n;i++) {
        if (probability[i].value.indexOf('/') !=-1 ) {
            var numOne = probability[i].value.slice(0,probability[i].value.indexOf('/'));
            var numTwo = probability[i].value.slice(probability[i].value.indexOf('/')+1,n);
            console.log(numOne+'    '+numTwo);
            probability[i].value = +numOne / (+numTwo);
            probability[i].value = Math.round(probability[i].value*100000)/100000;
        }
    }
    for (var i=0;i<n;i++) {
        help +=(+probability[i].value);
    }
    if (help!=1) {
        conclusion.innerHTML = 'сума імовірностей не є рівна 1, перевірте умову';
    } else {
        conclusion.innerHTML = 'Для того, щоб обчислити нажміть кнопку ';
    }
};
function calculate() {
    var value = document.querySelectorAll('#value td input');
    var probability = document.querySelectorAll('#probability td input');
    var n = +document.querySelector('#dimension').value;
    var mx = document.querySelector('#mx');
    var mx2 = document.querySelector('#mx2');
    for (i=0;i<n;i++) {
        if (probability[i].value.indexOf('/') !=-1 ) {
            var numOne = probability[i].value.slice(0,probability[i].value.indexOf('/'));
            var numTwo = probability[i].value.slice(probability[i].value.indexOf('/')+1,n);
            console.log(numOne+'    '+numTwo);
            probability[i].value = +numOne / (+numTwo);
            probability[i].value = Math.round(probability[i].value*100000)/100000;
        }
    }    
    
    var computing ='MX='+"\u005C"+'sum_{i=1}^{'+n+'} x_i'+'\u005C'+'cdot p_i=';
    var computing2='MX^2='+"\u005C"+'sum_{i=1}^{'+n+'} x_i^2'+'\u005C'+'cdot p_i=';
    var average=0;
    var average2=0;
    for (i=0;i<n;i++){
        average +=+value[i].value* +probability[i].value;
        average2 +=+value[i].value* +value[i].value* +probability[i].value;
    }
    average = Math.round(average*1000000)/1000000;
    average2 = Math.round(average2*1000000)/1000000;
    for(i=0;i<n;i++) {
        if (+value[i].value<0) {
            value[i].value ='(' + value[i].value+ ')';
        }
        computing += value[i].value+'\u005C'+ 'cdot' + probability[i].value;
        computing2+=value[i].value+ '^2' +'\u005C' +'cdot'+ probability[i].value;
        if (i==n-1) {
            computing+= '=';
            computing2 += '=';
        } else {
            computing +='+';
            computing2+='+';
        }
        
    }
    computing +=average;
    computing2 +=average2;
    var disp = average2-average*average;
    disp = Math.round(disp*1000000)/1000000;
    if(average<0) {average='('+average+')';};
    var computingDX ='D(X)=M(X^2)-(M(X))^2='+average2+'-'+average+'^2='+disp;
    var dx =document.querySelector('#dx');
    mx.innerHTML='<img src="https://latex.codecogs.com/gif.latex?'+computing+'"'+ 'title="MX=\sum_{i=1}^{n} x_i\cdot p_i" /> ';
    mx2.innerHTML='<img src="https://latex.codecogs.com/gif.latex?'+computing2+'"'+ 'title="MX^2=\sum_{i=1}^{n} x_i\cdot p_i" /> ';
    dx.innerHTML='<img src="https://latex.codecogs.com/gif.latex?'+computingDX+'"'+ 'title="DX=MX^2-(MX)^2" /> ';
    if (document.querySelector('#empireFunction').value=='on') {
        empireFunction();
    }
    if (document.querySelector('#paintEmp').value=='on') {
        graf();
    }
    if (document.querySelector('#paintDistribution').value=='on') {
        grafDistribution();
    }
    if (document.querySelector('#calculateProb').value=='on') {
        calculateProbability()
    }
}
function empireFunction () {
    var value = document.querySelectorAll('#value td input');
    var probability = document.querySelectorAll('#probability td input');
    var n=+document.querySelector('#dimension').value;
    var accumulatedProb = 0;
    var stringForEmpire = '0,x'+'\u005C'+'leq'+value[0].value+'\u005C'+'\u005C';
    for (var i =0;i<n;i++) {
        if(i==n-1) {
            stringForEmpire+='1,x>'+value[i].value;
            break;
        }
        accumulatedProb+=(+probability[i].value);
        accumulatedProb=Math.round(accumulatedProb*1000)/1000;
        stringForEmpire+=accumulatedProb+','+value[i].value+'<x'+ '\u005C'+ 'leq' +value[i+1].value+'\u005C'+'\u005C';
    }
    document.querySelector('#empFun').innerHTML ='<img src="https://latex.codecogs.com/gif.latex?'+'F_{d}(x)='+'\u005C'+'left'+'\u005C'+'{'+'\u005C'+'begin{matrix}'+stringForEmpire+'\u005C'+'end{matrix}'+'\u005C'+'right."/>';
}
function graf() {
    var coordinateAxes = document.querySelector('#grafEmpire');
    var value = document.querySelectorAll('#value td input');
    var probability = document.querySelectorAll('#probability td input');
    var n=+document.querySelector('#dimension').value;
    var k=1;
    for(var i=0;i<n;i++) {
        if (value[i].value[0]=='(') {
            k = value[i].value.indexOf(")");
            value[i].value=value[i].value.slice(1,k);
        }
    }
    var minValue = ((+value[0].value)==Math.floor(+value[0].value))?(+value[0].value-1):Math.floor(+value[0].value);
    var maxValue = ((+value[n-1].value)==Math.ceil(+value[n-1].value))?(+value[n-1].value+1):Math.ceil(+value[n-1].value);
    var arr=[];
    var step=Math.max(Math.abs(maxValue),Math.abs(minValue));
    var width = document.querySelector('#grafEmpire').clientWidth;
    var height = document.querySelector('#grafEmpire').clientHeight;
    var accamulated = 0;    
    function paint()  {
        var helpArr =[];
        for (var j=0;j<n;j++) {
            helpArr[j]=Math.abs(+value[j].value+step)/(2*step);          
            }
        j=0;
        var arr1 = [];
        var arr2 = [];
        for (var i=0;i<width;i++) {
            arr[i] =document.createElement('div');
            arr[i].style.position = 'absolute';
            if (i==Math.round(helpArr[j]*width)){
                accamulated+= +probability[j].value;
                arr1[j] = document.createElement('div');
                arr1[j].style.position = 'absolute'; 
                arr1[j].style.width ='3px';
                arr1[j].style.height='1px';
                arr1[j].innerHTML = Math.round(accamulated*1000)/1000;
                arr1[j].style.left = '50%';
                arr1[j].style.bottom = (0.3+0.65*accamulated)*height+'px';
                arr2[j] = document.createElement('div');
                arr2[j].style.position = 'absolute'; 
                arr2[j].style.width ='4px';
                arr2[j].style.height='4px';
                arr2[j].style.backgroundColor='white';
                arr2[j].style.border='1px solid gray';
                arr2[j].style.left =Math.round(helpArr[j]*width)+'px';
                arr2[j].style.bottom = ((0.3+0.65*accamulated)*height-2)+'px';
                coordinateAxes.appendChild(arr1[j]);
                coordinateAxes.appendChild(arr2[j]);
                j++;    
            }
            arr[i].style.left = i+'px';
            arr[i].style.width = '1px';
            arr[i].style.height = '1px';
            arr[i].style.bottom=(0.3+0.65*accamulated)*height+'px';
            arr[i].style.backgroundColor = 'green';
            coordinateAxes.appendChild(arr[i]);
        }
    };
    function marking() {
        for (var i=0;i<(2*step+1);i++) {    
            arr[i]=document.createElement('div');
            if (i<step) {
            arr[i].innerHTML='-'+(step-i); 
            } else if ( i==step) {
                arr[i].innerHTML=''+0;
            } else {
                arr[i].innerHTML=''+i-step;
            }
            var st=Math.round(width/(2*step));
            arr[i].style.position='absolute';
            arr[i].style.width = '1px';
            arr[i].style.height = '4px';
            arr[i].style.backgroundColor = 'red';
            arr[i].style.bottom = height*0.3+'px';
            arr[i].style.left=(st*i)+'px';
            coordinateAxes.appendChild(arr[i]);
        }
        arr[i]= document.createElement('div');
        arr[i].style.position='absolute';
        arr[i].innerHTML='1';
        arr[i].style.width = '1px';
        arr[i].style.height = '1px';
        arr[i].style.left = 50+'%';
        arr[i].style.backgroundColor = 'red';
        arr[i].style.bottom=0.95*height+'px';
        coordinateAxes.appendChild(arr[i]);
    }
    marking();
    paint();
}
function Point(x,y) {
    this.x = x;
    this.y = y;
}
//для рівняння прямої
function straight(a,b) {
    l= {
    };
    l.k = (b.y-a.y)/(b.x-a.x);
    l.b = a.y-a.x*(b.y-a.y)/(b.x-a.x);
    return l;
}
//намалювати многокутник розподілу
function grafDistribution() {
    var grafDistribution = document.querySelector('#grafDistribution');
    var value = document.querySelectorAll('#value td input');
    var probability = document.querySelectorAll('#probability td input');
    var n=+document.querySelector('#dimension').value;
    var k=1;
    for(var i=0;i<n;i++) {
        if (value[i].value[0]=='(') {
            k = value[i].value.indexOf(")");
            value[i].value=value[i].value.slice(1,k);
        }
    }
    var minValue = ((+value[0].value)==Math.floor(+value[0].value))?(+value[0].value-1):Math.floor(+value[0].value);
    var maxValue = ((+value[n-1].value)==Math.ceil(+value[n-1].value))?(+value[n-1].value+1):Math.ceil(+value[n-1].value);
    var step=Math.max(Math.abs(maxValue),Math.abs(minValue));
    var width = document.querySelector('#grafDistribution').clientWidth;
    var height = document.querySelector('#grafDistribution').clientHeight;
    function graf(){
        var helpArr = [];
        for (var j=0;j<n;j++) {
            helpArr[j]=Math.abs(+value[j].value+step)/(2*step);          
            }
        for (var i=0;i<n-1;i++) {
            
                var a=new Point((+value[i].value+step)/(2*step)*width,0.3*height+0.65*height*probability[i].value);
                var b=new Point((+value[i+1].value+step)/(2*step)*width,0.3*height+0.65*height*probability[i+1].value);
                var l =straight(a,b); 
                var arr = [];
                var k=0;
                var arr1 = [];
                for (var j=helpArr[i]*width;j<helpArr[i+1]*width;j++) {
                    arr[j]=document.createElement('div');
                    arr[j].style.position = 'absolute';
                    arr[j].style.width = '1px';
                    arr[j].style.height = '1px';
                    
                    if (j==Math.round(helpArr[i]*width)) {
                        arr[j].style.width = '4px';
                        arr[j].style.height = '4px';
                        arr[j].style.bottom = (j*l.k+l.b)+'px';;
                        arr1[k]=document.createElement('div');
                        arr1[k].style.position ='absolute';
                        arr1[k].style.left = '50%';
                        arr1[k].style.bottom =(j*l.k+l.b)+'px';
                        arr1[k].style.width ='4px';
                        arr1[k].style.height='1px';
                        arr1[k].style.backgroundColor = 'red';
                        arr1[k].innerHTML = probability[i].value;
                        grafDistribution.appendChild(arr1[k]);
                        k++;    
                    }
                    if ((i==n-2) && (j==Math.round(helpArr[i+1]*width-2))) {
                        arr1[k]=document.createElement('div');
                        arr1[k].style.position ='absolute';
                        arr1[k].style.left = '50%';
                        arr1[k].innerHTML=probability[i+1].value;
                        arr1[k].style.bottom =(j*l.k+l.b)+'px';
                        arr1[k].style.width ='4px';
                        arr1[k].style.height='1px';
                        arr1[k].style.backgroundColor = 'red';
                        grafDistribution.appendChild(arr1[k]);
                    }
                    arr[j].style.background='black';
                    arr[j].style.left =j+'px';
                    arr[j].style.bottom =(j*l.k+l.b)+'px';
                grafDistribution.appendChild(arr[j]);    
            }
        }
    };
    var arr=[];
    function marking() {
        for (var i=0;i<(2*step+1);i++) {    
            arr[i]=document.createElement('div');
            if (i<step) {
            arr[i].innerHTML='-'+(step-i); 
            } else if (i==step) {
                arr[i].innerHTML=''+0;
            } else {
                arr[i].innerHTML=''+i-step;
            }
            var st=Math.round(width/(2*step));
            arr[i].style.position='absolute';
            arr[i].style.width = '1px';
            arr[i].style.height = '4px';
            arr[i].style.backgroundColor = 'red';
            arr[i].style.bottom = height*0.3+'px';
            arr[i].style.left=(st*i)+'px';
            grafDistribution.appendChild(arr[i]);
        }
        arr[i]= document.createElement('div');
        arr[i].style.position='absolute';
        arr[i].innerHTML='1';
        arr[i].style.width = '1px';
        arr[i].style.height = '1px';
        arr[i].style.left = 50+'%';
        arr[i].style.backgroundColor = 'red';
        arr[i].style.bottom=0.95*height+'px';
        grafDistribution.appendChild(arr[i]);
    }
    marking();
    graf()
}
//обчислення імовірності
function calculateProbability() {
    var value = document.querySelectorAll('#value td input');
    var probability = document.querySelectorAll('#probability td input');
    var n=+document.querySelector('#dimension').value;
    var condition = document.querySelector('#valueCondition').value;
    var calculation ='P('+condition+')=';
    var calculationNumber = '=';
    var result =0;
    var x=0;
    var position = condition.indexOf('x');
    console.log(position);
    if ((position>0) && (position<condition.length)) {
        var con1 = condition.slice(0,position+1);
        var con2 = condition.slice(position,condition.length);
        var bool = false;
        for (var i= 0;i<n;i++) {
            x=+value[i].value;
            if ((eval(con1)) && (eval(con2))) {

                if (bool) {
                    calculation+='+';
                    calculationNumber+='+';
                }
                bool=true;
                calculation +='P(x='+x+')';
                calculationNumber+=probability[i].value;
                result+= +probability[i].value;
            }
        }
        calculation+=calculationNumber+'=';
        calculation+=result;
    } else  {
        for (var i=0;i<n;i++) {
            x=+value[i].value;
            if(eval(condition)) {
                if (bool) {
                    calculation+='+';
                    calculationNumber+='+';
                };
                bool=true;
                calculation +='P(x='+x+')';
                calculationNumber+=probability[i].value;                
                result+= +probability[i].value;
            }
        }
        calculation+=calculationNumber+'=';
        calculation+=Math.round(result*1000)/1000;
    }
    var result = document.querySelector('#resultForProbability');
    result.innerHTML = '<img src="https://latex.codecogs.com/gif.latex?'+calculation+'" title="P(x=x_i)" />';
}