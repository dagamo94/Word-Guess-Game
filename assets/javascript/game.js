/* HANGMAN */

var wins = 0;
var losses = 0;
var firstPress = false;
var showLetter = false;

var keysPressed = [];
var validInputs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var wordOptions = ["minimal", "hamster", "dog", "mountain", "javascript", "test", "sleep", "design", "anthropomorphic", "aesthetics", "jquery"];

var currentWord = randWordChoice();
var guesses = guessesLeft();
var lettersInCurrWordCount = 0;
var rightLettertracker = [];
var letterTrackerFull = false;
var tempCurrentWord = "";

function resetVariables() {
    keysPressed = [];
    currentWord = randWordChoice();
    tempCurrentWord = currentWord;
    guesses = guessesLeft();
    lettersInCurrWordCount = 0;
    rightLettertracker = [];
    letterTrackerFull = false;
    $("#guesses-left-text").text(guesses);
    $("#current-word-text").text(initialWriteToHTML("current-word-text", currentWord));
    $("#guessed-text").text("");
}

function guessesLeft() { //depends on the word's length, guesses left equals current word's length plus 5
    return currentWord.length + 3;
}

function guessesLeftPercentage() { //depends on the word's length, guesses left equals current word's length plus 50% of its length
    return Math.floor(currentWord.length * 1.5);
}

function randWordChoice() {
    return this.wordOptions[Math.floor(Math.random() * this.wordOptions.length)];
}

function initialWriteToHTML(replace, newText) {          //will add the right number of dashes to visually indicate the legth of the word to be guessed to the user
    var letter = newText;
    $("#" + replace).html("");                    //clears out previously stored value in the element of parameter replace
    for (var i = 0; i < newText.length; i++) {
        letter = $("<span>");
        var htmlDataValue = letter[i];
        // newText.addClass("cust-" + newText[i]);
        letter.attr("data-letter", htmlDataValue);
        letter.text("_ ");

        $("#" + replace).append(letter);
    }
}


document.onkeyup = function (event) { //only meant to temporariy test my functions
    var userInput = event.key;

    if (firstPress === false) {
        firstPress = true;
        initialWriteToHTML("current-word-text", currentWord);

        //var letter = currentWord;
        // $("#current-word-text").html("");                    //clears out previously stored value in the element of parameter replace
        // for (var i = 0; i < currentWord.length; i++) {
        //     letter = $("<span>");
        //     var htmlDataValue = letter[i];
        //     // newText.addClass("cust-" + newText[i]);
        //     letter.attr("data-letter", htmlDataValue);
        //     letter.text("_ ");

        //     $("#current-word-text").append(letter);
        // }

        tempCurrentWord = currentWord;

        $("#guesses-left-text").text(guesses);
        $("#any-key-start").text("may the force be with you");
        $("#wins-text").text(wins);
        // $("#guessed-text").text("you may start guessing letters");
        // console.log($("#guessed-text"));

    } else if (validInputs.includes(userInput) && guesses > 1 && !currentWord.includes(userInput) && !keysPressed.includes(userInput)) {
        guesses--;

        keysPressed.push(userInput);

        $("#guessed-text").append(userInput + ", ");
        console.log($("#guessed-text"));

        $("#guesses-left-text").text(guesses);

    } else if (validInputs.includes(userInput) && guesses > 1 && currentWord.includes(userInput)) {
        keysPressed.push(userInput);

        //code that compares guesses to individual letters in 'currentWord' and determines if you won
        if (!letterTrackerFull) {

            for (var i = 0; i < currentWord.length; i++) {
                rightLettertracker.push(currentWord[i]);

                console.log("Split word: " + rightLettertracker);
            }
            letterTrackerFull = true;
        }

        if (rightLettertracker.includes(userInput)) {
            lettersInCurrWordCount++;
            for (var i = 0; i < rightLettertracker.length; i++) {
                if (rightLettertracker[i] === userInput) {
                    rightLettertracker.splice(i, 1);
                    i--;

                }
            }
        }
        $("#guessed-text").append(userInput + ", ");
        console.log("rightlettertracker length with removals: " + rightLettertracker.length);

        if (rightLettertracker.length === 0) {
            wins++;

            $("#wins-text").text(wins);

            $("#guessed-text").append(userInput + ", ");
            alert("you won!");
            resetVariables();
        }
        //code that displays the correctly guessed letter underneath "current /" in HTML site


        console.log($("#guessed-text"));

    } else if (validInputs.includes(userInput) && guesses > 1 && keysPressed.indexOf(userInput) < 0) {
        alert("You have already used that letter and it's not part of the word");

    } else if (validInputs.includes(userInput) && guesses === 1) {
        losses++;
        resetVariables();

    } else {
        alert("You have already used that letter and it's not part of the word or press a valid key from a-z");
    }


    // console.log("Random word choice working test: " + randWordChoice());
    console.log("Current word: " + currentWord);
    // console.log("Temp word: " + tempCurrentWord);
    console.log("Current word's length: " + currentWord.length);
    console.log("Number of right guesses: " + lettersInCurrWordCount);
    console.log("Guesses left: " + guesses);
    // console.log("Guesses left by percentage: " + guessesLeftPercentage());
    console.log("Guesses thus far: " + keysPressed);
    // for (var i = 0; i < currentWord.length; i++) {
    //     console.log("CUrrent word broken into individual letters: " + currentWord[i]);

    // }

    console.log("\n");
}