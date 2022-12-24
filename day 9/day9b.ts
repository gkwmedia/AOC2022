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
let cord0: cord = { x: 0, y: 0 };
let cord1: cord = { x: 0, y: 0 };
let cord2: cord = { x: 0, y: 0 };
let cord3: cord = { x: 0, y: 0 };
let cord4: cord = { x: 0, y: 0 };
let cord5: cord = { x: 0, y: 0 };
let cord6: cord = { x: 0, y: 0 };
let cord7: cord = { x: 0, y: 0 };
let cord8: cord = { x: 0, y: 0 };
let cord9: cord = { x: 0, y: 0 };
const cords = [
  cord0,
  cord1,
  cord2,
  cord3,
  cord4,
  cord5,
  cord6,
  cord7,
  cord8,
  cord9,
];
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
          cord0.x += 1;
          for (let i = 0; i < 9; i++) {
            const distBetween = calcDistnceBetwen(cords[i], cords[i + 1]);
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
              let modMove = findShortestDist(cords[i], cords[i + 1]);
              cords[i + 1].x += modMove.x;
              cords[i + 1].y += modMove.y;
            }
            //   console.log(tailCord);
            addToArray(cord9);
          }
        }

        break;
      case "L":
        for (let move = 1; move <= line[1]; move++) {
          cord0.x -= 1;
          for (let i = 0; i < 9; i++) {
            const distBetween = calcDistnceBetwen(cords[i], cords[i + 1]);
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
              let modMove = findShortestDist(cords[i], cords[i + 1]);
              cords[i + 1].x += modMove.x;
              cords[i + 1].y += modMove.y;
            }
            //   console.log(tailCord);
            addToArray(cord9);
          }
        }
        break;
      case "U":
        for (let move = 1; move <= line[1]; move++) {
          cord0.y += 1;
          for (let i = 0; i < 9; i++) {
            const distBetween = calcDistnceBetwen(cords[i], cords[i + 1]);
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
              let modMove = findShortestDist(cords[i], cords[i + 1]);
              cords[i + 1].x += modMove.x;
              cords[i + 1].y += modMove.y;
            }
            //   console.log(tailCord);
            addToArray(cord9);
          }
        }
        break;
      case "D":
        for (let move = 1; move <= line[1]; move++) {
          cord0.y -= 1;
          for (let i = 0; i < 9; i++) {
            const distBetween = calcDistnceBetwen(cords[i], cords[i + 1]);
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
              let modMove = findShortestDist(cords[i], cords[i + 1]);
              cords[i + 1].x += modMove.x;
              cords[i + 1].y += modMove.y;
            }
            //   console.log(tailCord);
            addToArray(cord9);
          }
        }
        break;
    }
  });
}

moveTail();

// console.log(calcDistnceBetwen({ x: 2, y: 0 }, startingCord));
// console.log(findShortestDist({ x: 1, y: 1 }, startingCord));
console.log(cord0, cord9);
console.log(placesVisited);
console.log("answer: ", placesVisited.length);
