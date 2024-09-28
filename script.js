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

//Ask the user for confirmation to start the game

let isReady = window.confirm("Are you ready to play?");
if(!isReady) {
  window.alert("Come back when you're ready!");
}

//Function to build individual tiles
function buildTile(color){
const element = document.createElement('div');

element.classList.add("tile");
element.setAttribute("data-color", color);
element.setAttribute("data-revealed", false);

element.addEventListener("click", () => {
  const revealed = element.getAttribute("data-revealed");

  if(
    awaitingEndOfMove || 
    revealed === 'true' ||
    element === activeTile ||
    tries >= maxTries
  ){
    return;
  }
  // Reveal this color

  element.style.backgroundColor = color;

  if(!activeTile) {
    activeTile = element;
    return;
  }

  const colorToMatch = activeTile.getAttribute('data-color');

  if(colorToMatch === color) {
    element.setAttribute('data-revealed', 'true');
    activeTile.setAttribute('data-revealed', 'true');

    activeTile  = null;
    awaitingEndOfMove = false;
    revealedCount += 2;

    if(revealedCount === tileCount) {
      window.alert(
        `Congratulations, ${playerName}! You've won! Refresh the page to play again.`
      );
    }
    return;
  }

  // Increment the number of tries
  tries++;
  window.alert(`Incorrect match! You have ${maxTries - tries} tries left.`);
  awaitingEndOfMove = true;

  setTimeout(() => {
    activeTile.style.backgroundColor = null;
    element.style.backgroundColor = null;

    awaitingEndOfMove = false;
    activeTile = null;
  }, 1000); // delaying 1 second
  
// check if the user has ran out of tries 
if(tries >= maxTries) {
  window.alert(
    `Game over, ${playerName}! You've used all 10 tries. Refresh the page to try again.`
  );
}
});


return element;

}

// Build up tiles

for(let i = 0; i < tileCount; i++){
  const randomIndex = Math.floor(Math.random() * colorsPickList.length);
  const color = colorsPickList[randomIndex];
  const tile = buildTile(color);

  colorsPickList.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}

