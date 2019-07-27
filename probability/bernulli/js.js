function factorial(n) { //факторіал
    var k=1;
    for (var i=1;i<n+1;i++) { 
        k=k*i;
    }
    return k;
}
function correctNum(a) {
    return Math.round(a*100000)/100000;
}
function combination(n,k) { //комбінації
    return factorial(n)/(factorial(n-k)*factorial(k));
}
var renovateDistribution = document.querySelector('#renovateDistribution');
function createDistribution() { //складання розподілу
    var n = +document.querySelector('#dimension').value;
    var p= +document.querySelector('#probability').value;
    var arr= [];
    var arrForProb=[];
       for (var i=0;i<=n;i++) {
           arr[i] = document.createElement('div');
           arrForProb[i]=combination(+n,i)*Math.pow(+p,i)*Math.pow(correctNum(1-p),+n-i);
           arrForProb[i]=Math.round(arrForProb[i]*100000)/100000;
           var str='X='+i+',  p_'+i+'=C_{'+n+'}^{'+i+'}p^{'+i+'}q^'+(n-i)+ '='+'\u005C'+'frac{'+n+'!}{'+i+'!('+n+'-'+i+')!}'+p+'^'+i+correctNum(1-p)+'^'+(n-i)+'='+arrForProb[i];
           arr[i].innerHTML ='<img src="https://latex.codecogs.com/gif.latex?'+str+'" title="binom rpsp" />'
           
           renovateDistribution.appendChild(arr[i]);
       }
}
function breaker() { //функція перемикач
    var n = +document.querySelector('#dimension').value;
    if(document.querySelector('#firstTask').checked) {
        createDistribution();//відновити розподіл
        document.querySelector('#descriptionOfRenovating').style.display='block';
    }
    if(document.querySelector('#functionDensityOfProbability').checked) {//щільність
        showDistribution();
        document.querySelector('#tableOfProbabilities').style.display='block';
        document.querySelector('#explainingOfTableRenovaiting').style.display='block';
        document.querySelector('#tableOfProbabilities').style.width=((n+1)*55+22)+'px';
    }
    if(document.querySelector('#imageOfFunctionEmpire').checked) {//
        document.querySelector('#explainingForEmpireFunction').style.display='block';
        writeEmpireFunction();
    }
    if(document.querySelector('#numberCharacteristic').checked) {
        getExpectedValueAndDispersion();
        document.querySelector('#explainingForExpectedValue').style.display='block';
    }    
    if(document.querySelector('#switchForEmpireFunction').checked) {
        document.querySelector("p[description='grafEmpireFunction']").style.display='block';
        document.querySelector('#grafEmpireFunction').style.display='block';
        graf();  
    }    
    if(document.querySelector('#showPolygonOfDistribution').checked) {
      console.log(document.querySelector('#showPolygonOfDistribution').value);  document.querySelector("p[description='grafPolygonFunction']").style.display='block';
        document.querySelector('.space').style.display='block'; 
        grafDistribution()
    }
    if(document.querySelector('#OnProb').checked)  {
        console.log('пройшла ітерація');
         document.querySelector("p[description='searchProbability']").style.display='block';
        document.querySelector('#processOfSearchingProbability').style.display='block'; 
        
        calculateProbability();
    }
}
function showDistribution () { //записати таблицю розподілу
    var value=document.querySelector('#value');
    var n = +document.querySelector('#dimension').value;
    var p= +document.querySelector('#probability').value;
    var probability=document.querySelector('#probabilities');
    var arr1 =[];
    for(var i=0;i<=n;i++) {
        arr1[i]=document.createElement('td');
        arr1[i].innerHTML = i;
        value.appendChild(arr1[i]);
    }
    var arr2 =[];
    for(i=0;i<=n;i++) {
        arr2[i]=document.createElement('td');
        arr2[i].innerHTML=combination(n,i)*Math.pow(p,i)*Math.pow(1-p,n-i);
        arr2[i].innerHTML=Math.round(+arr2[i].innerHTML*100000)/100000;
        probability.appendChild(arr2[i]);
    }
}
function writeEmpireFunction() {//наисати вигляд функції розподілу
    var value = document.querySelectorAll('#value td');
    var probability = document.querySelectorAll('#probabilities td');
    var n=+document.querySelector('#dimension').value;
    var accumulatedProb = 0;
    var stringForEmpire = '0,x'+'\u005C'+'leq'+value[0].innerHTML+'\u005C'+'\u005C';
    for (var i =0;i<=n;i++) {
        if(i==n) {
            stringForEmpire+='1,x>'+value[i].innerHTML;
            break;
        }
        accumulatedProb+=(+probability[i].innerHTML);
        accumulatedProb=Math.round(accumulatedProb*100000)/100000;
        stringForEmpire+=accumulatedProb+','+value[i].innerHTML+'<x'+ '\u005C'+ 'leq' +value[i+1].innerHTML+'\u005C'+'\u005C';
    }
    document.querySelector('#empFun').innerHTML ='<img src="https://latex.codecogs.com/gif.latex?'+'F_{d}(x)='+'\u005C'+'left'+'\u005C'+'{'+'\u005C'+'begin{matrix}'+stringForEmpire+'\u005C'+'end{matrix}'+'\u005C'+'right."/>';
}
function getExpectedValueAndDispersion() {//отримати матем сподівання і дисперсію
    var value=document.querySelector('#value td');
    var n = +document.querySelector('#dimension').value;
    var p= +document.querySelector('#probability').value;
    var computing = document.querySelector('#computingNumbersCharacteristic');
    var dx = 'D(X)=npq=np(1-p)='+n+'\u005C'+'cdot'+p+'\u005C'+'cdot'+Math.round((1-p)*1000)/1000+'=' + Math.round((n*p*(1-p))*1000)/1000;
    var mx = 'M(X)=np='+n+'\u005C'+'cdot'+p+'=' + n*p;
    var sx = '\u005C'+'sigma (x)='+'\u005C'+'sqrt{D(X)}='+'\u005C'+'sqrt{'+(n*p*Math.round( (1-p)*1000)/1000)+'}='+Math.round(Math.sqrt(n*p*(1-p))*1000)/1000;
    var arr = [];
    for (var i=0;i<3;i++) {
        arr[i]=document.createElement('div');
        computing.appendChild(arr[i])
    }
    arr[0].innerHTML ='<img src="https://latex.codecogs.com/gif.latex?'+mx+'" title="expected value" />'
    arr[1].innerHTML ='<img src="https://latex.codecogs.com/gif.latex?'+dx+'" title="disp" />'
    arr[2].innerHTML ='<img src="https://latex.codecogs.com/gif.latex?'+sx+'" title="Standard deviation" />'
}
function setPropertyToPoint(elem,width,height,color) { //надати властивості
    elem.style.position = 'absolute';
    elem.style.width =width+'px';
    elem.style.height=height+'px';
    elem.style.backgroundColor =color;
}

