function greek(text) {
    return '&#92'+text;
}
var counter = 0;
function clojure() {
	return function () {
		counter++;
	}
}
var countOfCalling = clojure();
function createTable(){
	 countOfCalling();
	 $('#table').html('')
	 var table = document.createElement('table');
	 var roadOfValue = document.createElement('tr');
	 var roadOfFrequence = document.createElement('tr');
	 table.appendChild(roadOfValue);
	 table.setAttribute('border','2')
	 roadOfValue.setAttribute('id','roadOfValue');
	 roadOfFrequence.setAttribute('id','roadOfFrequence');
	 table.appendChild(roadOfFrequence);
	 roadOfValue.appendChild(document.createElement('th'))
	 roadOfValue.firstChild.innerHTML = 'x<sub>k</sub>';
	roadOfFrequence.appendChild(document.createElement('th'))
	 roadOfFrequence.firstChild.innerHTML = 'n<sub>k</sub>';
	 var dimension = document.querySelector('input[name=dimension]').value;
	 for (var i=1;i<(+dimension+2);i++) {
		 roadOfValue.appendChild(document.createElement('td'));
		 roadOfValue.lastChild.appendChild(document.createElement('input'));
		 roadOfValue.lastChild.lastChild.setAttribute('name','value'+(i-1));	
		 roadOfFrequence.appendChild(document.createElement('td'));
		 roadOfFrequence.lastChild.appendChild(document.createElement('input'));
		 roadOfFrequence.lastChild.lastChild.setAttribute('name','freq'+(i-1));	 
	 }
	 roadOfFrequence.lastChild.firstChild.setAttribute('disabled','disabled');
	 $('#table').append(table)
	
	 if (counter==1) {
		 $('#listOfTasc').toggleClass('none');
	 }
 }

