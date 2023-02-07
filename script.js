const numbers = document.querySelectorAll('.numeric-key')
const operations = document.querySelectorAll('.operation')
const clear = document.querySelector('#c-key')
const clearAll = document.querySelector('#ce-key')
const resultKey = document.querySelector('#result-key')
const display = document.querySelector('#result')
const calculatorHistory = document.querySelector('.previous-operation')

let previousResult = ''
let a = null
let b = null
let currentOperator = ''
let previousOperator = ''

let tempB = null
let isResult = false

window.addEventListener('keydown', (evt) =>{
    let operationsArray = ['+', '-', '÷', '×']
    let keyboardEquivalent = ['+', '-', '/', '*']

    if(isFinite(evt.key))
        displayNumber(evt.key)
    
    if(evt.key === '.')
        displayDot()

    if(keyboardEquivalent.includes(evt.key)){
        let equivalentOperator = operationsArray[keyboardEquivalent.indexOf(evt.key)]

        onOperatorClick(equivalentOperator)
    }

    if(evt.key === 'Enter' || evt.key === '=')
        printResult()

    if(evt.key === 'Backspace')
        clearLastNum()

    if(evt.key === 'Delete')
        clearAllEntries()
})

numbers.forEach(number =>{
    number.addEventListener('click', () =>{
        if(!isNaN(number.textContent))
            displayNumber(number.textContent)

        if(number.textContent === '+/-')
            togglePlusMinus()

        if(number.textContent === '.')
            displayDot()
    })
})

operations.forEach(operator =>{
    operator.addEventListener('click', () =>{
        onOperatorClick(operator.textContent)
    })
})

clear.addEventListener('click', () =>{
   clearLastNum()
})

clearAll.addEventListener('click', () =>{
    clearAllEntries()
})

resultKey.addEventListener('click', () =>{
    printResult()
})

function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '×':
            return multiply(a, b)
        case '÷':
            if(b != 0)
                return divide(a, b)
            else
                return 'Inválido!'
        case '%':
            if(b != 0)
                return remainder(a, b)
            else
                return 'Inválido!'
    }
}

function add(a, b){
    return roundNum(Number(a) + Number(b), 5)
}

function subtract(a, b){
    return roundNum(Number(a) - Number(b), 5)
}

function multiply(a, b){
    return roundNum(Number(a) * Number(b), 5)
}

function divide(a, b){
    if(b != 0){
        return roundNum(Number(a)/Number(b), 5)
    }else{
        return 'Não é possível dividir por 0'
    }
}

function remainder(a, b){
    return Number(a) % Number(b)
}

function roundNum(num, n){
    let decimals = Math.pow(10, n)

    return Math.round((num + Number.EPSILON) * decimals)/decimals
}

function clearLastNum(){
    display.textContent = display.textContent.slice(0, display.textContent.length-1)
}

function clearAllEntries(){
    previousResult = ''
    a = null
    b = null
    currentOperator = ''
    previousOperator = ''

    display.textContent = ''
    calculatorHistory.textContent = ''
}

function printResult(){
    if(!b){
        b = display.textContent
    }

    display.textContent = operate(currentOperator, previousResult, b)
    calculatorHistory.textContent = ''
    previousResult = display.textContent

    isResult = true
}

function displayNumber(number){
    if(isResult){
        clearAllEntries()
        isResult = false
    }

    display.textContent += number
}

function onOperatorClick(operator){
    previousOperator = currentOperator
    currentOperator = operator

    if(isResult){
        a = display.textContent
        b = null
        isResult = false
    }else{

        if(!a && !b){
            a = display.textContent
        }else if(a && !b){
            b = display.textContent
            a = operate(previousOperator, a, b)
            b = null
        }else{
            a = operate(currentOperator, a, b)
            b = null
        }

    }

    previousResult = a

    display.textContent = ''
    calculatorHistory.textContent = previousResult + ' '
}

function displayDot(){
    if(isResult){
        clearAllEntries()
        isResult = false
    }

    if(!display.textContent.includes('.'))
        display.textContent += '.'
}

function togglePlusMinus(){
    if(isResult){
        clearAllEntries()
        isResult = false
    }

    if(display.textContent.startsWith('-')){
        display.textContent = display.textContent.slice(1, display.textContent.length)
    }else{
            display.textContent = '-' + display.textContent
    }

}
