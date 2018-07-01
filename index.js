/* 
Author: Anele Sigenu
Date: 30 June 2018
Project: ALC 7dayCode Challenge*/

// Manipulating the DOM elements
let fromCurrency = document.getElementById('fromAmount')
let toCurrency = document.getElementById('toAmount')
let convertValue = document.getElementById('convertValue')
let toValue = document.getElementById('toValue')


//API KEYS
const ratesURL = "https://free.currencyconverterapi.com/api/v5/convert?q="
const currenciesURL = "https://free.currencyconverterapi.com/api/v5/currencies"

//Declaring calculation variables
let resultsFrom ;
let resultsTo;

//Get all the currencies
function getCurrencies(req) {
    $.get(req).then(response=>{
        let sortedResults = []
        let sortedObject = {}
        let results = response.results
        //Get currency Abbreviations and push them into an empty Array
        for (const key in results) {
            sortedResults.push(key)
           
        }
       //Sort an array of Abbreviated currencies 
        sortedResults.sort()

        sortedResults.forEach(currentKey => sortedObject[currentKey] = results[currentKey] )

        //Append sorted Currencies into drop down selection tags
            for (let index in sortedObject) {

                // Dynamically render currencies into select options tags
                if (index == "BTC") {
                    resultsFrom += `<option value="${index}" selected> ${sortedObject[index].currencyName}</option>`

                }else{
                    resultsFrom += `<option value="${index}"> ${sortedObject[index].currencyName}</option>`
 
                }
                
                if (index == "ZAR") {
                    resultsTo += `<option value="${index}" selected> ${sortedObject[index].currencyName}</option>`

                }else{
                    resultsTo += `<option value="${index}"> ${sortedObject[index].currencyName}</option>`

                }
            }
            fromCurrency.innerHTML = resultsFrom
            toCurrency.innerHTML = resultsTo   
            getValuePair(`${ratesURL}${fromCurrency.value}_${toCurrency.value}`);

    })
}

// Get exchange rates for currency Pairs
function getValuePair(req){
    $.get(req).then(response=>{
        let pairs = req.split("=")[1].split(",")[0]
        let rate = response.results[pairs].val
        let total = Number(rate) * Number(convertValue.value)
        console.log(rate)
        console.log(pairs)
        console.log(total)
        toValue.value = total.toFixed(2);
    })

}
//Adding event when the user types Amount to convertt
convertValue.addEventListener("input", ()=>{
    let currentVal = fromCurrency.value
    let toVal = toCurrency.value

    let currencyPair = `${currentVal}_${toVal}`
    getValuePair(`${ratesURL}${currencyPair}`)
})

//Adding on drop downs currency selection
fromCurrency.addEventListener("change", ()=>{
    let currentVal = fromCurrency.value
    let toVal = toCurrency.value
    let currencyPair = `${currentVal}_${toVal}`
    getValuePair(`${ratesURL}${currencyPair}`)

})
toCurrency.addEventListener("change", ()=>{
    let currentVal = fromCurrency.value
    let toVal = toCurrency.value
    let currencyPair = `${currentVal}_${toVal}`
    getValuePair(`${ratesURL}${currencyPair}`)

})

getCurrencies(currenciesURL)
