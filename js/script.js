"use strict";

// Elements
const score0Element = document.querySelector("#score--0"),
  score1Element = document.querySelector("#score--1"),
  current0Element = document.querySelector("#current--0"),
  current1Element = document.querySelector("#current--1"),
  diceElement = document.querySelector(".dice"),
  // Buttons
  btnNewGame = document.querySelector(".btn--new"),
  btnRoll = document.querySelector(".btn--roll"),
  btnHold = document.querySelector(".btn--hold"),
  btnReference = document.querySelector(".reference"),
  btnReferenceClose = document.querySelector(".reference-close"),
  // Players
  player0Element = document.querySelector(".player--0"),
  player1Element = document.querySelector(".player--1");

// Current elements
let currentScore = 0;
let currentPlayer = 0;
let isPlaying = true;

const totalScores = [0, 0];

// change current player
function changeCurrentPlayer() {
  // Reset current score
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;

  // Change player
  currentPlayer = currentPlayer === 0 ? 1 : 0;

  // Change player class
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
}

// Roll the dice
btnRoll.addEventListener("click", () => {
  if (isPlaying) {
    // 1 - Generate a random num
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2 - Output a random number on dice
    diceElement.src = `img/dice${diceNumber}.png`;
    diceElement.classList.remove("hidden");

    // 3 - If the number is 1, switch to the next player, or not 1 - add number to current score this player
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      changeCurrentPlayer();
    }
  }
});

// Save current score in total score
btnHold.addEventListener("click", () => {
  if (isPlaying) {
    // 1 - Add current scort to active player total score
    totalScores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      totalScores[currentPlayer];

    // 2 - If total score of active player >= 100  active player win, if not  switch current player
    if (totalScores[currentPlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove("player--active");
      document.querySelector(`#current--${currentPlayer}`).textContent = 0;
    } else {
      changeCurrentPlayer();
    }
  }
});

// New game
btnNewGame.addEventListener("click", () => {
  // 1 - Reset values
  totalScores[0] = 0;
  totalScores[1] = 0;

  currentScore = 0;
  currentPlayer = 0;
  isPlaying = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  // 2 - Remove classes
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");

  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--active");

  diceElement.classList.add("hidden");
});

// Reference modal window
function modalWindowCloseOpen() {
  document.querySelector(".reference-info").classList.toggle("hidden");
  document.querySelector(".overlay").classList.toggle("hidden");
}
btnReference.addEventListener("click", modalWindowCloseOpen);
btnReferenceClose.addEventListener("click", modalWindowCloseOpen);
document
  .querySelector(".overlay")
  .addEventListener("click", modalWindowCloseOpen);
