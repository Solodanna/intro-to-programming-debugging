// DOM references
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
// Collection of all message elements used to show/hide status text
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");

// Game state
let targetNumber; // the number the player is trying to guess
let attempts = 0; // how many guesses the player has made so far
const maxNumberOfAttempts = 5; // allowed guesses per game

// Returns a random number from min (inclusive) to max (exclusive)

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element

  const guess = parseInt(guessInput.value, 10);

  // Ignore invalid input
  if (Number.isNaN(guess)) return;

  // Enforce bounds 1..99 (README stretch goal)
  if (guess < 1 || guess > 99) return;

  // Count this as an attempt
  attempts += 1;

  hideAllMessages();

  const remainingAttempts = maxNumberOfAttempts - attempts;

  // Always display the guessed number and how many guesses remain
  numberOfGuessesMessage.style.display = "";
  const guessWord = remainingAttempts === 1 ? "guess" : "guesses";
  numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${Math.max(
    0,
    remainingAttempts
  )} ${guessWord} remaining`;

  if (guess === targetNumber) {
    correctMessage.style.display = "";
    submitButton.disabled = true;
    guessInput.disabled = true;
  } else if (guess < targetNumber) {
    tooLowMessage.style.display = "";
  } else {
    tooHighMessage.style.display = "";
  }

  // If used all attempts and didn't guess correctly, show max-guesses message and disable
  if (attempts >= maxNumberOfAttempts && guess !== targetNumber) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> 0 guesses remaining`;
  }

  guessInput.value = "";
  resetButton.style.display = "";
}

// Hide all message elements.
// // !!! #5 BUG: using <= . Correect condition: < messages.length.
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = "none";
  }
}

// Initialize or reset the game state
// !!! #6 BUG: typos (funtion -> function)
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);
  // Reset number of attempts and enable input
  attempts = 0;
  submitButton.disabled = false;
  guessInput.disabled = false;

  // Hide messages and the reset button at the start
  hideAllMessages();
  resetButton.style.display = "none";
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
