function frac(a,b)  {
    var str  = '&#92';
    str +='frac{'+a+'}{'+b+'}';
    return str;    
}
function sqrt(a) {
    var str = '&#92';
    str +='sqrt{'+a+'}';
    return str;        
}
function sum(a,b) {
    var str  = '&#92';
    str +='sum_{'+a+'}^{'+b+'}';
    return str;        
}

var cdot = '&#92'; //знак множення
cdot+='cdot ';
var infty = '&#92';
infty +='infty ';
var sigma = '&#92';
sigma +='sigma ';
var newline  = '&#92';
newline += '&#92 ';   
var approx  = '&#92';
approx += 'approx ' //приблизно
function latex (string) {
    var str = '&#92';
    str += string; 
    return str;
}

var Distribution = function (values,probs) {
    if (values.length ==probs.length) {
        this.values = values;
        this.probabilities = probs;
        this.dimension = this.values.length;
    } else {
        console.log('помилка, масиви не співадають')
    }
} 
Distribution.prototype.average = function() {
    var average = 0;
    for (var i=0;i<this.dimension;i++) {
            average = addFraction(average,multFraction(this.values[i],this.probabilities[i]))
        }
    if (typeof average =='number') {
        average = roundTo4(average)
    }
    return average;
}
//(add fractionLibrary.js)
Distribution.prototype.getMx2 = function () {
    var average2 = 0;
    for (var i=0;i<this.dimension;i++) {
        average2 = addFraction(average2,multFracs(this.values[i],this.values[i],this.probabilities[i]))
    }
    if (typeof average2 =='number') {
        average2 = roundTo4(average2)
    }
    return average2;
}
Distribution.prototype.dispersion = function () {
    var disp = substrationFraction(this.getMx2(),multFracs(this.average(),this.average()))
    if(typeof disp == 'number') {
        disp=roundTo4(disp)
    }
    return disp;
}
Distribution.prototype.deviation = function ()  {
    if (typeof this.dispersion() == 'number') {
        return roundTo4(Math.sqrt(this.dispersion())) 
    } else {
        return roundTo4(Math.sqrt(this.dispersion().numerator/this.dispersion().denominator))
    }
}
Distribution.prototype.calculateAverage = function(where) {
    var str = 'M(X)='+sum('i=1',this.dimension)+'x_i'+cdot+' p_i'+'=';
    for (var i =0;i<this.dimension;i++) {
        str+=correctMinus(this.values[i])+cdot+this.probabilities[i];
        if (i!=(this.dimension-1)) {
            str+='+';
        }
    }    
    str+='='+this.average();
    recordTasc(where,str)
}
Distribution.prototype.calculateMx2 = function(where) {
    var str = 'M(X^2)='+sum('i=1',this.dimension)+'x^2_i'+cdot+' p_i'+'=';
    for (var i =0;i<this.dimension;i++) {
        str+=correctMinus(this.values[i])+'^2'+cdot+this.probabilities[i];
        if (i!=(this.dimension-1)) {
            str+='+';
        }
    }
        str+='='+this.getMx2();
    recordTasc(where,str)
}
Distribution.prototype.calculateDispAndDeviation = function(where) {
    var str = 'D(X)=M(X^2)-(M(X))^2='+this.getMx2()+'-('+this.average()+')^2='+this.dispersion()
    var str1 = sigma+'(X)='+sqrt(this.dispersion()) + approx + this.deviation()
    var result  = str + newline + str1;
    recordTasc(where,result)
}
Distribution.prototype.showDistribution = function (where) {
    var table = document.createElement('table');
    var trValues = [];
    var trProbabilities = [];
    var tr = document.createElement('tr')
    var tr1 = document.createElement('tr')
    for (var i =0 ;i<=this.dimension;i++) {
        if (i==0)  {
            trValues[i] = document.createElement('th');
            trProbabilities[i] = document.createElement('th');
            trValues[0].innerHTML=createExpression('X_k');
            trProbabilities[0].innerHTML=createExpression('p_k');            
        } else {
            trValues[i] = document.createElement('td');
            trProbabilities[i] = document.createElement('td');
            trValues[i].innerHTML = createExpression(this.values[i-1])
            trProbabilities[i].innerHTML = createExpression(this.probabilities[i-1])
        }
        tr.appendChild(trValues[i])
        tr1.appendChild(trProbabilities[i])
    }
    table.appendChild(tr)
    table.appendChild(tr1)
    table.setAttribute('border','2')
    table.style.borderCollapse = 'collapse';
    table.style.marginRight  = 'auto';
    table.style.marginLeft  = 'auto';
    document.querySelector(where).appendChild(table)
} 
Distribution.prototype.rerordFunctionOfDistribution = function (where) {
    var accumulatedProb = 0;
    var stringForEmpire ='F_{d}(x)='+'\u005C'+'left'+'\u005C'+'{'+'\u005C'+'begin{matrix}'+ '0,x'+'\u005C'+'leq'+this.values[0]+'\u005C'+'\u005C';
    for (var i =0;i<this.values.length;i++) {
        if(i==(this.values.length-1)) {
            stringForEmpire+='1,x>'+this.values[i];
            break;
        }
        accumulatedProb+=(this.probabilities[i]);
        accumulatedProb=Math.round(accumulatedProb*100)/100;
        stringForEmpire+=accumulatedProb+','+this.values[i]+'&lt;'+'x'+ '\u005C'+ 'leq' +this.values[i+1]+'\u005C'+'\u005C';
    }
    stringForEmpire +='\u005C'+'end{matrix}'+'\u005C'+'right.';
    recordTasc(where,stringForEmpire)
}


