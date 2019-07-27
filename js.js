function showTypeProblemProbability() {
    getAnElement('#matan').style.display='none';
    getAnElement('#geometry').style.display='none';
    getAnElement('#tfkz').style.display='none';
    getAnElement('#algebra').style.display='none';
    getAnElement('#probability').style.display='flex';   
}
function showTypeProblemGeometry() {
    getAnElement('#matan').style.display='none';
    getAnElement('#geometry').style.display='flex';
    getAnElement('#tfkz').style.display='none';
    getAnElement('#algebra').style.display='none';
    getAnElement('#probability').style.display='none';   
}
function showTypeProblemAlgebra() {
    getAnElement('#matan').style.display='none';
    getAnElement('#geometry').style.display='none';
    getAnElement('#tfkz').style.display='none';
    getAnElement('#algebra').style.display='flex';
    getAnElement('#probability').style.display='none';   
}
function showTypeProblemTfkz() {
    getAnElement('#matan').style.display='none';
    getAnElement('#geometry').style.display='none';
    getAnElement('#tfkz').style.display='flex';
    getAnElement('#algebra').style.display='none';
    getAnElement('#probability').style.display='none';   
}
function showTypeProblemMatan() {
    getAnElement('#matan').style.display='flex';
    getAnElement('#geometry').style.display='none';
    getAnElement('#tfkz').style.display='none';
    getAnElement('#algebra').style.display='none';
    getAnElement('#probability').style.display='none';   
}