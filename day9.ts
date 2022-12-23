export const day = 9;

type cord = {
  x: number;
  y: number;
};
type dist = {
  modification: cord;
  distance: number;
};

const input = await Deno.readTextFile("./input.txt");
const lines = input
  .split("\n")
  .map((item) =>
    item.split(" ").map((each, index) => (index == 1 ? parseInt(each) : each))
  );
console.log(lines);
const startingCord: cord = { x: 0, y: 0 };
let headCord: cord = startingCord;
let tailCord: cord = startingCord;
let placesVisited: cord[] = [startingCord];

function calcDistnceBetwen(head: cord, tail: cord): number {
  const xSide = Math.pow(head.x - tail.x, 2);
  const ySide = Math.pow(head.y - tail.y, 2);
  const dist = Math.sqrt(xSide + ySide);
  return dist;
}

function findShortestDist(head: cord, tail: cord) {
  const distances: dist[] = [];
  const modificationLocation: cord[] = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
  ];

  modificationLocation.forEach((mod) => {
    let _tailX = tail.x;
    let _tailY = tail.y;
    _tailX += mod.x;
    _tailY += mod.y;
    const dist = calcDistnceBetwen(head, { x: _tailX, y: _tailY });
    console.log("mod: ", mod, " dist: ", dist);
    distances.push({ modification: mod, distance: dist });
  });
  const smallestDist = Math.min(...distances.map((item) => item.distance));
  const index = distances.map((item) => item.distance).indexOf(smallestDist);
  return distances[index].modification;
}
// take each move and move the head then find the move for the tail. Keep track of unique locations
function moveTail() {
  lines.forEach((line) => {
    switch (line[0]) {
      case "R":
        break;
      case "L":
        break;
      case "U":
        break;
      case "D":
        break;
    }
  });
}

// console.log(calcDistnceBetwen({ x: 2, y: 0 }, startingCord));
console.log(findShortestDist({ x: 1, y: 1 }, startingCord));
