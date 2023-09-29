const display = document.getElementById('result');
const buttonsContainer = document.querySelector('.buttons');

const buttonsData = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  'C', '0', '=', '+'
];

buttonsData.forEach(data => {
  const button = document.createElement('button');
  button.textContent = data;
  button.className = 'button';
  buttonsContainer.appendChild(button);
  
  button.addEventListener('click', () => handleButtonClick(data));
});

let currentInput = '';

function handleButtonClick(value) {
  if (value === '=') {
    try {
      currentInput = eval(currentInput);
      display.value = currentInput;
    } catch (error) {
      display.value = 'Error';
    }
  } else if (value === 'C') {
    currentInput = '';
    display.value = '';
  } else {
    currentInput += value;
    display.value = currentInput;
  }
}