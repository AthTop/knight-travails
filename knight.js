// Takes in the starting position of a knight and the desired end position on a 8x8 chess grid
function knightMoves(start, end) {
  if (!Array.isArray(start) || !Array.isArray(end))
    throw new Error("Start/End must be in [x, y] format.");
  let queue = [start]; // Initialize a queue with the starting position in it
  let moves = 0;
  const visited = new Set();
  visited.add(start.toString());
  let found = false;
  let path = [];
  // Create a pathmap object to track positions and their parent positions
  let pathMap = {};
  pathMap[start.toString()] = null;
  while (queue.length > 0 && !found) {
    // Set current iteration size
    const levelLength = queue.length;
    // Loop through current queue of moves
    for (let i = 0; i < levelLength; i++) {
      // Grab position
      let position = queue.shift();
      // Check if it's our destination
      if (position.toString() === end.toString()) {
        found = true;
        break;
      }
      // Get the valid moves from position
      let validMovesList = validMoves(position);
      // Loop through them and check if they've been visited before
      validMovesList.forEach((move) => {
        if (!visited.has(move.toString())) {
          visited.add(move.toString());
          queue.push(move);
          pathMap[move.toString()] = position;
        }
      });
    }
    // if end isn't found, we add to moves since we start a new loop from a new position
    if (!found) moves++;
  }

  // Track down the path
  let step = end.toString();
  while (step) {
    path.push(step);
    step = pathMap[step] ? pathMap[step].toString() : null;
  }
  // Reverse path for print order
  path.reverse();

  return printResult(moves, path);
}

function printResult(moves, visited) {
  let result = `You made it in ${moves} moves. Here's your path: \n`;
  visited.forEach((move) => {
    result += `[${move}]\n`;
  });
  return result;
}

// Function to return list of valid moves
function validMoves(position) {
  let knightMoves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];
  let validMoves = [];
  // Use predefined array of possible moves and iterating the array to check if x,y in bounds
  knightMoves.forEach((move) => {
    let [x, y] = position;
    let [xMove, yMove] = move;
    let newX = x + xMove;
    let newY = y + yMove;
    // Check if out of bounds and push to valid moves array
    if (isValidMove(newX, newY)) {
      validMoves.push([newX, newY]);
    }
  });
  return validMoves;
}
// Return if new move is within bounds
function isValidMove(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

console.log(knightMoves([3, 3], [4, 3]));

console.log(knightMoves([0,1], [6, 7]));