export const day = 8;

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((line) => line.split("").map((num) => parseInt(num)));
// console.log(grid);

// let showingCount = 0;
let scenicScores: number[] = [];

function checkCordinate(x: number, y: number) {
  const cordValue = grid[y].at(x)!;
  let leftScore = 0;
  let rightScore = 0;
  let bottomScore = 0;
  let topScore = 0;
  // console.log(cordValue);
  // left
  const left = grid[y].slice(0, x);
  for (const item of left.reverse()) {
    if (item < cordValue) {
      leftScore++;
    } else if (item >= cordValue) {
      leftScore++;
      break;
    }
  }

  // right
  const right = grid[y].slice(x + 1);
  for (const item of right) {
    if (item < cordValue) {
      rightScore++;
    } else if (item >= cordValue) {
      rightScore++;
      break;
    }
  }
  // console.log(x, y);
  const vertArray: number[] = [];
  for (let i = 0; i < grid.length; i++) {
    vertArray.push(grid[i].at(x)!);
  }
  // console.log(vertArray);

  //top
  const bottom = vertArray.slice(0, y);
  for (const item of bottom.reverse()) {
    if (item < cordValue) {
      bottomScore++;
    } else if (item >= cordValue) {
      bottomScore++;
      break;
    }
  }

  //bottom
  const top = vertArray.slice(y + 1);
  for (const item of top) {
    if (item < cordValue) {
      topScore++;
    } else if (item >= cordValue) {
      topScore++;
      break;
    }
  }

  //   console.log(left);
  //   console.log(right);
  //   console.log(bottom);
  //   console.log(top);
  //   console.log(cordValue);
  //   console.log(
  //     "left: ",
  //     leftScore,
  //     " right: ",
  //     rightScore,
  //     " bottom: ",
  //     bottomScore,
  //     " top: ",
  //     topScore
  //   );
  const score = leftScore * rightScore * bottomScore * topScore;
  scenicScores.push(score);
}

for (let y = 1; y < grid.length - 1; y++) {
  for (let x = 1; x < grid[y].length - 1; x++) {
    checkCordinate(x, y);
  }
}
// checkCordinate(2, 3);

function findOuterNum() {
  // console.log(grid.length);
  // console.log(grid[0].length);
  let vertical = (grid.length - 2) * 2;
  let horizontal = grid[0].length * 2;
  return horizontal + vertical;
}

console.log("answer: ", Math.max(...scenicScores));
