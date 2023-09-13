let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//winning pattern arrary
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
//player X plays first
let xTurn = true;
let count = 0;

//disable all buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};

//enable all buttons(for new game and restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
};
//this function executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389 <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

//function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};
//New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//restart btn
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
/*
//this function excutes when player wins the game
const winFunction = (letter) => {
  disableButtons();
};*/

//win logic
const winChecker = () => {
  //Loop through all win patterns

  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];

    console.log("Elements in winChecker:", element1, element2, element3);
    //check if elements are filled
    //if 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //if all 3 button have same value then pass the value to win
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      ///display Y
      element.innerText = "O";
      element.disabled = true;
    }

    //Increment count on each click
    count += 1;
    if (count === 9) {
      drawFunction();
    }

    //check for win on every click
    winChecker();
  });
});

//enable and disable popup on page load
window.onload = enableButtons;
