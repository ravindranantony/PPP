const display = document.getElementById('display');
const numBtns = document.querySelectorAll('.num-btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
const clearBtn = document.querySelector('.clear-btn');
const calculateBtn = document.querySelector('.calculate-btn');

let currentInput = '';
let currentOperator = '';
let previousInput = '';

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentInput += btn.textContent;
        display.value = currentInput;
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentOperator = btn.textContent;
        previousInput = currentInput;
        currentInput = '';
    });
});

calculateBtn.addEventListener('click', () => {
    if (currentInput !== '' && previousInput !== '') {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result;

        switch (currentOperator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
        }

        display.value = result;
        currentInput = result.toString();
        previousInput = '';
        currentOperator = '';
    }
});

clearBtn.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    currentOperator = '';
    display.value = '';
});
