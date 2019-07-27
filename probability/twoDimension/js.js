function createTableInput(){
    var n=+getElements('input')[0].value;
    var m=+getElements('input')[1].value;
    for (var i=0;i<=n;i++) {
        var tr = document.createElement('tr')
        var parent = getAnElement('table tbody');
        parent.appendChild(tr)
        for (var j=0;j<=m;j++) {
            var td = document.createElement('td')
            var input = document.createElement('input')
            tr.appendChild(td)
            td.appendChild(input)
        }
    }
    getElements('input')[3].value = 'X \u005C Y'
    getAnElement('#button').style.display = 'block'
}
function sumMonoNoms() {
    var result=0;
    for(var i=0;i<arguments.length;i++) {
        if (arguments[i]=='a') {
            arguments[i]='1a'
        }
        result+=parseFloat(arguments[i])
    }
    return roundTo6(result);
}
function parametrA() {
    var getInput = getElements('tbody tr')
    var denominator =0;
    var arr = [];
    for (var i=0;i<getInput.length;i++) {
        arr[i] =getInput[i].childNodes;
    }
    var str = '\u005C'+'sum_{i=0}^{'+(arr.length-1)+'}'+'\u005C'+'sum_{i=0}^{'+(arr[0].length-1)+'}p_{ij}=';
    for (var i=1;i<arr.length;i++) {
        for (var j=1;j<arr[i].length;j++){
            denominator=sumMonoNoms(arr[i][j].firstChild.value,denominator)
            str+=arr[i][j].firstChild.value+'+';
        }
    }
    str = str.slice(0,str.length-1)
    str +='='+denominator+'a' 
    var valuesX = [];
    var valuesY = [];
    for (var i=0;i<(arr[0].length-1);i++) {
        valuesY[i] = arr[0][i+1].firstChild.value
    }  
    for (var i=0;i<arr.length-1;i++) {
        valuesX[i] = arr[i+1][0].firstChild.value
    }
    recordtext('<b>Знайти параметр a та відновити розподіл</b>','#searchSum','p')
    recordtext('Як відомо сума всіx імовірностей повинна бути рівна 1, отже','#searchSum','p')
    recordElement(str,'#searchSum','div')
    var parent = getElements('table tbody')[1];
    recordtext('Отже ми можемо знайти а','#searchSum','p')
    recordElement(denominator+'a=1','#searchSum','p')
    recordElement('a='+divide(1,' '+denominator),'#searchSum','p')
    recordtext('Враховуючи це, розподіл матиме вигляд','#searchSum','p')
outer:    for (var i=0;i<arr.length;i++) {
        var tr = document.createElement('tr')
        parent.appendChild(tr)
        inner: for (var j=0;j<arr[i].length;j++) {
            if(i==0) {
                if (j==0) {
                    var td = document.createElement('td');
                    td.innerHTML =  'X \u005C Y'
                    tr.appendChild(td)
                    continue inner;
                }
                var td = document.createElement('td')
                td.innerHTML = valuesY[j-1]
                tr.appendChild(td)
                if (j==valuesX.length) continue outer;
            } else {
                if (j==0) {
                    var td= document.createElement('td');
                    td.innerHTML = valuesX[i-1]
                    tr.appendChild(td) 
                } else {
                    var td = document.createElement('td');
                    var numerator = (arr[i][j].firstChild.value=='a')?(1):(parseFloat(arr[i][j].firstChild.value)) 
                    td.innerHTML =createFormula(' '+ new Fraction (numerator,denominator))
                    tr.appendChild(td) 
                }
            }
        }
    }
}
function createDistribution() {
    recordtext('Розподіл має вигляд','#searchSum','p')
    var getInput=getElements('tbody tr')
    var arr=[];
    for (var i=0;i<getInput.length;i++) {
        arr[i] =getInput[i].childNodes;
    }  
    var valuesX = [];
    var valuesY = [];
    for (var i=0;i<(arr[0].length-1);i++) {
        valuesY[i] = arr[0][i+1].firstChild.value
    }  
    for (var i=0;i<arr.length-1;i++) {
        valuesX[i] = arr[i+1][0].firstChild.value
    }   
    var parent = getElements('table tbody')[1];
outer:    for (var i=0;i<arr.length;i++) {
        var tr = document.createElement('tr')
        parent.appendChild(tr)
        inner: for (var j=0;j<arr[i].length;j++) {
            if(i==0) {
                if (j==0) {
                    var td = document.createElement('td');
                    td.innerHTML =  'X \u005C Y'
                    tr.appendChild(td)
                    continue inner;
                }
                var td = document.createElement('td')
                td.innerHTML = valuesY[j-1]
                tr.appendChild(td)
                if (j==valuesY.length) continue outer;
            } else {
                if (j==0) {
                    var td= document.createElement('td');
                    td.innerHTML = valuesX[i-1]
                    tr.appendChild(td) 
                } else {
                    var td = document.createElement('td');
                    var k  = arr[i][j].firstChild.value.indexOf('/')
                    if ( k==-1)  {
                        td.innerHTML = arr[i][j].firstChild.value
                    } else {
                        k = arr[i][j].firstChild.value.indexOf('/')
                        var numerator = arr[i][j].firstChild.value.slice(0,k)
                        var denominator = arr[i][j].firstChild.value.slice(k+1)
                        td.innerHTML = (' '+ (numerator+'/'+denominator))
                    }
                    tr.appendChild(td) 
                }
            }
        }
    } 
    componentDistribution()
}
function componentDistribution() {
    recordtext('Запишемо розподіли компонент','#componentX','div')
    var arrForm = getElements('#distr tr')
    var arr = []
    for (var i=0;i<arrForm.length;i++) {
        arr[i] =arrForm[i].childNodes;
    }  
    var parentX = getAnElement('#componentX')
    var parentY = getAnElement('#componentY')
    var probabilitiesX =[];
    var probabilitiesXStr =[];
    var probabilitiesY =[];
    var probabilitiesYStr =[];
    var valuesX = [];
    var valuesY = [];
    for (var i=1;i<arr[0].length;i++) {
        valuesY[i-1] = arr[0][i].innerHTML
    }
    for (var i=1;i<arr.length;i++) {
        valuesX[i-1] = arr[i][0].innerHTML;
    }
    for (var i=1;i<arr.length;i++) {
        probabilitiesX[i-1] = 0;
        probabilitiesXStr[i-1] = '';
        for(var j=1;j<arr[i].length;j++) {
            var k = arr[i][j].innerHTML.indexOf('/') 
            if (k==-1) {
                probabilitiesX[i-1] +=(+arr[i][j].innerHTML)
                probabilitiesXStr[i-1]+=arr[i][j].innerHTML+'+'
                probabilitiesX[i-1]= roundTo4(probabilitiesX[i-1]) 
            } else {
                var numerator = arr[i][j].innerHTML.slice(0,k)
                var denminator = arr[i][j].innerHTML.slice(k+1)
                probabilitiesX[i-1] =addFraction(new Fraction(+numerator,+denminator),probabilitiesX[i-1])
                probabilitiesXStr[i-1]+=new Fraction(+numerator,+denminator)+'+';
            }
        }        
        probabilitiesXStr[i-1] ='P(X='+valuesX[i-1]+')='+probabilitiesXStr[i-1].slice(0,probabilitiesXStr[i-1].length-1)+'='+probabilitiesX[i-1]
        recordElement(probabilitiesXStr[i-1],'#componentX','div')
    }
    for (var i=1;i<arr[0].length;i++) {
        probabilitiesY[i-1] = 0;
        probabilitiesYStr[i-1] = '';
        for(var j=1;j<arr.length;j++) {
            var k = arr[j][i].innerHTML.indexOf('/')
            if (k==-1) {
                probabilitiesY[i-1] +=(+arr[j][i].innerHTML)
                probabilitiesYStr[i-1]+=arr[j][i].innerHTML+'+'
                probabilitiesY[i-1]= roundTo4(probabilitiesY[i-1])
            } else {
                var numerator = arr[j][i].innerHTML.slice(0,k)
                var denminator = arr[j][i].innerHTML.slice(k+1)              
                probabilitiesY[i-1] = addFraction(new Fraction(+numerator,+denminator),probabilitiesY[i-1])
                probabilitiesYStr[i-1]+=new Fraction(+numerator,+denminator)+'+';     
            }
        }        
        probabilitiesYStr[i-1] ='P(Y='+valuesY[i-1]+')='+probabilitiesYStr[i-1].slice(0,probabilitiesYStr[i-1].length-1)+'='+probabilitiesY[i-1]
        recordElement(probabilitiesYStr[i-1],'#componentY','div')
    }

    var tableX = parentX.appendChild(document.createElement('table'))
    var tableY = parentY.appendChild(document.createElement('table'))
    for (var i=0; i<valuesX.length;i++) {
        if (i==0) {
            var tr = tableX.appendChild(document.createElement('tr'))
            var caption = tableX.appendChild(document.createElement('caption'))
            caption.innerHTML = 'Розподіл компоненти Х'
            tr.setAttribute('values','x')
            var th = tr.appendChild(document.createElement('th'))
            th.innerHTML ='X<sub>k</sub>'
        }
        var td = tr.appendChild(document.createElement('td'))
        td.innerHTML = valuesX[i];
    }    
    for (var i=0; i<probabilitiesX.length;i++) {
        if (i==0) {
            var tr = tableX.appendChild(document.createElement('tr')) 
            tr.setAttribute('probabilities','x')
            var th = tr.appendChild(document.createElement('th'))
            th.innerHTML ='p<sub>k</sub>'
        }
        var td = tr.appendChild(document.createElement('td'))
        if (typeof probabilitiesX[i] == 'number') {
            td.innerHTML = probabilitiesX[i]
        } else {
            td.innerHTML = probabilitiesX[i].numerator +'/' +probabilitiesX[i].denominator;
        }
    }
    for (var i=0; i<valuesY.length;i++) {
        if (i==0) {
            var caption = tableY.appendChild(document.createElement('caption'))
            caption.innerHTML = 'Розподіл компоненти У'
            var tr = tableY.appendChild(document.createElement('tr'))
            tr.setAttribute('values','y')
            var th = tr.appendChild(document.createElement('th'))
            th.innerHTML ='Y<sub>k</sub>'
        }
        var td = tr.appendChild(document.createElement('td'))
        td.innerHTML = valuesY[i];
    }    
    for (var i=0; i<probabilitiesY.length;i++) {
        if (i==0) {
            var tr = tableY.appendChild(document.createElement('tr')) 
            tr.setAttribute('probabilities','y')
            var th = tr.appendChild(document.createElement('th'))
            th.innerHTML ='p<sub>k</sub>'
        }
        var td = tr.appendChild(document.createElement('td'))
        if (typeof probabilitiesY[i] == 'number') {
            td.innerHTML = probabilitiesY[i]
        } else {
            td.innerHTML = probabilitiesY[i].numerator +'/' +probabilitiesY[i].denominator;
        }
    }
    calculateNumberCharacteristic ('x','#numberCharacteristicX')
    calculateNumberCharacteristic ('y','#numberCharacteristicY')
}
var countMXY = 0;
function co () {
    return function() {
        countMXY++;
    }
}
var count = co();
function calculateNumberCharacteristic (variable,parent) {
    count()
    recordtext('Обчислимо чоислові характеристики компоненти '+variable.toUpperCase(),parent,'p')
    var values = getElements('tr[values='+variable+'] td')
    var probabilities = getElements('tr[probabilities='+variable+'] td')
    var mx = 0;
    var mx2 = 0;
    var mxS = 'M('+variable.toUpperCase()+')='+'&#92'+'sum_{i=1}^{'+values.length+'}X_{i}p_{i}=';
    var mx2S = 'M('+variable.toUpperCase()+'^2)='+'&#92'+'sum_{i=1}^{'+values.length+'}(X_{i})^2p_{i}=';
    for (var i =0;i<values.length;i++) {
        var k = probabilities[i].innerHTML.indexOf('/')        
        if (k==-1 ) { 
            mx += (+values[i].innerHTML)*(+probabilities[i].innerHTML)
            mx2 += (+values[i].innerHTML)*(+values[i].innerHTML)*(+probabilities[i].innerHTML)
            mxS +=mult(values[i].innerHTML,probabilities[i].innerHTML)+'+';
            mx2S +=mult(correctMinus(values[i].innerHTML)+'^2',probabilities[i].innerHTML)+'+';
            mx = roundTo6(mx);
            mx2 = roundTo6(mx2);        
            var dx = mx2-mx*mx;
            dx = roundTo6(dx);
            var sx =roundTo4(Math.sqrt(dx));  
            var dxS = 'D('+variable.toUpperCase()+')=M('+variable.toUpperCase()+'^2)-M('+variable.toUpperCase()+')^2='+mx2+'-'+correctMinus(mx)+'^2='+dx; 
            var sxS = '&#92'+'sigma('+variable.toUpperCase()+')='+'&#92'+'sqrt{D('+variable.toUpperCase()+')}='+'&#92'+'sqrt{'+dx+'}='+sx;            
        } else {
            var numerator = +probabilities[i].innerHTML.slice(0,k);
            var denominator = +probabilities[i].innerHTML.slice(k+1);
            var prob = new Fraction(numerator,denominator)
            mx = addFraction(mx,multFraction(prob,+values[i].innerHTML));
            mx2 = addFraction(mx2,multFraction(prob,(+values[i].innerHTML)*(+values[i].innerHTML)));
            mxS+=mult(prob,' '+values[i].innerHTML)+'+';
            mx2S+=mult(prob,' ('+values[i].innerHTML)+')^2'+'+';
            var dx = substrationFraction(mx2,multFraction(mx,mx))
            if (typeof dx == 'number') {
                var sx = roundTo4(Math.sqrt(dx))
            } else {
                var sx = roundTo4(Math.sqrt(dx.numerator/dx.denominator))
            }
            var dxS = 'D('+variable.toUpperCase()+')=M('+variable.toUpperCase()+'^2)-M('+variable.toUpperCase()+')^2='+mx2+'-('+(mx)+')^{2}='+dx;             
            var sxS = '&#92'+'sigma('+variable.toUpperCase()+')='+'&#92'+'sqrt{D('+variable.toUpperCase()+')}='+'&#92'+'sqrt{'+dx+'}='+sx;              
        }
    }
    mxS=mxS.slice(0,mxS.length-1)+'='+(mx);
    mx2S=mx2S.slice(0,mx2S.length-1)+'='+(mx2);
    recordElement(mxS,parent,'div');
    recordElement(mx2S,parent,'div');
    recordElement(dxS,parent,'div');
    recordElement(sxS,parent,'div');
    if (countMXY == 2) {
        var mxyParent = getAnElement('#MXY');
        var arrForm = getElements('#distr tr')
        var arr = []
        for (var i=0;i<arrForm.length;i++) {
            arr[i] =arrForm[i].childNodes;
        }          
        var formStr= 'M(XY)='+'&#92'+'sum_{i=1}^{'+(arr.length-1)+'}'+'&#92'+'sum_{j=1}^{'+(arr[0].length-1)+'}'+mult3('x_i',' '+' y_j',' p_{ij}')+'='
        var mxyStr = '=';
        var mxy = 0;
        var k=arr[2][2].innerHTML.indexOf('/');
        if (k==-1) {
            for (var i=1;i<arr.length;i++) {
                mxyStr+=arr[i][0].innerHTML+'('
                var mxyScal = 0;
                for (var j=1;j<arr[i].length;j++) {
                    mxyScal+=(+arr[i][j].innerHTML)*(+arr[0][j].innerHTML);
                    mxyStr+=mult(arr[0][j].innerHTML,' '+arr[i][j].innerHTML)+'+'
                }
                    mxyScal*=(+arr[i][0].innerHTML)
                    mxyStr =mxyStr.slice(0,mxyStr.length-1)+')+'    
                    mxy+=mxyScal;
                }    
            mxyStr=mxyStr.slice(0,mxyStr.length-1)    
            mxyStr +='='+roundTo4(mxy);         
            recordElement(formStr,'#MXY','div')    
            recordElement(mxyStr,'#MXY','div') 
            var values = getElements('tr[values="x"] td')
            var probabilities = getElements('tr[probabilities="x"] td')
            var my = 0;
            var my2 = 0;
            for (var i=0;i<values.length;i++) {
                my+=(+values[i].innerHTML)*(+probabilities[i].innerHTML)
                my2+=(+values[i].innerHTML)*(+values[i].innerHTML)*(+probabilities[i].innerHTML)
            }
            my = roundTo4(my)
            my2 = roundTo4(my2)
            var dy =roundTo4(my2-my*my) 
            var sy = Math.sqrt(dy)
            var covStr = 'K_{XY}=M(XY)-M(X)M(Y)='+roundTo4(mxy)+'-'+mult(correctMinus(mx),+' '+correctMinus(my))+'='+roundTo4(mxy-mx*my)
            var correlStr = 'r_{xy}='+divide('K_{xy}',' '+'&#92'+'sigma (X)'+'&#92'+'sigma (Y)')+'='+divide(roundTo4(mxy-mx*my),mult('&#92'+'sqrt{'+dx+'}','&#92'+'sqrt{'+dy+'}'))+'='+roundTo4((mxy-mx*my)/(sx*sy))
            recordElement(covStr,'#MXY','div')    
            recordElement(correlStr,'#MXY','div')                        
        } else {    
            var arrFracs = []
            for (var i=1;i<arr.length;i++) {
                arrFracs[i] = [];
                for (var j=1;j<arr[i].length;j++) {
                    k =arr[i][j].innerHTML.indexOf('/');
                    var numerator = +arr[i][j].innerHTML.slice(0,k);
                    var denominator = +arr[i][j].innerHTML.slice(k+1)
                    arrFracs[i][j] = new Fraction(numerator,denominator)
                }
            }
            for (var i=1;i<arr.length;i++) {
                mxyStr+=correctMinus(+arr[i][0].innerHTML)+'('
                var mxyScal = 0;
                for (var j=1;j<arr[i].length;j++) {
                    mxyComp=multFraction(arrFracs[i][j],(+arr[0][j].innerHTML));
                    mxyScal=addFraction(mxyComp,mxyScal)
                    mxyStr+=mult(arr[0][j].innerHTML,' '+arrFracs[i][j])+'+'
                }
                mxyScal=multFraction((+arr[i][0].innerHTML),mxyScal)
                mxyStr =mxyStr.slice(0,mxyStr.length-1)+')+'    
                mxy=addFraction(mxyScal,mxy);
                }    
            mxyStr=mxyStr.slice(0,mxyStr.length-1)    
            mxyStr +='='+(mxy);         
            recordElement(formStr,'#MXY','div')    
            recordElement(mxyStr,'#MXY','div')   
     
            var values = getElements('tr[values="x"] td')
            var probabilities = getElements('tr[probabilities="x"] td')
            var my = 0;
            var my2 = 0;
            var fracs = [];
            for (var i=0;i<values.length;i++) {
                var k = probabilities[i].innerHTML.indexOf('/');
                var numerator = +probabilities[i].innerHTML.slice(0,k);
                var denominator=+probabilities[i].innerHTML.slice(k+1);
                fracs[i] = new Fraction(numerator,denominator);
                var myAdd=multFraction((+values[i].innerHTML),fracs[i]);
                my=addFraction(my,myAdd)
                var my2Add = multFracs(fracs[i],(+values[i].innerHTML),(+values[i].innerHTML))
                my2=addFracs(my2,my2Add);
            }
            var dy =substrationFraction(my2,multFracs(my,my)) 
            var sy = Math.sqrt(dy)
            var covStr = 'K_{XY}=M(XY)-M(X)M(Y)='+(mxy)+'-'+mult('('+mx+')','('+(my)+')')+'='+substrationFraction(mxy,multFracs(mx,my)) 
            var correlNum=substrationFraction(mxy,multFracs(mx,my))
            var correlDen=multFraction(dx,dy)
            var correl = correlNum.numerator/correlNum.denominator/Math.sqrt(correlDen.numerator/correlDen.denominator)
            var correlStr = 'r_{xy}='+divide('K_{xy}',' '+'&#92'+'sigma (X)'+'&#92'+'sigma (Y)')+'='+divide(substrationFraction(mxy,multFracs(mx,my)),mult('&#92'+'sqrt{'+dx+'}','&#92'+'sqrt{'+dy+'}'))+'&#92'+'approx'+roundTo4(correl)
            recordElement(covStr,'#MXY','div')    
            recordElement(correlStr,'#MXY','div')       
        }          
    }
}
function conditionPossibility(value,condition,letter1,letter2,trueIfHorisontal) {
    var arrForm = getElements('#distr tr')
    var arr = []
    for (var i=0;i<arrForm.length;i++) {
        arr[i] =arrForm[i].childNodes;
    }
    var k = arr[value][condition].innerHTML.indexOf('/');
    if (k==-1) {
        var conditionProbability = 0;
        if (letter1 == 'Y') {
            for (var i=1;i<arr[condition].length;i++) {
                conditionProbability+=roundTo4(+arr[condition][i].innerHTML);
                var intersections = (+arr[condition][value].innerHTML)
            }
        } else {
            for (var i=1;i<arr.length;i++) {
                conditionProbability+=roundTo4(+arr[i][value].innerHTML)
                var intersections = (+arr[condition][value].innerHTML)
            }
        } 
        if (letter1 == 'Y') {
            var formula='P('+letter1+'='+arr[0][value].innerHTML+'|'+letter2+'='+arr[condition][0].innerHTML+')='+divide('P('+letter1+'='+arr[0][value].innerHTML+','+letter2+'='+arr[condition][0].innerHTML+')','P('+letter2+'='+arr[condition][0].innerHTML+')')+'='+divide(intersections,' '+conditionProbability) + '=' +  (intersections/conditionProbability) 
        } else {
            var formula='P('+letter1+'='+arr[condition][0].innerHTML+'|'+letter2+'='+arr[0][value].innerHTML+')='+divide('P('+letter1+'='+arr[0][value].innerHTML+','+letter2+'='+arr[condition][0].innerHTML+')','P('+letter2+'='+arr[0][value].innerHTML+')')+'='+divide(intersections,' '+conditionProbability) + '=' +  (intersections/conditionProbability)    
        }
        return formula
    } else {
        var conditionProbability = 0;
        var arrP =[];
        if (letter1 == 'Y') {
            for (var i=1;i<arr[condition].length;i++) {
                arrP[condition] = []
                arrP[i] = []
                var helpK = arr[condition][i].innerHTML.indexOf('/')
                var numerator = +arr[condition][i].innerHTML.slice(0,helpK)
                var denominator = +arr[condition][i].innerHTML.slice(helpK+1)
                arrP[condition][i] = new Fraction (numerator,denominator)
                conditionProbability=addFraction(conditionProbability,arrP[condition][i]);
                var helpK2 = arr[condition][value].innerHTML.indexOf('/')
                var intersections =new Fraction ( +arr[condition][value].innerHTML.slice(0,helpK2),+arr[condition][value].innerHTML.slice(helpK2+1))
            }
        } else {
            for (var i=1;i<arr.length;i++) {
                arrP[condition] = []
                arrP[i] = []
                var helpK =+arr[i][value].innerHTML.indexOf('/')
                var numerator = +arr[i][value].innerHTML.slice(0,helpK)
                var denominator = +arr[i][value].innerHTML.slice(helpK+1)  
                arrP[condition][i] = new Fraction (numerator,denominator)
                conditionProbability=addFraction(conditionProbability,arrP[condition][i]);                
                var helpK2 = arr[condition][value].innerHTML.indexOf('/')
                var intersections =new Fraction ( +arr[condition][value].innerHTML.slice(0,helpK2),+arr[condition][value].innerHTML.slice(helpK2+1))
            }
        }
        if(letter1 == 'Y') {
            var formula='P('+letter1+'='+arr[0][value].innerHTML+'|'+letter2+'='+arr[condition][0].innerHTML+')='+divide('P('+letter1+'='+arr[0][value].innerHTML+','+letter2+'='+arr[condition][0].innerHTML+')','P('+letter2+'='+arr[condition][0].innerHTML+')')+'='+divide(intersections,' '+conditionProbability) + '=' + divideFraction(intersections,conditionProbability) 
        } else {
            var formula='P('+letter1+'='+arr[condition][0].innerHTML+'|'+letter2+'='+arr[0][value].innerHTML+')='+divide('P('+letter1+'='+arr[condition][0].innerHTML+','+letter2+'='+arr[0][value].innerHTML+')','P('+letter2+'='+arr[0][value].innerHTML+')')+'='+divide(intersections,' '+conditionProbability) + '=' +divideFraction(intersections,conditionProbability)    
        }
        return formula   
    }
}
function conditionDistribution(condition,variable) {
    var n=+getElements('input')[0].value; 
    var m=+getElements('input')[1].value;    
    if(variable=='X'){
        for (var i=1;i<=n;i++) {
            var str=conditionPossibility(condition,i,variable,'Y')
            recordElement(str,'#condition','div')
        }
    } else {
         for (var i=1;i<=m;i++) {
            var str=conditionPossibility(i,condition,variable,'X')
            recordElement(str,'#condition','div')
        }       
    }
}