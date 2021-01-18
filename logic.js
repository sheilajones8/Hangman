// Global Variables==================================================================================

// arrays and variables for holding data
var wordOptions = ["jessica", "nikkole", "mike", "willy", "robert", "mark"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

// keeping score
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// Functions (reusable blocks of code that will be called upon when needed)==========================
function startGame() {
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  lettersInWord = selectedWord.split("");
  numBlanks = lettersInWord.length;

  // reset
  guessesLeft = 9;
  blanksAndSuccesses = [];
  wrongLetters = [];

  // populate blanks and successes with number of blanks
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  // change html to reflect game round conditions
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(
    "  "
  );
  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("winCounter").innerHTML = winCount;
  document.getElementById("lossCounter").innerHTML = lossCount;

  console.log(selectedWord);
  console.log(lettersInWord);
  console.log(numBlanks);
  console.log(blanksAndSuccesses);
}

// this function is to compare the input letters to the actual words listed
function checkLetters(letter) {
  // check if letter exists at all

  var isLetterInWord = false;

  for (var i = 0; i < numBlanks; i++) {
    if (selectedWord[i] == letter) {
      isLetterInWord = true;
    }
  }

  // check where in word the letter exists and populate blanksandsuccesses array
  if (isLetterInWord) {
    for (var i = 0; i < numBlanks; i++) {
      if (selectedWord[i] == letter) {
        blanksAndSuccesses[i] = letter;
      }
    }
  }
  // letter was not found
  else {
    wrongLetters.push(letter);
    guessesLeft--;
  }

  console.log(blanksAndSuccesses);
}

function roundComplete() {
  console.log(
    "Win Count: " +
      winCount +
      " | Loss Count: " +
      lossCount +
      " | Guesses Left: " +
      guessesLeft
  );

  // update the html to reflect the most recent count
  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

  // check if user won
  if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
    winCount++;
    alert("You Won!!");

    // update the win counter in html
    document.getElementById("winCounter").innerHTML = winCount;
    startGame();
  }

  // check if user lost
  else if (guessesLeft == 0) {
    lossCount++;
    alert("You Lost!!");

    document.getElementById("lossCounter").innerHTML = lossCount;
    startGame();
  }
}

// MAIN PROCESS======================================================================================

// initiate the code for the first time
startGame();

// register keyclicks
document.onkeyup = function (event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

  checkLetters(letterGuessed);
  roundComplete();

  console.log(letterGuessed);
};
