const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let result = null;
let operator = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      clearDisplay();
    } else if (value === "=") {
      calculate();
    } else {
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});

function updateDisplay(value) {
  display.value = value;
}

function clearDisplay() {
  currentInput = "";
  updateDisplay("");
}

function calculate() {
  if (currentInput !== "") {
    try {
      result = eval(currentInput);
      updateDisplay(result);
      currentInput = result.toString();
    } catch (error) {
      updateDisplay("Error");
      currentInput = "";
    }
  }
}
const movingText = document.querySelector('.moving-text');

let position = 0;
let direction = 1;

function animateText() {
  position += direction;
  movingText.style.left = position + 'px';

  if (position >= window.innerWidth - movingText.clientWidth || position <= 0) {
    direction *= -1;
  }

  requestAnimationFrame(animateText);
}

animateText();





