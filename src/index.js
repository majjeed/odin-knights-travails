const BOARD_SIZE = 8;

const KNIGHT_MOVES = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

function isValid(x, y) {
  return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
}

function createKnightMovesGraph() {
  let graph = {};

  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      let position = `${x},${y}`;
      graph[position] = [];

      // check all possible moves from the current positon
      for (let [dx, dy] of KNIGHT_MOVES) {
        let newX = x + dx;
        let newY = y + dy;
        if (isValid(newX, newY)) {
          graph[position].push(`${newX},${newY}`);
        }
      }
    }
  }

  return graph;
}

function knightMoves(start, end) {
  const [startX, startY] = start;
  const [endX, endY] = end;
  const startPos = `${startX},${startY}`;
  const endPos = `${endX},${endY}`;

  if (startPos === endPos) {
    return [start];
  }

  const graph = createKnightMovesGraph();
  let queue = [[startPos]];
  let visited = new Set();
  visited.add(startPos);

  while (queue.length > 0) {
    let path = queue.shift();
    let node = path[path.length - 1];

    if (node === endPos) {
      //skip for now
      return path.map((pos) => pos.split(",").map(Number));
    }

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        let newPath = path.slice();
        newPath.push(neighbor);
        queue.push(newPath);
      }
    }
  }

  return null;
}

let shortestPath = knightMoves([0, 0], [7, 7]);
console.log(shortestPath);
