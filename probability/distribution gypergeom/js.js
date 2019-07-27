function createFormula(elem) {
    return '<img src="https://latex.codecogs.com/gif.latex?'+elem+'" title="\alpha" />';
}
function divide(a,b) { 
    return '&#92'+'frac{'+a+'}{'+b+'}';
    
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
function recordtext (str,parent,typeelement) {
    var par = document.querySelector(parent);
    var div = document.createElement(typeelement);
    div.innerHTML = (str);
    par.appendChild(div);
}
function showComb (n,k) {
    return divide(n+'!',k+'!'+(n-k)+'!');
}
function getElements (selector) {
    return document.querySelectorAll(selector);
}
function renovateDistribution () {
    var desc =getAnElement("p[description='forRenovate']");
    getAnElement("p[description='afterTable']").style.display = 'block';
    desc.style.display = 'block'
    var n = +getAnElement('#dimension').value;
    var k= +getAnElement('#favorable').value;
    var favorableDescription = getAnElement('#favorableDescription').value;
    getAnElement("span[element='favorableElement']").innerHTML = ' '+favorableDescription;
    var m = +getAnElement('#unfavorable').value;
  //  var UnfavorableDescription = getAnElement('#unfavorable').value;
    for (var i=0;i<=n;i++) {
        if ((k-i)<0) {
            break;
        }
        if ((n-i)>m) {
            continue;
        }
        var str ='X='+i+','+'P(X='+i+')='+divide(('C_{'+k+'}^{'+i+'}'+'C_{'+m+'}^{'+(n-i)+'}'),'C_{'+(k+m)+'}^{'+n+'}')+'='+divide(showComb(k,i)+showComb(m,n-i),showComb(m+k,n))+'&#92'+'approx '+roundTo4(combination(k,i)*combination(m,n-i)/combination(m+k,n));
        recordElement(str,'#renovate','div');
        getAnElement('#polygon').style.display='table';
        var values = getAnElement('#values')
        recordtext(''+i,'#values','td');
        var probabilities = getAnElement('#probabilities')
        recordtext(roundTo4(combination(k,i)*combination(m,n-i)/combination(m+k,n)),'#probabilities','td');
    }
}
function showCalculateAverage ()      {//отримати матем сподівання і дисперсію
    getAnElement("p[description='computingMx']").style.display = 'block'
    var values = getElements('#values td');
    var probabilities = getElements('#probabilities td');
    var n = values.length;
    var mx = 'MX='+'\u005C'+'sum_{k=1}^{'+n+'}'+mult('X_{k}','p_{k}')+'='
    var mx2 = 'MX^2='+'\u005C'+'sum_{k=1}^{'+n+'}'+mult('X_{k}^2','p_{k}')+'='
    var accumulatedMX = 0;
    var accumulatedMX2 = 0;
    for (var i = 0;i<n;i++) {
        accumulatedMX+=(+values[i].innerHTML)*(+probabilities[i].innerHTML);
        accumulatedMX2+=(+values[i].innerHTML)*(+probabilities[i].innerHTML)*(+values[i].innerHTML);
        mx +=mult(values[i].innerHTML,probabilities[i].innerHTML);
        mx2 +=mult(values[i].innerHTML+'^2',probabilities[i].innerHTML);
        if (i!=(n-1)) {
            mx+='+';
            mx2+='+';
        } else {
            mx+='=';
            mx2+='=';
        }
    }
    mx+=roundTo4(accumulatedMX);
    mx2+=roundTo4(accumulatedMX2);
    recordElement(mx,'#computingNumbersCharacteristic','div')
    recordElement(mx2,'#computingNumbersCharacteristic','div')
    var dx = 'D(X)=M(X^2)-(MX)^2='+roundTo4(accumulatedMX2)+'-'+roundTo4(correctMinus(accumulatedMX))+'^2=' +roundTo4(accumulatedMX2-accumulatedMX*accumulatedMX);
    recordElement(dx,'#computingNumbersCharacteristic','div');
}

function writeEmpireFunction() {//наисати вигляд функції розподілу
    var value = document.querySelectorAll('#values td');
    var probability = document.querySelectorAll('#probabilities td');
    var n=value.length;
    var accumulatedProb = 0;
    var stringForEmpire = '0,x'+'\u005C'+'leq'+value[0].innerHTML+'\u005C'+'\u005C';
    for (var i =0;i<n;i++) {
        if(i==(n-1)) {
            stringForEmpire+='1,x>'+value[i].innerHTML;
            break;
        }
        accumulatedProb+=(+probability[i].innerHTML);
        accumulatedProb=Math.round(accumulatedProb*100000)/100000;
        stringForEmpire+=accumulatedProb+','+value[i].innerHTML+'<x'+ '\u005C'+ 'leq' +value[i+1].innerHTML+'\u005C'+'\u005C';
    }
    document.querySelector('#empFun').innerHTML ='<img src="https://latex.codecogs.com/gif.latex?'+'F_{d}(x)='+'\u005C'+'left'+'\u005C'+'{'+'\u005C'+'begin{matrix}'+stringForEmpire+'\u005C'+'end{matrix}'+'\u005C'+'right."/>';
}
function graf() {//емпірична функція
    var coordinateAxes = document.querySelector('#grafEmpireFunction');
    document.querySelector('#grafEmpireFunction').style.display='block';
    var value = document.querySelectorAll('#values td');
    var probability = document.querySelectorAll('#probabilities td');
    var n=value.length;
    var minValue = ((+value[0].innerHTML)==Math.floor(+value[0].innerHTML))?(+value[0].innerHTML-1):Math.floor(+value[0].innerHTML);
    var maxValue = ((+value[n-1].innerHTML)==Math.ceil(+value[n-1].innerHTML))?(+value[n-1].innerHTML+1):Math.ceil(+value[n-1].innerHTML);
    var arr=[];
    var step=Math.max(Math.abs(maxValue),Math.abs(minValue));
    var width = document.querySelector('#grafEmpireFunction').clientWidth;
    var height = document.querySelector('#grafEmpireFunction').clientHeight;
    var accamulated = 0;    
    function paint()  {
        var helpArr =[];
        for (var j=0;j<n;j++) {
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
    document.querySelector("p[description='grafPolygonFunction']").style.display = 'block';
    document.querySelector('#polygonDistribution').style.display='block';
    var value = document.querySelectorAll('#values td');
    var probability = document.querySelectorAll('#probabilities td');
    var n=value.length;
    var k=1;
    var minValue = ((+value[0].innerHTML)==Math.floor(+value[0].innerHTML))?(+value[0].innerHTML-1):Math.floor(+value[0].innerHTML);
    var maxValue = ((+value[n-1].innerHTML)==Math.ceil(+value[n-1].innerHTML))?(+value[n-1].innerHTML+1):Math.ceil(+value[n-1].innerHTML);
    var step=Math.max(Math.abs(maxValue),Math.abs(minValue));
    var width = document.querySelector('#polygonDistribution').clientWidth;
    var height = document.querySelector('#polygonDistribution').clientHeight;
    function graf(){
        var helpArr = [];
        for (var j=0;j<n;j++) {
            helpArr[j]=Math.abs(+value[j].innerHTML+step)/(2*step);          
            }
        for (var i=0;i<n-1;i++) {           
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
function launchingMachine () {
    renovateDistribution();
    if(getAnElement('#numberCharacreristik').checked) {
        showCalculateAverage();
    }    
    if(getAnElement('#checkDistributionFunction').checked) {
        writeEmpireFunction();
        getAnElement('#explainingForEmpireFunction').style.display = 'block';
    }
    if(getAnElement('#checkPolygonDistribution').checked) {
        getAnElement("p[description='grafPolygonFunction']").style.display = 'block';
        grafDistribution();
    }
    if(getAnElement('#grafDistributionFucntion').checked) {
        getAnElement("p[description='grafEmpireFunction']").style.display = 'block';
        graf();
    }    
}

