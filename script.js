// You will create a simple guessing game. Using window methods, you will give and receive information from the user in order to direct them toward the correct answer in a limited number of guesses.

const tilesContainer = document.querySelector(".tiles");
//colors for tiles
const colors = [
  'aqua',
  'aquamarine',
  'crimson',
  'blue',
  'dodgerblue',
  'gold',
  'greenyellow',
  'teal',
];

const colorsPickList = [...colors, ...colors];
const tileCount = colorsPickList.length;
const maxTries = 10; //Setting a limit of 10 tries

// Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;
let tries = 0; // track the number of attempts

//Ask the user for their name and greet them

let playerName = window.prompt("Welcome to the memory game! What's your name?");
if(!playerName){
  playerName = 'Player'; //default if no name is provided
}
window.alert(`Hello, ${playerName}! You have 10 tries to win. Good luck!`);
