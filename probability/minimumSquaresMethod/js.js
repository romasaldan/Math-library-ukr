function createForm() {
    var n = getAnElement('#dimension').value;
    var whereX = getAnElement('#x')
    var whereY = getAnElement('#y')
    for(var i = 0;i<n;i++) {
        var newTDX = whereX.appendChild(document.createElement('td'))
        var newFormX = newTDX.appendChild(document.createElement('input'))
        newFormX.value = (i+1);
        newFormX.style.width = '50px'
        var newTDY = whereY.appendChild(document.createElement('td'))
        var newFormY= newTDY.appendChild(document.createElement('input'))
        newFormY.style.width = '50px'
        newFormY.value = (-i+3);
    }
}
//function showMult(Array,array2) {
//    var str = [];
//    var k = 0;
//    for (var i =0;i<Array.length;i++) {
//        if(i%8==7)  {
//            k++;
//            str[k] = '+'
//        }
//         str[k]+= mult(Array[i],array2[i])+'+'
//    }
//    return str;
//}
//function showSquare(Array) {
//    var str = [];
//    var k = 0;
//    for (var i =0;i<Array.length;i++) {
//        if(i%10==9)  {
//            k++
//            str[k] = '+'
//        }
//         str[k] += correctMinus(Array[i])+'^2'+'+'
//    }
//    return str;
//}
//function showSumming(Array) {
//    var str = [];
//    str[0] = '';
//    var k = 0;
//    for (var i =0;i<Array.length;i++) {
//        if(i%9==8)  {
//            k++;
//            str[k] = '+';
//        }
//         str[k] += correctMinus(Array[i])+'+'
//    }
//    return str;
//}
function calculaiting(where) {
    var arrayX = getElements('#x td input');
    var arrayY = getElements('#y td input');
    var calculX = [];
    var calculY = [];
    for ( var i =0;i<arrayX.length;i++) {
        calculX[i]=+arrayX[i].value;
        calculY[i]=+arrayY[i].value;
    }
    var sumX = 0;
    var sumX2 = 0;
    var sumY = 0;
    var sumY2 = 0;
    var sumXY = 0;
    var k = 0;
    for(var i = 0;i<arrayX.length;i++) {
        sumX +=(+calculX[i])
        sumX2 +=Math.pow((+calculX[i]),2)
        sumY +=(+calculY[i])
        sumY2 +=Math.pow((+calculY[i]),2)
        sumXY +=(+calculX[i])*(+calculY[i])
    }
    sumX = roundTo4(sumX)
    sumX2 = roundTo4(sumX2)
    sumXY = roundTo4(sumXY)
    sumY = roundTo4(sumY)
    sumY2 = roundTo4(sumY2)
    var arr  = [];
    arr[0] = '&#92'+'overline{'+'x'+'}='+'&#92'+'sum_{i=1}^{'+arrayX.length+'}x_i=';
    for (var i=0;i<arrayX.length;i++) {
        if (i==8) { k++; 
        arr[k]='+'          
      }
        arr[k]+=correctMinus(calculX[i])+'+'
    }
    arr[k] = arr[k].slice(0,arr[k].length-1) + '='+sumX
    for (var i = 0;i<=k;i++){
        recordElement(arr[i],'#solve','div')
    }
    arr = [];
    k=0;
    arr[0] = '&#92'+'overline{'+'y'+'}='+'&#92'+'sum_{i=1}^{'+arrayX.length+'}y_i=';
    for (var i=0;i<arrayX.length;i++) {
        if (i==8) { k++; 
        arr[k]='+'          
      }
        arr[k]+=correctMinus(calculY[i])+'+'
    }
    arr[k] = arr[k].slice(0,arr[k].length-1) + '='+sumY
    for (var i = 0;i<=k;i++){
        recordElement(arr[i],'#solve','div')
    } 
    arr = [];
    k=0;
    arr[0] = '&#92'+'overline{'+'x^2'+'}='+'&#92'+'sum_{i=1}^{'+arrayX.length+'}x^2_i=';
    for (var i=0;i<arrayX.length;i++) {
        if (i==7) { k++; 
        arr[k]='+'          
      }
        arr[k]+=correctMinus(calculX[i])+'^2+'
    }
    arr[k] = arr[k].slice(0,arr[k].length-1) + '='+sumX2
    for (var i = 0;i<=k;i++){
        recordElement(arr[i],'#solve','div')
    }    
    arr = [];
    k=0;
    arr[0] = '&#92'+'overline{'+'y^2'+'}='+'&#92'+'sum_{i=1}^{'+arrayY.length+'}y^2_i=';
    for (var i=0;i<arrayY.length;i++) {
        if (i==7) { k++; 
        arr[k]='+'          
      }
        arr[k]+=correctMinus(calculY[i])+'^2+'
    }
    arr[k] = arr[k].slice(0,arr[k].length-1) + '='+sumY2
    for (var i = 0;i<=k;i++){
        recordElement(arr[i],'#solve','div')
    }     
    arr = [];
    k=0;
    arr[0] = '&#92'+'overline{'+'xy'+'}='+'&#92'+'sum_{i=1}^{'+arrayY.length+'}y_ix_i=';
    for (var i=0;i<arrayY.length;i++) {
        if (i==6) { k++; 
        arr[k]='+'          
      }
        arr[k]+=correctMinus(calculX[i])+'&#92'+'cdot'+correctMinus(calculY[i])+'+'
    }
    arr[k] = arr[k].slice(0,arr[k].length-1) + '='+sumXY
    for (var i = 0;i<=k;i++){
        recordElement(arr[i],'#solve','div')
    }
        recordtext('знайдемо рівняння регресії виду y=kx+b','#solve','b')
    var equation1F = 'k'+'&#92'+'sum_{i=1}^{n}x_i^2'+'+b'+'&#92'+'sum_{i=1}^{n}x_i'+'='+'&#92'+'sum_{i=1}^{n}x_iy_i'
    var equation2F = 'b'+'&#92'+'sum_{i=1}^{n}x_i'+'+bn'+'='+'&#92'+'sum_{i=1}^{n}y_i'

    recordElement(writeSystemEquation(equation1F,equation2F),'#solve','div')
    var eq1 = mult('k',sumX2)+'+'+mult('b',correctMinus(sumX))+'='+sumXY;
    var eq2 = mult('k',sumX)+'+'+mult('b',arrayX.length)+'='+sumY;
    recordElement(writeSystemEquation(eq1,eq2),'#solve','p')
    recordtext("знайдемо розв'язки методом Крамера",'#solve','p')
    var d = roundTo4(sumX2*arrayX.length-sumX*sumX);
    var d1 = roundTo4(sumXY*arrayX.length-sumX*sumY);
    var d2 = roundTo4(sumX2*sumY-sumXY*sumX);
    recordElement('&#92'+'Delta '+'='+determinant2(sumX2,sumX,sumX,arrayX.length)+d,'#solve','div')
    recordElement('&#92'+'Delta '+'_1'+'='+determinant2(sumXY,sumX,sumY,arrayX.length)+d1,'#solve','div')
    recordElement('&#92'+'Delta '+'_2'+'='+determinant2(sumX2,sumXY,sumX,sumY)+d2,'#solve','div')
    recordElement('k='+divide('&#92'+'Delta '+'_1','&#92'+'Delta ')+'='+divide(d1,d)+'='+roundTo4(d1/d),'#solve','p')
    recordElement('b='+divide('&#92'+'Delta '+'_2','&#92'+'Delta ')+'='+divide(d2,d)+'='+roundTo4(d2/d),'#solve','p')
    recordtext('рівняння регресії У на Х набуде вигляду:','#solve','p');
    recordElement('y='+mult(roundTo4(d1/d),'x')+'+'+roundTo4(d2/d),'#solve','p')
    recordtext('знайдемо рівняння регресії виду x=ly+m','#solve','b')
    var equation1F = 'l'+'&#92'+'sum_{i=1}^{n}y_i^2'+'+m'+'&#92'+'sum_{i=1}^{n}y_i'+'='+'&#92'+'sum_{i=1}^{n}x_iy_i'
    var equation2F = 'l'+'&#92'+'sum_{i=1}^{n}y_i'+'+mn'+'='+'&#92'+'sum_{i=1}^{n}x_i'
    recordElement(writeSystemEquation(equation1F,equation2F),'#solve','div')
    var eq1 = mult('l',sumY2)+'+'+mult('m',correctMinus(sumY))+'='+sumXY;
    var eq2 = mult('l',sumY)+'+'+mult('m',arrayX.length)+'='+sumX;
    recordElement(writeSystemEquation(eq1,eq2),'#solve','p')
    recordtext("знайдемо розв'язки методом Крамера",'#solve','p')
    var d = roundTo4(sumY2*arrayX.length-sumY*sumY);
    var d1 = roundTo4(sumXY*arrayX.length-sumY*sumX);
    var d2 = roundTo4(sumY2*sumX-sumXY*sumY);
    recordElement('&#92'+'Delta '+'='+determinant2(sumY2,sumY,sumY,arrayX.length)+d,'#solve','div')
    recordElement('&#92'+'Delta '+'_1'+'='+determinant2(sumXY,sumX,sumY,arrayX.length)+d1,'#solve','div')
    recordElement('&#92'+'Delta '+'_2'+'='+determinant2(sumY2,sumXY,sumY,sumX)+d2,'#solve','div')
    recordElement('l='+divide('&#92'+'Delta '+'_1','&#92'+'Delta ')+'='+divide(d1,d)+'='+roundTo4(d1/d),'#solve','p')
    recordElement('m='+divide('&#92'+'Delta '+'_2','&#92'+'Delta ')+'='+divide(d2,d)+'='+roundTo4(d2/d),'#solve','p')
    recordtext('рівняння регресії X на Y набуде вигляду:','#solve','p');
    recordElement('x='+mult(roundTo4(d1/d),'y')+'+'+roundTo4(d2/d),'#solve','p')
}
         
         
         
         
         
         
         
         