function processingData() {
	var arrVal = [];
	var arrFreq = [];
	var arrayOfIntervals = [];
	var dimension = $('input[name=dimension]').val();
	var number = 0;
	for (var i=0;i<(+dimension+1);i++) {
		arrVal[i] = $("input[name=value"+i+"]").val();
		if (i!=(+dimension)) {
			arrFreq[i] = $("input[name=freq"+i+"]").val();
		 }
		if (i!=0) { 
		var helpInt = new Interval(+arrVal[i-1],+arrVal[i])
			if(i!=((+dimension))) {
				helpInt.upInclude = false;
			}
			arrayOfIntervals[i-1]=helpInt;
		}
	} 
	//console.log(arrayOfIntervals)
	var intervalDistribution = new StatistscDistributionInterval(arrayOfIntervals,arrFreq);
	//console.log(intervalDistribution)
	intervalDistribution.createTable('#solver')
	recordtext('Оскільки параметру розподілу невідомі, то обчислимо вибіркове середнє, та вибіркове середнє квадратичне відхилення','#solver','div');
	var statDis = intervalDistribution.goToStatisticDistribution();
	var ave =roundTo(statDis.getAverage(),3) 
	statDis.showTable('#solver');
	statDis.calculateAverage('#solver');
	statDis.calculateDispersion('#solver');
	var correctDisp = statDis.calculateCorrectDispersion('#solver');
	correctDisp = roundTo(correctDisp,3)
	recordtext('Обчислимо теоретичні частоти','#solver','div');
	var tFreq = [];
	//console.log(intervalDistribution)
	for (var i = 0;i<intervalDistribution.values.length;i++) {
		tFreq[i] = roundTo4(intLaplas(((intervalDistribution.values[i].upLimit)-ave)/Math.sqrt(correctDisp))-intLaplas(((intervalDistribution.values[i].downLimit)-ave)/Math.sqrt(correctDisp)))
		recordElement("P(x"+"&#92"+'in'+' '+intervalDistribution.values[i].showInterval()+")="+greek('Phi')+'('+divide(intervalDistribution.values[i].upLimit+'-'+correctMinus(ave),greek('sqrt')+'{'+correctDisp+'}')+')-'+greek('Phi')+'('+divide(intervalDistribution.values[i].downLimit+'-'+correctMinus(ave),greek('sqrt')+'{'+correctDisp+'}')+')=','#solver','div');
		recordElement('='+(intLaplas(((intervalDistribution.values[i].upLimit)-ave)/Math.sqrt(correctDisp)))+'-'+correctMinus(intLaplas(((intervalDistribution.values[i].downLimit)-ave)/Math.sqrt(correctDisp)))+'='+tFreq[i],'#solver','div')
	}
	recordtext("Якщо np<sub>i</sub>&lt;10  - рекомендується об'єднати сусідні проміжки для кращої точності",'#solver','div');
	recordtext("Враховуючи це, заповнимо наступну таблицю",'#solver','div');
	var arrValues  = [];
	var arrTheorFreq = [];
	var arrSelectiveFreq = [];
	var arrTheor = [];
	var k = 0;
	var accumulated = 0;
	var accumulatedTheor = 0;
	var accumulatedSelective = 0;
	var booleanForUnion = $('input[name=union]')[0].checked;
	if (booleanForUnion) {
		for(var i=0;i<intervalDistribution.values.length;i++) {
			arrValues[k] = combiningIntervals(arrValues[k],intervalDistribution.values[i]);
			accumulated+=statDis.dimension*tFreq[i];
			accumulatedTheor+=tFreq[i];
			accumulatedSelective+=statDis.frequency[i]
			if(accumulated>10) {				
				arrTheorFreq[k] = roundTo4(accumulated);
				arrTheor[k]= roundTo4(accumulatedTheor)
				arrSelectiveFreq[k] = roundTo4(accumulatedSelective);
				accumulated = 0;			
				accumulatedTheor=0;
				accumulatedSelective=0;
				k++;
				if ((i==intervalDistribution.values.length-1)) {
					break;
				}
			}
			if ((accumulated<10)&&(i==intervalDistribution.values.length-2)) {
				arrTheorFreq[k-1]+=accumulated+statDis.dimension*tFreq[i+1];
				arrTheor[k-1] +=accumulatedTheor+tFreq[i+1];
				arrValues[k-1] =  combiningIntervals(arrValues[k-1],intervalDistribution.values[i])
				arrValues[k-1] =  combiningIntervals(arrValues[k-1],intervalDistribution.values[i+1])
				arrSelectiveFreq[k-1] +=accumulatedSelective+statDis.frequency[i+1]; 
				 arrValues.splice(k,1)
				break;
			}
			if ((accumulated<10)&&(i==intervalDistribution.values.length-1)) {
				arrTheorFreq[k-1]+=accumulated;
				arrTheor[k-1] +=accumulatedTheor;
				arrSelectiveFreq[k-1] +=accumulatedSelective;
				arrValues[k-1] =  combiningIntervals(arrValues[k-1],intervalDistribution.values[i])
				arrValues.splice(k,1)
			}
		}
	} else {
		for(var i=0;i<intervalDistribution.values.length;i++) {
			arrValues[i] = intervalDistribution.values[i];
			arrTheor[i] = tFreq[i];
			arrTheorFreq[i] = statDis.dimension*tFreq[i];
			arrSelectiveFreq[i] = statDis.frequency[i]
		}
	}
	var twoDim = [];
	for (var i=0;i<=arrValues.length;i++) {
		twoDim[i] =[];
	}
	var arrStat = [];
	twoDim[0][0] = 'інтервали &#92 величини';
	twoDim[0][1] = createFormula('p^*_i');
	twoDim[0][2] = createFormula('np^*_i');
	twoDim[0][3] = createFormula('n_i');
	twoDim[0][4] = createFormula(divide('('+'n_i-np^*_i'+')^2','np^*_i'));
	for (var i=1;i<=arrValues.length;i++) {
		twoDim[i][0] = arrValues[i-1].showInterval();
		twoDim[i][1] = roundTo4(arrTheor[i-1]);
		twoDim[i][2] = roundTo4(arrTheorFreq[i-1]);
		twoDim[i][3] = arrSelectiveFreq[i-1];
		arrStat[i-1] = roundTo4((arrSelectiveFreq[i-1] - arrTheorFreq[i-1])*(arrSelectiveFreq[i-1] - arrTheorFreq[i-1])/(arrTheorFreq[i-1]));
		twoDim[i][4] = arrStat[i-1];
	}
	
	createAndShowTable(twoDim,'#solver',false)
	recordtext("Обчислимо критичне значення ",'#solver','div');
	var str = '=';
	var q2 = 0;
	for (var i=0;i<arrStat.length;i++) {
		str += arrStat[i];
		q2 +=arrStat[i];
		if (i!=arrStat.length-1) {
			str+='+';
		}
	}
	var levelConfidence = +($('input[name=levelConfidence]').val())
	str+='='+roundTo4(q2);
	recordElement('Q^2 = '+greek('sum')+'_{i=1}^{'+(arrValues.length)+'}'+divide('('+'n_i-np^*_i'+')^2','np^*_i')+str,'#solver','div')
	recordtext("Знайдемо критичну область ",'#solver','div');
	recordtext("Критичним значенням буде квантиль розподілу хі-квадрат з k-m-1 степенями свободи. k - кількість проміжків, m-кількість парметрів розподілу",'#solver','div');
	var q_lim = chisqrdistr(arrValues.length-3,levelConfidence);
	recordElement('Q_{lim}='+greek('chi')+'^2_{(k-m-1),'+greek('gamma')+'}='+greek('chi')+'^2_{'+arrValues.length+'-'+'2-1'+','+levelConfidence+'}='+q_lim,'#solver','div');
	if(q2>q_lim) {
		recordtext("Оскільки Q<sub>lim</sub>&lt;Q<sup>2</sup> то відхиляємо гіпотезу про нормальний розподіл вибірки",'#solver','div');
	} else {
		recordtext("Оскільки Q<sub>lim</sub>&gt;Q<sup>2</sup> то приймаємо гіпотезу про нормальний розподіл вибірки",'#solver','div');
	}
	intervalDistribution.histogrammaOfFrequencyRelative('#solver')
}
//var arrHuj = ['хуй1','хуй2','хуй3','хуй4']
//arrHuj.splice(3,1)
//console.log(arrHuj)