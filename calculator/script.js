const digits = document.querySelectorAll('[data-digit]')
const operations = document.querySelectorAll('[data-operation]')
const display = document.getElementById('display')
const controls = document.querySelectorAll('[data-control]')
const equal = document.querySelector('[data-equal]')

let prevNum = ''
let newNum = 0
let result = ''
let operatorType = ''
let decimalUsed = false

digits.forEach(item => item.addEventListener('click', e => {
    const num = e.target.dataset.digit
    if (result) {
        newNum = num
        result = ''
    } else {
        if (num === '.') {
            if (!decimalUsed) {
                newNum += num
                decimalUsed = true
            }
        } else {
            newNum += num
        }
    }
    display.value = parseFloat(newNum)
}))

operations.forEach(item => item.addEventListener('click', e => {
    const operator = e.target.dataset.operation
    !result ? prevNum = newNum : prevNum = result
    newNum = ''
    decimalUsed = false
    operatorType = operator
    result = 0
}))

equal.addEventListener('click', () => {
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

    result = Math.round(result*1000000)/1000000;
    prevNum = result
    display.value = result
})

controls.forEach(item => item.addEventListener('click', e => {
    switch (e.target.dataset.control) {
        case 'ac':
            prevNum = ''
            newNum = 0
            result = ''
            operatorType = ''
            decimalUsed = false
            display.value = '0'
            break
        case 'del':
            if (!result) {
                newNum = newNum.slice(0, newNum.length - 1)
                newNum === '' ? newNum = '0' : display.value = parseFloat(newNum)
            }
            break
        case 'root':
            result = Math.sqrt(result || prevNum ||  newNum)
            display.value = result
            break
        case 'minus':
            newNum = -newNum
            display.value = newNum
    }
}))