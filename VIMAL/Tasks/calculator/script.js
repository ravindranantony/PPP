const result = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');
const equalsButton = document.getElementById('equals');

let currentCalculation = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent === '=') {
      try {
        const calculatedResult = eval(currentCalculation);
        result.value = calculatedResult;
        currentCalculation = calculatedResult.toString();
      } catch (error) {
        result.value = 'Error';
      }
    } else if (button.textContent === 'C') {
      result.value = '';
      currentCalculation = '';
    } else {
      currentCalculation += button.textContent;
      result.value = currentCalculation;
    }
  });
});
