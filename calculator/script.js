const digits = document.querySelectorAll('.digit')
const operation = document.querySelectorAll('.operation')
const display = document.getElementById('display')
const controls = document.querySelectorAll('.control')
const equal = document.querySelector('.equal')

let currentNumber = ''
let currentOperation = ''
let res = 0

digits.forEach(item => item.addEventListener('click', e => {
    currentNumber += e.target.value
    display.value = currentNumber
}))

operation.forEach(item => item.addEventListener('click', e => {
    switch (e.target.value) {
        case '+':
            currentOperation = '+'
            res += parseFloat(currentNumber)
            break
        case '-':
            currentOperation = '-'
            if (res === 0) {
                res = parseFloat(currentNumber)
            } else {
                res -= parseFloat(currentNumber)
            }
            break
        case '*':
            currentOperation = '*'
            if (res === 0) {
                res = parseFloat(currentNumber)
            } else {
                res *= parseFloat(currentNumber)
            }
            break
        default:
            console.log('что то пошло не так')
    }
    currentNumber = ''
    display.value = res
}))

equal.addEventListener('click', e => {
    switch (currentOperation) {
        case '+':
            res += parseFloat(currentNumber)
            break
        case '-':
            res -= parseFloat(currentNumber)
            break
        case '*':
            res *= parseFloat(currentNumber)
            break
        default:
            console.log('что то пошло не так')
    }
    currentNumber = '0'
    display.value = res
})

controls.forEach(item => item.addEventListener('click', e => {
    if (e.target.value === 'ac') {
        currentNumber = ''
        currentOperation = ''
        res = 0
        display.value = '0'
    } else if (e.target.value === 'sq') {
        res = Math.pow(parseFloat(display.value), 2)
        display.value = res
        currentNumber = ''
    }
}))
