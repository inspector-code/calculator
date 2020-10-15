const digits = document.querySelectorAll('[data-digit]')
const operations = document.querySelectorAll('[data-operation]')
const display = document.getElementById('display')
const controls = document.querySelectorAll('[data-control]')
const equal = document.querySelector('[data-equal]')
const homeButton = document.querySelector('.home1')
const calculator = document.querySelector('.calculator')

let prevNum = ''
let newNum = '0'
let result = ''
let operatorType = ''
let decimalUsed = false

const calcResult = () => {
    decimalUsed = false
    prevNum = parseFloat(prevNum)
    newNum = parseFloat(newNum)

    switch (operatorType) {
        case '+':
            result = prevNum + newNum
            break
        case '-':
            result = prevNum - newNum
            break
        case '*':
            result = prevNum * newNum
            break
        case '/':
            result = prevNum / newNum
            break
        case 'pow':
            result = Math.pow(prevNum, newNum)
            break
        default:
            result = newNum
    }

    result = Math.round(result * 1000000) / 1000000;
    prevNum = result
    display.value = result
}

const reset = () => {
    prevNum = ''
    newNum = '0'
    result = ''
    operatorType = ''
    decimalUsed = false
}

digits.forEach(item => item.addEventListener('click', e => {
    const num = e.target.dataset.digit
    if (result) {
        newNum = num
        result = ''
        operatorType = ''
    } else {
        if (num === '.') {
            if (!decimalUsed) {
                newNum += num
                decimalUsed = true
            }
        } else {
            if (decimalUsed) {
                newNum += num
            } else {
                newNum = String(parseFloat(newNum += num))
            }
        }
    }
    display.value = newNum
}))

equal.addEventListener('click', () => calcResult())

operations.forEach(item => item.addEventListener('click', e => {
    const operator = e.target.dataset.operation
    !result && prevNum && newNum && calcResult()
    !result ? prevNum = newNum : prevNum = result
    newNum = ''
    decimalUsed = false
    operatorType = operator
    result = 0
}))

controls.forEach(item => item.addEventListener('click', e => {
    switch (e.target.dataset.control) {
        case 'ac':
            reset()
            display.value = '0'
            break
        case 'del':
            if (!result) {
                newNum = newNum.slice(0, newNum.length - 1)
                if (!newNum.length) {
                    newNum = '0'
                    display.value = '0'
                } else {
                    display.value = newNum
                }
            }
            break
        case 'root':
            if (+result < 0 || +prevNum < 0 || +newNum < 0) {
                reset()
                display.value = 'Oops, number < 0 :('
            } else {
                result = Math.sqrt(result || prevNum ||  newNum)
                display.value = result
            }
            break
        case 'minus':
            if (newNum && !result) {
                newNum = -newNum
                display.value = newNum
            } else {
                result = -result
                display.value = result
            }
    }
}))

homeButton.addEventListener('click', () => {
    !calculator.style.top
        ? calculator.style.top = '434px'
        : calculator.style.top = ''
})