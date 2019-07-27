var counterCalls = 0;
var counterCallsForConditionDistribution = 0;
function clojure ()  {
	return function () {
		counterCalls++;
	}
}
function clojure2 ()  {
	return function () {
		counterCallsForConditionDistribution++;
	}
}
var countCalls = clojure();
var countCallsForCondition = clojure2();
function createFormOfSendingData () {
	countCalls();
	if (counterCalls == 1) {
		$('#listOfTasc').toggleClass('none') 
	}
	if (counterCalls>1) {
		$('#table').text('');
	}
    var dimX= $('input[name=dimensionX]').val();
    var dimY= $('input[name=dimensionY]').val();
    var arr = [];
    for (var i =0;i<=dimX;i++) {
        arr[i]= [];
        for (var j = 0;j<=dimY;j++) {
            var input = document.createElement('input');
            input.setAttribute('class','smallForm');
            input.setAttribute('id',i+''+j);
			input.setAttribute('value',(i+j)/(100))
            arr[i][j]=input;
        }
    }
    arr[0][0].value='X/Y';
	createTableWithForms(arr,'#table');
	if (counterCalls == 1)  {
		recordtext('Для горизонтального розподілу','#listOfTasc','div');
		for (var i =0;i<dimX;i++) {
			var div = document.createElement('div');
			$('#listOfTasc')[0].appendChild(div);
			div.innerHTML = "Умовний розподіл "+(i+1)+" елемента<input type='checkbox' name='hor"+i+"'>"+"мат. спод.<input type='checkbox' name='hmx"+i+"'>дисперсія<input type='checkbox' name='hdx"+i+"'>"
		}
		recordtext('Для вертикального розподілу','#listOfTasc','div');
		for (var i =0;i<dimY;i++) {
			var div = document.createElement('div');
			$('#listOfTasc')[0].appendChild(div);
			div.innerHTML = "Умовний розподіл "+(i+1)+" елемента<input type='checkbox' name='ver"+i+"'>"+"мат. спод.<input type='checkbox' name='vmx"+i+"'>дисперсія<input type='checkbox' name='vdx"+i+"'>"
		}
	}
}

function includeCheckbox(selectorSwitch,selectorForChecked) {
	if($(selectorSwitch)[0].checked) {
		$(selectorForChecked)[0].setAttribute('checked','');
	}
}

