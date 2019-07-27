function processingData() {
    var data = getAnElement('form input[type=text]').value
    console.log(data)
    var arrayElements = data.split(' ')
    console.log(arrayElements)
}
