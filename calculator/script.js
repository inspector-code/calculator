const digits = document.querySelectorAll('.digit')
const operations = document.querySelectorAll('.operation')
const display = document.getElementById('display')
const controls = document.querySelectorAll('.control')
const equal = document.querySelector('.equal')

let prevNum = ''
let newNum = ''
let result = ''
let operatorType = ''
let decimalUsed = false

digits.forEach(item => item.addEventListener('click', e => {
    const num = e.target.value
    if (result) {
        newNum = num
        result = ''
    } else {
        if (num === '.') {
            if (decimalUsed !== true) {
                newNum += num
                decimalUsed = true
            }
        } else {
            newNum += num
        }
    }
    display.value = newNum
}))

operations.forEach(item => item.addEventListener('click', e => {
    let operator = e.target.value
    if (!result) {
        prevNum = newNum
    } else {
        prevNum = result
    }
    newNum = ''
    decimalUsed = false
    operatorType = operator
    result = ''
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
        default:
            result = newNum
    }

    prevNum = result
    display.value = result
})

controls.forEach(item => item.addEventListener('click', () => {
    switch (item.value) {
        case 'ac':
            prevNum = ''
            newNum = ''
            result = ''
            operatorType = ''
            decimalUsed = false
            display.value = '0'
            break
        case 'del':
            if (!result) {
                newNum = newNum.slice(0, newNum.length - 1)
                display.value = newNum
            }
            break
    }
}))