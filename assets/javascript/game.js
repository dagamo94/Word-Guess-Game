/*   */

/*  */

var hangman = {
    wins: 0,
    losses: 0,
    currentWord: this.randWordChoice(),
    randWordChoice: function xx(){
        return this.wordOptions[Math.floor(Math.random() * this.wordOptions.length)];
    },
    wordOptions: ["minimal","hamster","dog","mountain","javascript","test","sleep","design","anthropomorphic","aesthetics","jquery"],
    guessesLeft: function(){
        return this.currentWord.length;
    },
    
}

console.log(hangman.randWordChoice());
console.log(hangman.guessesLeft());