//types: dimension - number,probability - number or fraction, typeOfDistribution - text; 
function createLimitedGeomDistribution (dimension,probability,typeOfDistribution,where) {
	var arrValues = [];
	var arrProbabilities = [];
	for (var i=0;i<+dimension;i++) {	 
		if (typeOfDistribution == '1') {
			arrValues[i] = i+1;
		} else {
			arrValues[i] = i;
		}
		if (i!=(dimension-1)) {
			if (typeof (probability) == 'number') {
				arrProbabilities[i]=roundTo(Math.pow(1-probability,i)*probability,6)
			} else {
				var q = substrationFraction(1,probability)
				arrProbabilities[i] = multFracs(q.power(i),probability);
			}

			recordElement('P(X='+(i+1)+')='+'q^{'+i+'}p=('+substrationFraction(1,probability)+')^{'+(i)+'}'+cdot+probability+'='+arrProbabilities[i],where,'div');
		} else {
			if (typeof probability == 'number') {
				arrProbabilities[i]=roundTo(roundTo(Math.pow(1-probability,i)*probability,6)+roundTo(Math.pow(1-probability,i+1),6),6)
			} else {
				var q = substrationFraction(1,probability)
				arrProbabilities[i] = addFracs(multFracs(q.power(i),probability),q.power(i+1));
			}
			recordElement('P(X='+(i+1)+')='+'q^{'+i+'}p+'+'q^{'+dimension+'}=('+substrationFraction(1,probability)+')^{'+(i)+'}'+cdot+probability+'+('+probability+')^{'+dimension+'}='+arrProbabilities[i],where,'div');
		}			
	}
	return new Distribution(arrValues,arrProbabilities);
}



function processData() {
	var dimension = +($('input[name=dimension]')[0].value);
	var probability = ($('input[name=probability]')[0].value);
	var p = +(probability);
	var typeOfDistribution =$('select[name=typeOfDistribution]')[0].value;
	var nameOfDistribution = $('input[name=nameOfDistribution]')[0].value;
	recordtext('Запишемо розподіл X<sub>k</sub>, де X - кількість'+nameOfDistribution,'#solvers','div')
	var distribution = createLimitedGeomDistribution(+dimension,p,typeOfDistribution,'#solvers');
	
	if($('input[name=discrete]')[0].checked) {
		recordtext('Таблиця дискретного розподілу','#solvers','div');
		distribution.showDistribution('#solvers')
	}
	if($('input[name=numberChar]')[0].checked) {
		recordtext('Обчислимо математичне сподівання','#solvers','div');
		distribution.calculateAverage('#solvers')
		distribution.calculateMx2('#solvers');
		recordtext('Обчислимо дисперсію і середнє квадратичне відхилення','#solvers','div');
		distribution.calculateDispAndDeviation('#solvers');
	}
	if($('input[name=probInterval]')[0].checked) {
		var leftLimit = $('input[name=leftLimit]')[0].value;
		var leftInclude = $('select[name=leftInclude]')[0].value;
		var rightLimit = $('input[name=rightLimit]')[0].value;
		var rightInclude = $('select[name=rightInclude]')[0].value;
		var interval = new Interval(leftLimit,rightLimit)
		if (leftInclude == '(') {
			interval.downInclude = false;
		}
		if (rightInclude == ')') {
			interval.upInclude = false;
		}
		recordtext('Знайдемо імовірність потрапляння у проміжок '+leftInclude+leftLimit+';'+rightLimit+rightInclude,'#solvers','div');
		distribution.probabilityFromTo(interval,'#solvers');

	}
	
	if ($('input[name=empireFunction]')[0].checked) {
		recordtext('Запишемо функцію розподілу','#solvers','p');
		distribution.rerordFunctionOfDistribution('#solvers');
	}
	if ($('input[name=grafEmpireFunction]')[0].checked) {
		recordtext('Намалюємо графік функції розподілу','#solvers','p');
		var div =document.createElement('div');
		$('#solvers')[0].appendChild(div)
		div.setAttribute('id','graf');
		distribution.grafFunctionDistribution('graf');
	}
	if ($('input[name=grafPolygon]')[0].checked) {
		recordtext('Намалюємо полігон розподілу','#solvers','p');
		var div =document.createElement('div');
		$('#solvers')[0].appendChild(div)
		div.setAttribute('id','polygon');
		distribution.polygon('polygon');
	}
	
	
}