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
	 for (var i=1;i<(+dimension+1);i++) {
		 roadOfValue.appendChild(document.createElement('td'));
		 var input1 = document.createElement('input')
		 input1.setAttribute('class','smallForm');
		 var input2 = document.createElement('input')
		 input2.setAttribute('class','smallForm');
		 roadOfValue.lastChild.appendChild(input1);
		 roadOfValue.lastChild.lastChild.setAttribute('name','value'+(i-1));	
		 roadOfFrequence.appendChild(document.createElement('td'));
		 roadOfFrequence.lastChild.appendChild(input2);
		 roadOfFrequence.lastChild.lastChild.setAttribute('name','freq'+(i-1));	 
	 }
	 $('#table').append(table)
	 if (counter==1) {
		 $('#listOfTasc').toggleClass('none');
	 }
 }
function findUnknownParametr(array,where) {
 	var accumulated = 0;
 	var sumOfCoefs = 0;
 	for (var i = 0; i < array.length; i++) {
 		if (isNaN(+array[i])) {
 			if (array[i]=='p') {
 				sumOfCoefs+=1;
				continue;
 			}
 			sumOfCoefs += parseFloat(array[i])
 		} else {
 			accumulated+= (+array[i])
 		}
 	}
 	recordtext('Знайдемо невідомий парметр р',where,'div')
 	recordtext('Сума всіх імовірностей повинна бути рівна 1',where,'div')
 	var helpStr = ''
 	for (var i = 0; i < array.length; i++) {
 		helpStr+=array[i];
 		if (i!=array.length-1) {
 			helpStr+='+'
 		} else {
 			helpStr+='=1'
 		}
 	}
 	recordElement(helpStr,where,'div');
 	if (accumulated==0) {
 		helpStr = sumOfCoefs+'p=1';
 		recordElement(helpStr,where,'div');
 		var p = new Fraction(1,sumOfCoefs);
 		helpStr = 'p='+divide('1',sumOfCoefs)+'='+p
 		recordElement(helpStr,where,'div');
 	} else {
 		helpStr = sumOfCoefs+'p=1-'+sumOfCoefs
 		recordElement(helpStr,where,'div');
 		var p = (1- accumulated)/sumOfCoefs;
		p = roundTo(p,4)
		helpStr = 'p='+divide('1-'+accumulated,sumOfCoefs)+'='+roundTo(p,4)
 		recordElement(helpStr,where,'div');
 	}
	for (var i =0;i<array.length;i++) {
		if (typeof array[i]=='number') {
			if (isNaN(+array[i])) {
				if(array[i]=='p') {
					array[i]=p;
					continue
				} 
				array[i] = roundTo(parseFloat(array[i])*p,5);
			} else {
				array[i] = +array[i]
			}
		} else {
			if (array[i]=='p') {
				array[i] = p;
			} else {
				array[i] = multFracs(parseFloat(array[i]),p);
			}
		}
	}
 	return array;
} 

function start()  {
	var arrVal = [];
	var arrFreq = [];
	var dimension = $('input[name=dimension]').val();
	for (var i=0;i<(+dimension);i++) {
		if (typeof arrFreq == 'number') {
			arrVal[i] = +($("input[name=value"+i+"]").val());
			arrFreq[i] = +($("input[name=freq"+i+"]").val());
		} else {
			arrVal[i] = +($("input[name=value"+i+"]").val());
			arrFreq[i] = ($("input[name=freq"+i+"]").val());
		}
	}
	if($('input[name=unknownParametr]')[0].checked) {
		arrFreq = findUnknownParametr(arrFreq,'#solvers')
	}
	var distribution = new Distribution(arrVal,arrFreq);
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