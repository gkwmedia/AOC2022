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
// const startingCord: cord = { x: 0, y: 0 };
let headCord: cord = { x: 0, y: 0 };
let tailCord: cord = { x: 0, y: 0 };
let placesVisited: cord[] = [{ x: 0, y: 0 }];

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
    // console.log("mod: ", mod, " dist: ", dist);
    distances.push({ modification: mod, distance: dist });
  });
  const smallestDist = Math.min(...distances.map((item) => item.distance));
  const index = distances.map((item) => item.distance).indexOf(smallestDist);
  return distances[index].modification;
}
// TODO: create function to take in tail cord and see if it needs to add to unique array. Will check against all x and y cords
function addToArray(tail: cord) {
  //   const exisits = placesVisited.some(
  //     (item) => item.x == tail.x && item.y == tail.y
  //   );
  const exisits = placesVisited.some((item) => {
    // console.log("test: ", item);
    // console.log("tail: ", tail);
    return item.x == tail.x && item.y == tail.y;
  });

  //   console.log("tail: ", tail, "value: ", exisits);
  if (!exisits) {
    // console.log("here");
    placesVisited.push({ x: tail.x, y: tail.y });
  }
}
// take each move and move the head then find the move for the tail. Keep track of unique locations
function moveTail() {
  lines.forEach((line) => {
    switch (line[0]) {
      case "R":
        for (let move = 1; move <= line[1]; move++) {
          headCord.x += 1;
          const distBetween = calcDistnceBetwen(headCord, tailCord);
          //   console.log(
          //     "move: ",
          //     move,
          //     "head: ",
          //     headCord,
          //     "tail: ",
          //     tailCord,
          //     "dist: ",
          //     distBetween
          //   );
          if (distBetween >= 2) {
            let modMove = findShortestDist(headCord, tailCord);
            tailCord.x += modMove.x;
            tailCord.y += modMove.y;
          }
          //   console.log(tailCord);
          addToArray(tailCord);
        }

        break;
      case "L":
        for (let move = 1; move <= line[1]; move++) {
          headCord.x -= 1;
          const distBetween = calcDistnceBetwen(headCord, tailCord);
          //   console.log(
          //     "move: ",
          //     move,
          //     "head: ",
          //     headCord,
          //     "tail: ",
          //     tailCord,
          //     "dist: ",
          //     distBetween
          //   );
          if (distBetween >= 2) {
            let modMove = findShortestDist(headCord, tailCord);
            tailCord.x += modMove.x;
            tailCord.y += modMove.y;
          }
          //   console.log(tailCord);
          addToArray(tailCord);
        }
        break;
      case "U":
        for (let move = 1; move <= line[1]; move++) {
          headCord.y += 1;
          const distBetween = calcDistnceBetwen(headCord, tailCord);
          //   console.log(
          //     "move: ",
          //     move,
          //     "head: ",
          //     headCord,
          //     "tail: ",
          //     tailCord,
          //     "dist: ",
          //     distBetween
          //   );
          if (distBetween >= 2) {
            let modMove = findShortestDist(headCord, tailCord);
            tailCord.x += modMove.x;
            tailCord.y += modMove.y;
          }
          //   console.log(tailCord);
          addToArray(tailCord);
        }
        break;
      case "D":
        for (let move = 1; move <= line[1]; move++) {
          headCord.y -= 1;
          const distBetween = calcDistnceBetwen(headCord, tailCord);
          //   console.log(
          //     "move: ",
          //     move,
          //     "head: ",
          //     headCord,
          //     "tail: ",
          //     tailCord,
          //     "dist: ",
          //     distBetween
          //   );
          if (distBetween >= 2) {
            let modMove = findShortestDist(headCord, tailCord);
            tailCord.x += modMove.x;
            tailCord.y += modMove.y;
          }
          //   console.log(tailCord);
          addToArray(tailCord);
        }
        break;
    }
  });
}

moveTail();

// console.log(calcDistnceBetwen({ x: 2, y: 0 }, startingCord));
// console.log(findShortestDist({ x: 1, y: 1 }, startingCord));
console.log(headCord, tailCord);
console.log(placesVisited);
console.log("answer: ", placesVisited.length);
