document.addEventListener("DOMContentLoaded", function () {
  const result = document.getElementById("result");
  const buttons = document.querySelectorAll(".num, .operator");
  const equalButton = document.querySelector(".equal");
  const clearButton = document.querySelector(".clear");

  buttons.forEach(button => {
      button.addEventListener("click", () => {
          result.value += button.value;
      });
  });

  equalButton.addEventListener("click", () => {
      try {
          result.value = eval(result.value);
      } catch (error) {
          result.value = "Error";
      }
  });

  clearButton.addEventListener("click", () => {
      result.value = "";
  });
});