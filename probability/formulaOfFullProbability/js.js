function createForm() {
    getAnElement('form[class="none"]').style.display = 'block';
    var dim =+getAnElement('#dimension').value;
    var parent1 = getAnElement("tr[attr='nameOfCondition']")
    var parent2 = getAnElement("tr[attr='probability']")
    var parent3 = getAnElement("tr[attr='conditionProbability']")
    var parent4 = getAnElement("tr[attr='descriptingEvent']")
    var parent5 = getAnElement("tr[attr='posteriorProbability']")
    for(var i=0;i<dim;i++) {
        var str = 'H'+'<sub>'+(i+1)+'</sub>';
        var td = document.createElement('td');
        td.innerHTML = str;
        parent1.appendChild(td);
        var td2 = document.createElement('td');
        var input = document.createElement('input');
        td2.appendChild(input);
        parent2.appendChild(td2); 
        var td3 = document.createElement('td');
        var input = document.createElement('input');
        td3.appendChild(input);
        parent3.appendChild(td3);      
        var td4 = document.createElement('td');
        var input = document.createElement('input');
        td4.appendChild(input);
        parent4.appendChild(td4);       
        var td5 = document.createElement('td');
        td5.style.textAlign = 'center';
        var input = document.createElement('input');
        input.setAttribute('type','checkbox')
        td5.appendChild(input);
        parent5.appendChild(td5);
    }
    getAnElement('#start').style.display = 'block'
}
var countfull = 0; 
function co () {
    return function () {
        countfull++;
    }
}
var count = co();
function fullProbability (pos) {
    count();
    var dim =+getAnElement('#dimension').value;    
    var box = getAnElement('#solve');
    var full = box.appendChild(document.createElement('div'))
    full.setAttribute('id','fullProbability'+countfull);
    if (countfull==1) {
        recordtext('Обчислимо ймовірність події А за формулою повної імовірності','#fullProbability'+countfull,'p');
        recordtext('A-'+getAnElement('#eventa').value,'#fullProbability'+countfull,'p');
        recordElement('P(A)='+'&#92'+'sum_{i=1}^'+dim+' '+'P(A|H_i)P(H_i)','#fullProbability'+countfull,'div'); 
    }
    var arrayComponents = getElements("tr[attr='probability'] td input")
    var arrayConditionalProbabilities = getElements("tr[attr='conditionProbability'] td input")
    var arrayDescriptions = getElements("tr[attr='descriptingEvent'] td input");
    if (countfull==1) {     
        for (var i=0;i<dim;i++) {
            recordtext('H<sub>'+(i+1)+'</sub> - '+arrayDescriptions[i].value,'#fullProbability'+countfull,'p')
        } 
    }
    var h = [];
    var ah = [];
    for (var i=0;i<dim;i++) {
        var k = arrayComponents[i].value.indexOf('/')
        var k2 = arrayConditionalProbabilities[i].value.indexOf('/')
        if (k==-1) {
            h[i] = +arrayComponents[i].value;
        } else {
            var num = arrayComponents[i].value.slice(0,k)
            var den = arrayComponents[i].value.slice(k+1)
            h[i]=new Fraction(num,den)  
        }        
        if (k2==-1) {
            ah[i] = +arrayConditionalProbabilities[i].value;
        } else { 
            var num = arrayConditionalProbabilities[i].value.slice(0,k2)
            var den = arrayConditionalProbabilities[i].value.slice(k2+1)
            ah[i]=new Fraction(num,den)
        }
    }
    var pA = 0;
    for (var i = 0;i<dim;i++){
        if(countfull==1) {
            recordElement('P(H_'+(i+1)+')='+divide(arrayComponents[i].value.slice(0,k),arrayComponents[i].value.slice(k+1))+'='+h[i],'#fullProbability'+countfull,'div')
            recordElement('P(A|H_'+(i+1)+')='+ah[i],'#fullProbability'+countfull,'div') 
        }
        if (((k!=-1)&&(k2!=-1))||((k==-1)&&(k2==-1))) {
            if (k==-1) {
                pA +=h[i]*ah[i]; 
                roundTo6(pA)
            } else {
                var help = multFraction(h[i],ah[i])
                pA = addFraction(pA,help) 

            }
        } else {
            if (k==-1) {
                pA+=ah[i].result(5)*h[i]
            } 
            if (k2==-1) {
                pA+=h[i].result(5)*ah[i]
            }
        }
    }
	if (typeof pA == 'number') {
		pA = roundTo(pA,4);
	}
    console.log(pA)
    if (countfull==1) {
        var pAStr = 'P(A)='
        for (var i=0;i<dim;i++) {    
            pAStr+=mult(h[i],ah[i])+'+'; 
        }
        pAStr=pAStr.slice(0,pAStr.length-1)+'='+pA;
        recordElement(pAStr,'#fullProbability'+countfull,'div')
    }
    function posterior (pA,pos){
        if (countfull==1){ 
            recordtext('За формулою Байєса','#fullProbability'+countfull,'p')
            recordElement('P(H_'+'i'+'|A)='+divide('P(A|H_{'+'i'+'})P(H_'+'i'+')','&#92'+'sum_{j=1}^'+dim+' '+'P(A|H_j)P(H_j)'),'#fullProbability'+countfull,'div');}
		recordElement('P(H_'+(pos+1)+'|A)='+divide(mult(h[pos],ah[pos]),pA)+'='+divideFraction(multFracs(h[pos],ah[pos]),pA),'#fullProbability'+countfull,'div');                                                                                                                            
    }
    if (typeof pos!='undefined') posterior(pA,pos)
}
function start() {
    var parent5 = getElements("tr[attr='posteriorProbability'] td input")
    var dim =+getAnElement('#dimension').value;
    var counterForProb = 0;
    for (var i=0;i<dim;i++){
        if (parent5[i].checked) {
            counterForProb++;
            fullProbability(i)
        } 
    }
    if (counterForProb == 0) {
        fullProbability()
    }
}