function processData (where) {
    var dimX= $('input[name=dimensionX]').val();
    var dimY= $('input[name=dimensionY]').val();
	var arr = [];
	var arrX = [];
	var arrY = [];
	var arrValX = [];
	var arrValY = [];
	for (var i=0;i<dimX;i++) {
		arr[i] = [];
		for (var j =0;j<dimY;j++) {
			arr[i][j] = isFraction($('#'+(i+1)+(j+1)).val())
		}
	}
	var nameOfDistributions = $('#00').val();
	for (var i=1;i<=dimX;i++) {
		arrX[i-1] = isFraction($('#'+i+'0').val())
		arrValX[i-1] = 0;
		for (var j =0;j<dimY;j++){
			arrValX[i-1] = addFracs(arr[i-1][j],arrValX[i-1])
			if (typeof arrValX[i-1] == 'number')	arrValX[i-1] = roundTo(arrValX[i-1],6)
		}
	}
	for (var i=1;i<=dimY;i++) {
		arrY[i-1] = isFraction($('#0'+i).val())
		arrValY[i-1] = 0;
		for (var j =0;j<dimX;j++){
			arrValY[i-1] = addFracs(arr[j][i-1],arrValY[i-1]);
			if (typeof arrValY[i-1] == 'number') arrValY[i-1] = roundTo(arrValY[i-1],6);
		}			
	}
	recordtext('Обчислимо розподіли компонент',where,'div');
	if (nameOfDistributions[0]=='X') {
		for (var i = 0;i<dimX;i++) {
			var str = 'P(x='+ arrX[i]+')='
			for (var j=0;j<dimY;j++) {
				str+=arr[i][j]
				if(j!=dimY-1) {
					str+='+'
				}
			}
			str+='='+arrValX[i]
			recordElement(str,where,'div')
		}	
		for (var i = 0;i<dimY;i++) {
			var str = 'P(x='+ arrY[i]+')='
			for (var j=0;j<dimX;j++) {
				str+=arr[j][i]
				if(j!=dimX-1) {
					str+='+'
				}
			}
			str+='='+arrValY[i]
			recordElement(str,where,'div')
		}

		var dis1 = new  Distribution(arrX,arrValX,'X') 
		var dis2 = new  Distribution(arrY,arrValY,'Y') 
	} else {
		for (var i = 0;i<dimX;i++) {
			var str = 'P(y='+ arrX[i]+')='
			for (var j=0;j<dimY;j++) {
				str+=arr[i][j]
				if(j!=dimY-1) {
					str+='+'
				}
			}
			str+='='+arrValX[i]
			recordElement(str,where,'div')
		}	
		for (var i = 0;i<dimY;i++) {
			var str = 'P(x='+ arrY[i]+')='
			for (var j=0;j<dimX;j++) {
				str+=arr[j][i]
				if(j!=dimX-1) {
					str+='+'
				}
			}
			str+='='+arrValY[i]
			recordElement(str,where,'div')
		}
		var dis1 = new Distribution(arrX,arrValX,'Y') 
		var dis2 = new Distribution(arrY,arrValY,'X') 
	}
	recordtext('Запишемо дискретні одновимірні розподіли у вигляді таблиці',where,'div');
	dis1.showDistribution(where)
	dis2.showDistribution(where)
	if ($("input[name='covariation']")[0].checked) {
		var m1 = dis1.calculateAverage('#solver')
		var m2 = dis2.calculateAverage('#solver')
		dis1.calculateMx2('#solver')
		dis2.calculateMx2('#solver')
		var d1 = dis1.calculateDispAndDeviation('#solver')
		var d2 = dis2.calculateDispAndDeviation('#solver')
		var expectedValueXy = 0;
		var processOfCalculatingXY = []; 
		var k = 1;
		processOfCalculatingXY[0]= 'M('+dis1.name+dis2.name+')='+'&#92'+'sum_{i=1}^{'+dis1.values.length+'}'+'&#92'+'sum_{j=1}^{'+dis2.values.length+'}'+'('+dis1.name+'_i'+dis2.name+'_j'+'p_{ij})='
		processOfCalculatingXY[1]= '=';
			for (var i = 0;i<dis1.values.length;i++) {

			var help  = '';
			for (var j=0;j<dis2.values.length;j++) {
				help +=mult(dis2.values[j],arr[i][j]);
				expectedValueXy=addFracs(multFracs(dis1.values[i],dis2.values[j],arr[i][j]),expectedValueXy);
				if (j!=dis2.values.length-1) {
					help+='+';
				}
			}
			processOfCalculatingXY[k] +=mult(correctMinus(dis1.values[i]),'('+help)+')'
			if (i!=dis1.values.length-1) {
				processOfCalculatingXY[k] +='+'
			}

			if (i%2==1) {
				if (i==dis1.values.length-1) {
					if (typeof expectedValueXy =='number') {
						processOfCalculatingXY[k] +=')='+roundTo(expectedValueXy,5)
					} else {
						processOfCalculatingXY[k] +=')='+expectedValueXy
					}

				} else {
					k++;
					processOfCalculatingXY[k] = '+';
				}
			} else {
				if (i==dis1.values.length-1) {
					if (typeof expectedValueXy == 'number'){
						processOfCalculatingXY[k] +='='+roundTo(expectedValueXy,5)
					} else {
						processOfCalculatingXY[k] +=')='+expectedValueXy
					}
				} 
			}
		}
		for (var i = 0;i<processOfCalculatingXY.length;i++) {
			recordElement(processOfCalculatingXY[i],'#solver','div');
		}
		var kXY = substrationFraction(expectedValueXy,multFracs(m1,m2));
		recordElement('K_{xy}=M(XY)-M(X)M(Y)='+expectedValueXy+'-'+mult(m1,m2)+'='+kXY,where,'div');
	}
	if ($("input[name='corelation']")[0].checked) {
		var correl = divideFraction(kXY,multFracs(dis1.deviation(),dis2.deviation()));
		recordElement('r_{xy}='+divide('K_{xy}','&#92'+'sigma('+dis1.name+')'+'&#92'+'sigma('+dis2.name+')')+'='+divide(kXY,mult(dis1.deviation(),dis2.deviation()))+'='+correl,where,'div');
	}
	for (var i=0;i<dimX;i++) {
		countCallsForCondition();
		if ($("input[name=hor"+i+"]")[0].checked) {
			if (counterCallsForConditionDistribution==1){
				recordElement('P('+dis2.name+'='+dis2.name.toLowerCase()+'_i|'+dis1.name+'='+dis1.name.toLowerCase()+'_i)'+'='+divide('P('+dis2.name+'='+dis2.name.toLowerCase()+'_i,'+dis1.name+'='+dis1.name.toLowerCase()+'_i)','P('+dis1.name+'='+dis1.name.toLowerCase()+'_i)'),where,'div');
			}
			var arrProb = [];
			recordtext('Обчислимо імовірності за умови '+dis2.name+'|'+dis1.name+'='+dis1.values[i],where,'div')
			for (var j=0;j<dis2.values.length;j++) {	
				arrProb[j] =divideFraction(arr[i][j],dis1.probabilities[i]);
				recordElement('P('+dis2.name+'='+dis2.values[j]+'|'+dis1.name+'='+dis1.values[i]+')'+'='+divide('P('+dis2.name+'='+dis2.values[j]+','+dis1.name+'='+dis1.values[i]+')','P('+dis1.name+'='+dis1.values[i]+')')+'='+divide(arr[i][j],dis1.probabilities[i])+'='+arrProb[j],where,'div')
			}
			var conditionDistribution = new Distribution(dis2.values,arrProb,dis2.name+'_{'+dis1.values[i]+'}');
			conditionDistribution.showDistribution(where)
			if ($("input[name=hmx"+i+"]")[0].checked) {
				conditionDistribution.calculateAverage(where); 
			}
			if ($("input[name=hdx"+i+"]")[0].checked) {
				conditionDistribution.calculateMx2(where);
				conditionDistribution.calculateDispAndDeviation(where)
				
			}
		}
	}
	for (var i=0;i<dimY;i++) {
		countCallsForCondition();
		if ($("input[name=ver"+i+"]")[0].checked) {
			if (counterCallsForConditionDistribution==1){
				recordElement('P('+dis2.name+'='+dis2.name.toLowerCase()+'_i|'+dis1.name+'='+dis1.name.toLowerCase()+'_i)'+'='+divide('P('+dis2.name+'='+dis2.name.toLowerCase()+'_i,'+dis1.name+'='+dis1.name.toLowerCase()+'_i)','P('+dis1.name+'='+dis1.name.toLowerCase()+'_i)'),where,'div');
			}
			var arrProb = [];
			recordtext('Обчислимо імовірності за умови '+dis1.name+'|'+dis2.name+'='+dis2.values[i],where,'div')
			for (var j=0;j<dis1.values.length;j++) {	
				arrProb[j] =divideFraction(arr[j][i],dis2.probabilities[i]);
				recordElement('P('+dis1.name+'='+dis1.values[j]+'|'+dis2.name+'='+dis2.values[i]+')'+'='+divide('P('+dis1.name+'='+dis1.values[j]+','+dis2.name+'='+dis2.values[i]+')','P('+dis2.name+'='+dis2.values[i]+')')+'='+divide(arr[j][i],dis2.probabilities[i])+'='+arrProb[j],where,'div')
			}
			var conditionDistribution = new Distribution(dis1.values,arrProb,dis1.name+'_{'+dis2.values[i]+'}');
			conditionDistribution.showDistribution(where)
			if ($("input[name=vmx"+i+"]")[0].checked) {
				conditionDistribution.calculateAverage(where); 
			}
			if ($("input[name=vdx"+i+"]")[0].checked) {
				conditionDistribution.calculateMx2(where);
				conditionDistribution.calculateDispAndDeviation(where)
				
			}
		}
	}
}