function graf() {//емпірична функція
    var coordinateAxes = document.querySelector('#grafEmpireFunction');
    var value = document.querySelectorAll('#value td');
    var probability = document.querySelectorAll('#probabilities td');
    var n=+document.querySelector('#dimension').value;
    var k=1;
    var minValue = ((+value[0].innerHTML)==Math.floor(+value[0].innerHTML))?(+value[0].innerHTML-1):Math.floor(+value[0].innerHTML);
    var maxValue = ((+value[n].innerHTML)==Math.ceil(+value[n].innerHTML))?(+value[n].innerHTML+1):Math.ceil(+value[n].innerHTML);
    var arr=[];
    var step=Math.max(Math.abs(maxValue),Math.abs(minValue));
    var width = document.querySelector('#grafEmpireFunction').clientWidth;
    var height = document.querySelector('#grafEmpireFunction').clientHeight;
    var accamulated = 0;    
    function paint()  {
        var helpArr =[];
        for (var j=0;j<=n;j++) {
            helpArr[j]=Math.abs(+value[j].innerHTML+step)/(2*step);          
            }
        j=0;
        var arr1 = [];
        var arr2 = [];
        for (var i=0;i<width;i++) {
            arr[i] =document.createElement('div');
            setPropertyToPoint(arr[i],1,1,'green');
            if (i==Math.round(helpArr[j]*width)){
                accamulated+= +probability[j].innerHTML;
                arr1[j] = document.createElement('div');
                setPropertyToPoint(arr1[j],3,1,'red');
                arr1[j].innerHTML = Math.round(accamulated*1000)/1000;
                arr1[j].style.left = '50%';
                arr1[j].style.bottom = (0.3+0.65*accamulated)*height+'px';
                arr2[j] = document.createElement('div');
                setPropertyToPoint(arr2[j],4,4,'white');
                arr2[j].style.border='1px solid gray';
                arr2[j].style.left =Math.round(helpArr[j]*width)+'px';
                arr2[j].style.bottom = ((0.3+0.65*accamulated)*height-2)+'px';
                coordinateAxes.appendChild(arr1[j]);
                coordinateAxes.appendChild(arr2[j]);
                j++;    
            }
            arr[i].style.left = i+'px';
            arr[i].style.bottom=(0.3+0.65*accamulated)*height+'px';
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
            setPropertyToPoint(arr[i],1,4,'red');
            arr[i].style.bottom = height*0.3+'px';
            arr[i].style.left=(st*i)+'px';
            coordinateAxes.appendChild(arr[i]);
        }
        arr[i]= document.createElement('div');
        setPropertyToPoint(arr[i],1,1,'red')
        arr[i].innerHTML='1';
        arr[i].style.left = 50+'%';
        arr[i].style.bottom=0.95*height+'px';
        coordinateAxes.appendChild(arr[i]);
    }
    marking();
    paint();
}
//нова точка
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
function grafDistribution() {//многокутник розподілу
    var grafDistribution = document.querySelector('#polygonDistribution');
    var value = document.querySelectorAll('#value td');
    var probability = document.querySelectorAll('#probabilities td');
    var n=+document.querySelector('#dimension').value;
    var k=1;
    var minValue = ((+value[0].innerHTML)==Math.floor(+value[0].innerHTML))?(+value[0].innerHTML-1):Math.floor(+value[0].innerHTML);
    var maxValue = ((+value[n].innerHTML)==Math.ceil(+value[n].innerHTML))?(+value[n].innerHTML+1):Math.ceil(+value[n].innerHTML);
    var step=Math.max(Math.abs(maxValue),Math.abs(minValue));
    var width = document.querySelector('#polygonDistribution').clientWidth;
    var height = document.querySelector('#polygonDistribution').clientHeight;
    function graf(){
        var helpArr = [];
        for (var j=0;j<=n;j++) {
            helpArr[j]=Math.abs(+value[j].innerHTML+step)/(2*step);          
            }
        for (var i=0;i<n;i++) {           
                var a=new Point((+value[i].innerHTML+step)/(2*step)*width,0.3*height+0.65*height*probability[i].innerHTML);
                var b=new Point((+value[i+1].innerHTML+step)/(2*step)*width,0.3*height+0.65*height*probability[i+1].innerHTML);
                var l =straight(a,b); 
                var arr = [];
                var k=0;
                var arr1 = [];
                for (var j=helpArr[i]*width;j<helpArr[i+1]*width;j++) {
                    arr[j]=document.createElement('div');
                    setPropertyToPoint(arr[j],1,1,'black')
                    if (j==Math.round(helpArr[i]*width)) {
                        setPropertyToPoint(arr[j],4,4,'black');
                        arr[j].style.bottom = (j*l.k+l.b)+'px';;
                        arr1[k]=document.createElement('div');
                        setPropertyToPoint(arr1[k],4,1,'red');
                        arr1[k].style.left = '50%';
                        arr1[k].style.bottom =(j*l.k+l.b)+'px';
                        arr1[k].innerHTML = probability[i].innerHTML;
                        grafDistribution.appendChild(arr1[k]);
                        k++;    
                    }
                    if ((i==n-1) && (j==Math.round(helpArr[i+1]*width-2))) {
                        arr1[k]=document.createElement('div');
                        arr1[k].style.left = '50%';
                        setPropertyToPoint(arr1[k],4,1,'red');
                        arr1[k].innerHTML=probability[i+1].innerHTML;
                        arr1[k].style.bottom =(j*l.k+l.b)+'px';
                        grafDistribution.appendChild(arr1[k]);
                    }
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
            } else if ( i==step) {
                arr[i].innerHTML=''+0;
            } else {
                arr[i].innerHTML=''+i-step;
            }
            var st=Math.round(width/(2*step));
            setPropertyToPoint(arr[i],1,4,'red');
            arr[i].style.bottom = height*0.3+'px';
            arr[i].style.left=(st*i)+'px';
            grafDistribution.appendChild(arr[i]);
        }
        arr[i]= document.createElement('div');
        setPropertyToPoint(arr[i],1,1,'red')
        arr[i].innerHTML='1';
        arr[i].style.left = 50+'%';
        arr[i].style.bottom=0.95*height+'px';
        grafDistribution.appendChild(arr[i]);
    }
    marking();
    graf()
}
function calculateProbability() {
    var value = document.querySelectorAll('#value td');
    var probability = document.querySelectorAll('#probabilities td');
    var n=+document.querySelector('#dimension').value;
    var condition = document.querySelector('#valueCondition').value;
    var calculation ='P('+condition+')=';
    var calculationNumber = '=';
    var result =0;
    var x=0;
    var position = condition.indexOf('x');
    if ((position>0) && (position<condition.length)) {
        var con1 = condition.slice(0,position+1);
        var con2 = condition.slice(position,condition.length);
        var bool = false;
        for (var i= 0;i<=n;i++) {
            x=+value[i].innerHTML;
            if ((eval(con1)) && (eval(con2))) {

                if (bool) {
                    calculation+='+';
                    calculationNumber+='+';
                }
                bool=true;
                calculation +='P(x='+x+')';
                calculationNumber+=probability[i].innerHTML;
                result+= +probability[i].innerHTML;
            }
        }
        calculation+=calculationNumber+'=';
        calculation+=result;
    } else  {
        for (var i=0;i<=n;i++) {
            x=+value[i].innerHTML;
            if(eval(condition)) {
                if (bool) {
                    calculation+='+';
                    calculationNumber+='+';
                };
                bool=true;
                calculation +='P(x='+x+')';
                calculationNumber+=probability[i].innerHTML;                
                result+= +probability[i].innerHTML;
            }
        }
        calculation+=calculationNumber+'=';
        calculation+=Math.round(result*1000)/1000;
    }
    var k1 = calculation.indexOf('>=');
    var k2 = calculation.indexOf('<=');
    if (k1!=(-1)) {
        calculation= calculation.slice(0,k1)+'\u005C'+'geq ' +calculation.slice(k1+2,calculation.length) 
    }
    if (k2!=(-1)) {
        calculation= calculation.slice(0,k2)+'\u005C'+'leq ' +calculation.slice(k2+2,calculation.length) 
    }    
    var result = document.querySelector('#processOfSearchingProbability');
    result.innerHTML = '<img src="https://latex.codecogs.com/gif.latex?'+calculation+'" title="P(x=x_i)" />';
}