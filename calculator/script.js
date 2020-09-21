const digit = document.querySelectorAll('.digit')
const operation = document.querySelectorAll('.operation')
const display = document.getElementById('display')
const equal = document.querySelector('.equal')

let currentNumber = ''
let nextNumber = ''

digit.forEach(item => item.addEventListener('click', (e) => {
    currentNumber += e.target.value
    display.value = currentNumber
}))

equal.addEventListener('click', (e) => {
    display.value = eval(currentNumber)
    currentNumber = ''
})