function Interval(a,b) {
    this.downLimit=a;
    this.upLimit = b;
    this.downInclude = true;
    this.UpInclude = true;
}
Interval.prototype.showInterval = function() {
    var str = '';
    if (this.downInclude) {
        str+='[' 
    } else {
        str+='('
    }
    str+=this.downLimit+';'+this.upLimit;
    if(this.UpInclude) {
        str+=']'
    } else {
        str+=')'
    }
    return str;
}
Interval.prototype.contain = function (a) {
    if ((this.downLimit<a)&&(this.upLimit>a)) return true;    
    if ((this.downLimit==a)&&(this.downInclude)) return true;
    if ((this.upLimit==a)&&(this.UpInclude)) return true;
    return false;
}
Distribution.prototype.probabilityFromTo  = function(Interval,where) {
    var strValues = 'P(x'+latex('in')+Interval.showInterval()+')=';
    var strProbabilities = '';
    var result = 0;
    for (var i=0;i<this.dimension;i++) {
        if (Interval.contain(this.values[i])) {
            result = addFracs(result,this.probabilities[i]);
            strValues+='P(X='+this.values[i]+')'
            strProbabilities+=this.probabilities[i]
            if (i==(this.dimension-1)) {
                strValues+='=';
                strProbabilities+='=';
            }   else {
                strValues+='+';
                strProbabilities+='+';
            }
        }
    }
    if (typeof result == 'number') { 
        result = roundTo4(result) 
        }
    var str = strValues+strProbabilities+result;
    recordTasc(where,str)
}
Distribution.prototype.grafFunctionDistribution = function(where) {
    var arrayOfInterval = [];
    arrayOfInterval[0] = {
        x:[this.values[0]-3,this.values[0]],
        y:[0,0],
        type:'lines',
        mode:'lines'
    }
    var pointArray = [];
    var pointArrayValue = [];
    var accumulated = 0;
    for(var i =1;i<this.values.length;i++) {
        accumulated+=this.probabilities[i-1];
        arrayOfInterval[i] = {
            x:[this.values[i-1],this.values[i]],
            y:[accumulated,accumulated],
            type:'lines',
            mode:'lines',
        }

        pointArray[i-1] = this.values[i-1]
        pointArrayValue[i-1] = accumulated;
//        pointArray[i-1] = {
//            x: this.values[i-1],
//            y: accumulated,
//            type: 'markers',
//            mode: 'markers'
//        }
    }
    pointArray[pointArray.length] = this.values[this.values.length-1]
    pointArrayValue[pointArrayValue.length] = 1;
    arrayOfInterval[this.values.length] = {
        x:[this.values[this.values.length-1],this.values[this.values.length-1]+1],
        y:[1,1],
        type:'lines',
        mode:'lines'
    }
    arrayOfInterval[this.values.length+1] = {
        x: pointArray,
        y: pointArrayValue,
        uid: 'black',
        type: 'markers',
        mode: 'markers'
    }

    var layout = {
      showlegend: false,
      xaxis: {
        rangemode: 'tozero',
        autorange: true
      },
      yaxis: {
        rangemode: 'nonnegative',
        autorange: true
      }
    };
    Plotly.newPlot(where, arrayOfInterval, layout);
}
Distribution.prototype.polygon = function(where) {
    var data = [ {
        x: this.values,
        y: this.probabilities, 
        type: 'scatter'
    } ];
    var layout = {
      showlegend: false,
      xaxis: {
        rangemode: 'tozero',
        autorange: true
      },
      yaxis: {
        rangemode: 'nonnegative',
        autorange: true
      }
    };
    Plotly.newPlot(where, data, layout);
}
//var arr1 = [-3,-2,1,3]
//var arr2 = [0.4,0.3,0.2,0.1]
//var dis = new Distribution(arr1,arr2);
//dis.showDistribution('#test');
//dis.calculateAverage('#test1')
//dis.calculateMx2('#test2')
//dis.calculateDispAndDeviation('#box');