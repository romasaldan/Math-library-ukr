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
		 console.log($('#listOfTasc'))
		 $('#listOfTasc').toggleClass('none');
	 }
 }
function processingData() {
	var arrVal = [];
	var arrFreq = [];
	var arrayOfIntervals = [];
	var dimension = $('input[name=dimension]').val();
	for (var i=0;i<(+dimension+1);i++) {
		arrVal[i] = $("input[name=value"+i+"]").val();
		if (i!=(+dimension)) {
			arrFreq[i] = $("input[name=freq"+i+"]").val();
		 }
		if (i!=0) { 
		var helpInt = new Interval(+arrVal[i-1],+arrVal[i])
			if(i!=((+dimension))) {
				helpInt.UpInclude = false;
			}
			arrayOfIntervals[i-1]=helpInt;
		}
	} 
	//console.log(arrayOfIntervals)
	var intervalDistribution = new StatistscDistributionInterval(arrayOfIntervals,arrFreq);
	var distribution= intervalDistribution.goToStatisticDistribution();
//	if ($('input[name=comparative]')[0].checked) {
		recordtext('Інтервальний розподіл матиме вигляд','#solvers','div');
		intervalDistribution.createTable('#solvers');
//	}
	if ($('input[name=moda]')[0].checked) {
		intervalDistribution.calculateModa('#solvers');
	}
	if ($('input[name=mediana]')[0].checked) {
		intervalDistribution.calculateMediana('#solvers');
	}
	if ($('input[name=histoFReq]')[0].checked) {
		intervalDistribution.histogrammaOfFrequency('#solvers');
	}
	if ($('input[name=histoRelativeFReq]')[0].checked) {
		intervalDistribution.histogrammaOfFrequencyRelative('#solvers');
	}
	var where = '#solvers'
	var compar = distribution.getComparativeDistribution(arrVal,arrFreq);
	if ($('input[name=statisticDistribution]')[0].checked) {
		recordtext('Запишемо статистичний розподіл, що складається з середин інтервалів',where,'p')
//		recordElement('p_i='+divide('n_i','n'),where,'div')
//		console.log(compar)
		distribution.showTable(where);
	}
	if ($('input[name=comparative]')[0].checked) {
		recordtext('Запишемо розподіл відносних частот використовуючи формулу',where,'p')
		recordElement('p_i='+divide('n_i','n'),where,'div')
		console.log(compar)
		compar.showTable(where);
	}
	if ($('input[name=numberChar]')[0].checked) {
		distribution.calculateAverage(where);
		distribution.calculateDispersion(where);
		distribution.calculateCorrectDispersion(where);
	}
	if ($('input[name=trustAverageKD]')[0].checked) {
		distribution.calculateTrustIntervalAverage(where,$('input[name=levelConfidence]').val(),$('input[name=deviation]').val());
	}	
	if ($('input[name=trustAverageUKD]')[0].checked) {
		calculateTrustIntervalForAverage(where,+($('input[name=levelConfidence]').val()),distribution.getAverage(),distribution.getCorrectDispersion(),distribution.dimension,false)  
	}
	if ($('input[name=trustDisp]')[0].checked) {
			trustIntervalForDispersion(where,+($('input[name=levelConfidence]').val()),distribution.dimension,distribution.getCorrectDispersion(),true);
		}
	if ($('input[name=empireFunction]')[0].checked) {
		recordtext('Запишемо емпіричну функцію розподілу',where,'p');
		distribution.recordEmpFun(where);
	}
	if ($('input[name=grafEmpireFunction]')[0].checked) {
		recordtext('Намалюємо емпіричну функцію розподілу',where,'p');
		var div = document.createElement('div');
		div.setAttribute('id','grafEmpireFunction');
		$(where).append(div);
		distribution.grafEmpireFunction(div);
	}
	if ($('input[name=grafPolygon]')[0].checked) {
		recordtext('Намалюємо полігон розподілу',where,'p');
		var div2 = document.createElement('div');
		div2.setAttribute('id','grafPolygon');
		$(where).append(div2);
		distribution.polygon(div2);
	}
//	if ($('input[name=toIntervalDistribution]')[0].checked)  {
//		recordtext('Запишемо інтервальний розподіл ',where,'p');
//		var int = $('input[name=numberInterval]').val();
//		var intDis = distribution.createIntervalDistribution(+int)
//		intDis.createTable(where);
//	}
	if ($('input[name=histogramma]')[0].checked)  {
		//recordtext('Намалюємо полігон розподілу',where,'p');
		var div3 = document.createElement('div');
		div3.setAttribute('id','histo');
		$(where).append(div3);		
		distribution.histogramma(div3);
	}
	if ($('input[name=grafRelativePolygon]')[0].checked) {
		recordtext('Намалюємо полігон відносних частот',where,'p');
		var div4 = document.createElement('div');
		div4.setAttribute('id','grafPolygonRelative');
		$(where).append(div4);
		compar.polygon(div4);
	}	
}




