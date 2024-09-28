
// const tilesContainer = document.querySelector(".tiles");
// const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];
// const colorsPicklist = [...colors, ...colors];
// const tileCount = colorsPicklist.length;

// // Game state
// let revealedCount = 0;
// let activeTile = null;
// let awaitingEndOfMove = false;

// function buildTile(color) {
// 	const element = document.createElement("div");

// 	element.classList.add("tile");
// 	element.setAttribute("data-color", color);
// 	element.setAttribute("data-revealed", "false");

// 	element.addEventListener("click", () => {
// 		const revealed = element.getAttribute("data-revealed");

// 		if (
// 			awaitingEndOfMove
// 			|| revealed === "true"
// 			|| element == activeTile
// 		) {
// 			return;
// 		}

// 		// Reveal this color
// 		element.style.backgroundColor = color;

// 		if (!activeTile) {
// 			activeTile = element;

// 			return;
// 		}

// 		const colorToMatch = activeTile.getAttribute("data-color");

// 		if (colorToMatch === color) {
// 			element.setAttribute("data-revealed", "true");
// 			activeTile.setAttribute("data-revealed", "true");

// 			activeTile = null;
// 			awaitingEndOfMove = false;
// 			revealedCount += 2;

// 			if (revealedCount === tileCount) {
// 				alert("You win! Refresh to start again.");
// 			}

// 			return;
// 		}

// 		awaitingEndOfMove = true;

// 		setTimeout(() => {
// 			activeTile.style.backgroundColor = null;
// 			element.style.backgroundColor = null;

// 			awaitingEndOfMove = false;
// 			activeTile = null;
// 		}, 1000);
// 	});

// 	return element;
// }

// // Build up tiles
// for (let i = 0; i < tileCount; i++) {
// 	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
// 	const color = colorsPicklist[randomIndex];
// 	const tile = buildTile(color);

// 	colorsPicklist.splice(randomIndex, 1);
// 	tilesContainer.appendChild(tile);
// }


const tilesContainer = document.querySelector(".tiles");
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;
const maxTries = 10;  // Set a limit of 10 tries

// Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;
let tries = 0; // Track the number of attempts

// Ask the user for their name and greet them
let playerName = window.prompt("Welcome to the memory game! What's your name?");
if (!playerName) {
  playerName = "Player"; // Default if no name is provided
}
window.alert(`Hello, ${playerName}! You have 10 tries to win. Good luck!`);

// Ask the user for confirmation to start the game
let isReady = window.confirm("Are you ready to play?");
if (!isReady) {
  window.alert("Come back when you're ready!");
  // Optionally, you can return or stop the script execution here if needed
}

// Function to build individual tiles
function buildTile(color) {
  const element = document.createElement("div");

  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    if (
      awaitingEndOfMove ||
      revealed === "true" ||
      element === activeTile ||
      tries >= maxTries
    ) {
      return;
    }

    // Reveal this color
    element.style.backgroundColor = color;

    if (!activeTile) {
      activeTile = element;
      return;
    }

    const colorToMatch = activeTile.getAttribute("data-color");

    if (colorToMatch === color) {
      element.setAttribute("data-revealed", "true");
      activeTile.setAttribute("data-revealed", "true");

      activeTile = null;
      awaitingEndOfMove = false;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        window.alert(`Congratulations, ${playerName}! You've won! Refresh the page to play again.`);
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
    }, 1000);

    // Check if the user has run out of tries
    if (tries >= maxTries) {
      window.alert(`Game over, ${playerName}! You've used all 10 tries. Refresh the page to try again.`);
    }
  });

  return element;
}

// Build up tiles
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
  const color = colorsPicklist[randomIndex];
  const tile = buildTile(color);

  colorsPicklist.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}




 
 

