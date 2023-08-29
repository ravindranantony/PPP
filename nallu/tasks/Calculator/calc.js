const input = document.getElementById("input");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const calculateButton = document.getElementById("calculate");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === "=") {
            try {
                input.value = eval(input.value);
            } catch (error) {
                input.value = "Error";
            }
        } else if (button.textContent === "C") {
            input.value = "";
        } else {
            input.value += button.textContent;
        }
    });
});
