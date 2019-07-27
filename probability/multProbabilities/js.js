function createFormula(elem) {
    return '<img src="https://latex.codecogs.com/gif.latex?'+elem+'" title="\alpha" />';
}
function divide(a,b) { 
    return '&#92'+'frac{'+a+'}{'+b+'}';
    
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
function getElements (selector) {
    return document.querySelectorAll(selector);
}
function setPropertyToPoint(elem,width,height,color) { //надати властивості
    elem.style.position = 'absolute';
    elem.style.width =width+'px';
    elem.style.height=height+'px';
    elem.style.backgroundColor =color;
}
function writeEmpireFunction() {//наисати вигляд функції розподілу
    var value = document.querySelectorAll('#values td');
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
function recordtext (str,parent,typeelement) {
    var par = document.querySelector(parent);
    var div = document.createElement(typeelement);
    div.innerHTML = (str);
    par.appendChild(div);
}
function showComb (n,k) {
    return divide(n+'!',k+'!'+(n-k)+'!');
}
function createForm() {
    getAnElement('form[class="none"]').style.display = 'block';
    var dim =+getAnElement('#dimension').value;
    var parent1 = getAnElement("tr[attr='nameOfCondition']")
    var parent2 = getAnElement("tr[attr='valueOfCondition']")
    for(var i=0;i<dim;i++) {
        var str = 'p'+'<sub>'+(i+1)+'</sub>';
        var td = document.createElement('td');
        td.innerHTML = str;
        parent1.appendChild(td);
        var td2 = document.createElement('td');
        var input = document.createElement('input');
        td2.appendChild(input);
        parent2.appendChild(td2);
    }
}
function renovate3(){
    var arr = getElements("tr[attr='valueOfCondition'] input");
    var resArr = [];
    var result = [];
    var parent = getAnElement('#renovatedDistribution');
    resArr[0] = 'P(X=0)='+mult3('q_1',' '+'q_2',' '+'q_3')+'='+mult3(roundTo4(1-arr[0].value),roundTo4(1-arr[1].value),roundTo4(1-arr[2].value))+'='+roundTo4((1-arr[0].value)*(1-arr[1].value)*(1-arr[2].value));
    resArr[1]='P(X=1)='+mult3('p_1',' '+'q_2',' '+'q_3')+'+'+mult3('q_1',' '+'p_2',' '+'q_3')+'+'+mult3('q_1',' '+'q_2',' '+'p_3')+'='
    resArr[2]='='+mult3(roundTo4(arr[0].value),roundTo4(1-arr[1].value),roundTo4(1-arr[2].value))+'+'+mult3(roundTo4(1-arr[0].value),roundTo4(arr[1].value),roundTo4(1-arr[2].value))+'+'+mult3(roundTo4(1-arr[0].value),roundTo4(1-arr[1].value),roundTo4(arr[2].value))+'='+roundTo4((arr[0].value)*(1-arr[1].value)*(1-arr[2].value)+(1-arr[0].value)*(arr[1].value)*(1-arr[2].value)+(1-arr[0].value)*(1-arr[1].value)*(arr[2].value))
    resArr[3]='P(X=2)='+mult3('p_1',' '+'p_2',' '+'q_3')+'+'+mult3('q_1',' '+'p_2',' '+'p_3')+'+'+mult3('p_1',' '+'q_2',' '+'p_3')+'=';
    resArr[4]='='+mult3(roundTo4(arr[0].value),roundTo4(arr[1].value),roundTo4(1-arr[2].value))+'+'+mult3(roundTo4(1-arr[0].value),roundTo4(arr[1].value),roundTo4(arr[2].value))+'+'+mult3(roundTo4(arr[0].value),roundTo4(1-arr[1].value),roundTo4(arr[2].value))+'='+roundTo4((arr[0].value)*(arr[1].value)*(1-arr[2].value)+(1-arr[0].value)*(arr[1].value)*(arr[2].value)+(arr[0].value)*(1-arr[1].value)*(arr[2].value));
    resArr[5]='P(X=3)='+mult3('p_1',' '+'p_2',' '+'p_3')+'='+mult3(roundTo4(arr[0].value),roundTo4(arr[1].value),roundTo4(arr[2].value))+'='+roundTo4((arr[0].value)*(arr[1].value)*(arr[2].value));
    for (var i=0;i<resArr.length;i++) {
        recordElement(resArr[i],'#renovatedDistribution','div');
    }
    result[0]=roundTo4((1-arr[0].value)*(1-arr[1].value)*(1-arr[2].value));
    result[1]=roundTo4((arr[0].value)*(1-arr[1].value)*(1-arr[2].value)+(1-arr[0].value)*(arr[1].value)*(1-arr[2].value)+(1-arr[0].value)*(1-arr[1].value)*(arr[2].value))
    result[2]=roundTo4((arr[0].value)*(arr[1].value)*(1-arr[2].value)+(1-arr[0].value)*(arr[1].value)*(arr[2].value)+(arr[0].value)*(1-arr[1].value)*(arr[2].value));
    result[3]=roundTo4((arr[0].value)*(arr[1].value)*(arr[2].value));
    getAnElement('#tableDistribution').style.display='block';
    for (var i=0;i<result.length;i++) {
        recordtext(result[i],'#probabilities','td');
        recordtext((i),'#values','td');
    }
    var width =getAnElement('#probabilities').clientWidth
    getAnElement('#tableDistribution').style.width=(width)+'px';    
}
function showProb (arr,b0,b1,b2,b3) {
    var n0 = roundTo4((b0)?(arr[0]):(1-arr[0]))
    var n1 = roundTo4((b1)?(arr[1]):(1-arr[1]))
    var n2 = roundTo4((b2)?(arr[2]):(1-arr[2]))
    var n3 = roundTo4((b3)?(arr[3]):(1-arr[3]))
    return mult4(' '+n0,' '+n1,' '+n2,' '+n3);
}
function showFormula(b0,b1,b2,b3) {
    var n0 = (b0)?(' p_1'):(' q_1')
    var n1 = (b1)?(' p_2'):(' q_2')
    var n2 = (b2)?(' p_3'):(' q_3')
    var n3 = (b3)?(' p_4'):(' q_4')   
    return mult4(n0,n1,n2,n3);
}
function prob4(arr,b0,b1,b2,b3) {
    var n0 = (b0)?(arr[0]):(1-arr[0]);
    var n1 = (b1)?(arr[1]):(1-arr[1]);
    var n2 = (b2)?(arr[2]):(1-arr[2]);
    var n3 = (b3)?(arr[3]):(1-arr[3]);
    return n0*n1*n2*n3;
}
function renovate4() {
    var arr = getElements("tr[attr='valueOfCondition'] input");
    var arr2 = [];
    for (var i=0;i<arr.length;i++) {
        arr2[i] = +arr[i].value;
    }
    var resArr = [];
    var result = [];
    result[0]=roundTo4((1-arr[0].value))*roundTo4((1-arr[1].value))*roundTo4((1-arr[2].value))*roundTo4((1-arr[3].value));
    result[1]=roundTo6(prob4(arr2,1,0,0,0)+prob4(arr2,0,1,0,0)+prob4(arr2,0,0,1,0)+prob4(arr2,0,0,0,1));
    result[2]=roundTo6(prob4(arr2,1,1,0,0)+prob4(arr2,1,0,1,0)+prob4(arr2,1,0,0,1)+prob4(arr2,0,1,1,0)+prob4(arr2,0,1,0,1)+prob4(arr2,0,0,1,1));
    result[3]=roundTo6(+prob4(arr2,1,1,1,0)+(+prob4(arr2,1,1,0,1))+(+prob4(arr2,1,0,1,1))+(+prob4(arr2,0,1,1,1)));
    result[4]=roundTo6(prob4(arr2,1,1,1,1))
    for(var i=0;i<result.length;i++) {
        result[i]=roundTo6(result[i]);
    }
    var parent = getAnElement('#renovatedDistribution');    
    resArr[0] = 'P(X=0)='+showFormula(0,0,0,0)+'='+showProb(arr2,0,0,0,0)+'='+result[0]
    resArr[1]='P(X=1)='+showFormula(1,0,0,0)+'+'+showFormula(0,1,0,0)+'+'+showFormula(0,0,1,0)+showFormula(0,0,0,1)+'='
    resArr[2]='='+showProb(arr2,1,0,0,0)+showProb(arr2,0,1,0,0)+showProb(arr2,0,0,1,0)+showProb(arr2,0,0,0,1)+'='
    resArr[3]='='+result[1];
    resArr[4]='P(X=2)='+showFormula(1,1,0,0)+'+'+mult4('p_1',' '+'q_2',' '+'p_3',' '+' q_4')+'+'+mult4('p_1',' '+'q_2',' '+'q_3',' '+' p_4')+'+'+mult4('q_1',' '+'p_2',' '+'p_3',' '+' p_4')+'+'
    resArr[5]='+'+mult4('q_1',' '+'p_2',' '+'q_3',' '+' p_4')+'+'+mult4('q_1',' '+'q_2',' '+'p_3',' '+' p_4')+'='+mult4(roundTo4(arr[0].value),roundTo4(arr[1].value),roundTo4(1-arr[2].value),roundTo4(1-arr[3].value))+'+'+mult4(roundTo4(arr[0].value),roundTo4(1-arr[1].value),roundTo4(arr[2].value),roundTo4(1-arr[3].value))+'+';
    resArr[6]='+'+mult4(roundTo4(arr[0].value),roundTo4(1-arr[1].value),roundTo4(1-arr[2].value),roundTo4(arr[3].value))+'+'+mult4(roundTo4(1-arr[0].value),roundTo4(arr[1].value),roundTo4(arr[2].value),roundTo4(1-arr[3].value))+'+'+mult4(roundTo4(1-arr[0].value),roundTo4(arr[1].value),roundTo4(1-arr[2].value),roundTo4(arr[3].value))+'+'+mult4(roundTo4(1-arr[0].value),roundTo4(1-arr[1].value),roundTo4(arr[2].value),roundTo4(arr[3].value))+'=';
    resArr[7]='='+result[2];
    resArr[8]='P(X=3)='+showFormula(1,1,1,0)+'+'+showFormula(1,1,0,1)+'+'+showFormula(1,0,1,1)+'+'+showFormula(0,1,1,1)+'=';
    resArr[9]= '='+showProb(arr2,1,1,1,0)+'+'+showProb(arr2,1,1,0,1)+'+'+showProb(arr2,1,0,1,1)+'+'+showProb(arr2,0,1,1,1)+'='+result[3];
    resArr[10] = 'P(x=4)='+showFormula(1,1,1,1)+'='+showProb(arr2,1,1,1,1)+'='+result[4];
    for (var i=0;i<resArr.length;i++) {
        recordElement(resArr[i],'#renovatedDistribution','div');
    }
    
    getAnElement('#tableDistribution').style.display='block';
    
    for (var i=0;i<result.length;i++) {
        recordtext(result[i],'#probabilities','td');
        recordtext((i),'#values','td');
    }
    var width =getAnElement('#probabilities').clientWidth
    getAnElement('#tableDistribution').style.width=(width)+'px';
}

function launching() {

     if(getAnElement('#dimension').value==3) {
        var text = getAnElement('#text').value;
        getAnElement("span[atrr='text']").innerHTML = ' '+text;
        getAnElement("p[description='forRenovaiting']").style.display='block';
        getAnElement("p[description='aboutX']").style.display='block';
        renovate3(); 
    }
    if(getAnElement('#dimension').value==4) {
        var text = getAnElement('#text').value;
        getAnElement("span[atrr='text']").innerHTML = ' '+text;
        getAnElement("p[description='forRenovaiting']").style.display='block';
        getAnElement("p[description='aboutX']").style.display='block';
        renovate4(); 
    }
    if(getAnElement('#numberCharacteristic').checked) {
        showCalculateAverage();
    }
        if(getAnElement('#probabilityValue').checked) {
        getAnElement("p[description='prob']").style.display = 'block';
        calculateProbability();
    }
    if (getAnElement('#imageOfFunctionEmpire')) {
        getAnElement('#explainingForEmpireFunction').style.display = 'block';
        writeEmpireFunction();
    }
    console.log(getAnElement('#showPolygonOfDistribution'))
    if(getAnElement('#showPolygonOfDistribution').checked) {
        document.querySelector("p[description='grafPolygonFunction']").style.display='block';
        document.querySelector('.space').style.display='block'; 
        grafDistribution()
    }
    if(document.querySelector('#switchForEmpireFunction').checked) {
        document.querySelector("p[description='grafEmpireFunction']").style.display='block';
        document.querySelector('#grafEmpireFunction').style.display='block';
        graf();  
    }  
}

function showCalculateAverage ()      {//отримати матем сподівання і дисперсію
    getAnElement("p[description='computingMx']").style.display = 'block'
    var values = getElements('#values td');
    var probabilities = getElements('#probabilities td');
    var n = values.length;
    var mx = 'MX='+'\u005C'+'sum_{k=1}^{'+n+'}'+mult('X_{k}',' '+'p_{k}')+'='
    var mx2 = 'MX^2='+'\u005C'+'sum_{k=1}^{'+n+'}'+mult('X_{k}^2',' '+'p_{k}')+'='
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
function grafDistribution() {//многокутник розподілу
    var grafDistribution = document.querySelector('#polygonDistribution');
    var value = document.querySelectorAll('#values td');
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
function setPropertyToPoint(elem,width,height,color) { //надати властивості
    elem.style.position = 'absolute';
    elem.style.width =width+'px';
    elem.style.height=height+'px';
    elem.style.backgroundColor =color;
}
function graf() {//емпірична функція
    var coordinateAxes = document.querySelector('#grafEmpireFunction');
    var value = document.querySelectorAll('#values td');
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
function calculateProbability() {
    var value = document.querySelectorAll('#values td');
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
        for (var i= 0;i<n;i++) {
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
        calculation+=roundTo4(result);
    } else  {
        for (var i=0;i<n;i++) {
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
    var result = document.querySelector('#processOfSearchingProbability');
    result.innerHTML = '<img src="https://latex.codecogs.com/gif.latex?'+calculation+'" title="P(x=x_i)" />';
}