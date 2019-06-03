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
var tempCurrentWord = "";

function resetVariables() {
    keysPressed = [];
    currentWord = randWordChoice();
    tempCurrentWord = currentWord;
    guesses = guessesLeft();
    lettersInCurrWordCount = 0;
    $("#guesses-left-text").text(guesses);
    $("#current-word-text").text(initialWriteToHTML("current-word-text",currentWord));
    $("#guessed-text").text("");
}

function letterStillAvailable() {
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord.length > tempCurrentWord) {
            return true;
        } else {
            return false;
        }
    }


}

function guessesLeft() { //depends on the word's length, guesses left equals current word's length plus 5
    return currentWord.length + 5;
}

function guessesLeftPercentage() { //depends on the word's length, guesses left equals current word's length plus 50% of its length
    return Math.floor(currentWord.length * 1.5);
}

function randWordChoice() {
    return this.wordOptions[Math.floor(Math.random() * this.wordOptions.length)];
}

function initialWriteToHTML(replace, newText) {          //will add the right number of dashes to visually indicate the legth of the word to be guessed to the user
    var text = newText;
    $("#" + replace).html("");                    //clears out previously stored value in the element of parameter replace
    for (var i = 0; i < newText.length; i++) {
        text = $("<span>");

        // newText.addClass("cust-" + newText[i]);
        text.attr("data-letter", text[i]);
        text.text("_ ");

        $("#" + replace).append(text);
    }
}

// document.onkeyup = function (event) {
//     userInput = event.key;

//     if (validInputs.includes(userInput)) {
//         if (currentWord.includes(userInput) && guesses > 1 && letterStillAvailable(userInput) === true) {
//             keysPressed.push(userInput);
//             lettersInCurrWordCount++;

//             //letterStillAvailable();

//             if (lettersInCurrWordCount === currentWord.length) {
//                 wins++;
//                 resetVariables();
//             }

//             //print the userinput to the right spot of the current word display in HTML
//         } else if (!currentWord.includes(userInput) && guesses > 1) {
//             guesses--;
//         } else {
//             alert("you lost");
//         }
//     } else {
//         alert("Please press a valid key (a value from a-z)");
//     }

//     console.log("Random word choice working test: " + randWordChoice());
//     console.log("Current word: " + currentWord);
//     console.log("Current word's length: " + currentWord.length);
//     console.log("Guesses left: " + guessesLeft());
//     console.log("Guesses left by percentage: " + guessesLeftPercentage());

// }


document.onkeyup = function (event) { //only meant to temporariy test my functions
    var userInput = event.key;

    if (firstPress === false) {
        firstPress = true;
        initialWriteToHTML("current-word-text", currentWord);

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

    } else if (validInputs.includes(userInput) && guesses > 1 && currentWord.includes(userInput) && lettersInCurrWordCount < currentWord.length) {

        //code that compares guesses to individual letters in 'currentWord' and determines if you won
        lettersInCurrWordCount++;

        

        //code that displays the correctly guessed letter underneath "current /" in HTML site


        $("#guessed-text").append(userInput + ", ");
        console.log($("#guessed-text"));

    } else if (validInputs.includes(userInput) && guesses > 1 && keysPressed.includes(userInput)) {
        alert("You have already used that letter and it's not part of the word");
    } else if(validInputs.includes(userInput)){
        losses++;
        resetVariables();
    }else {
        alert("Please press a key from a-z");
    }


    console.log("Random word choice working test: " + randWordChoice());
    console.log("Current word: " + currentWord);
    console.log("Temp word: " + tempCurrentWord);
    console.log("Current word's length: " + currentWord.length);
    console.log("Number of right guesses: " + lettersInCurrWordCount);
    console.log("Guesses left: " + guesses);
    console.log("Guesses left by percentage: " + guessesLeftPercentage());
    console.log("Guesses thus far: " + keysPressed);
    // for (var i = 0; i < currentWord.length; i++) {
    //     console.log("CUrrent word broken into individual letters: " + currentWord[i]);

    // }

    console.log("\n");
}