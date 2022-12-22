export const day = 8;

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((line) => line.split("").map((num) => parseInt(num)));
// console.log(grid);

let showingCount = 0;

function checkCordinate(x: number, y: number) {
  // left
  for (let i = x - 1; i == 0; i--) {
    if (grid[y].at(i)! >= grid[y].at(x)!) {
      break;
    } else if (i == 0 && grid[y].at(0)! < grid[y].at(x)!) {
      console.log(x, y);
      showingCount += 1;
      return;
    }
  }
  // right
  for (let i = grid[y].length - 1; i > x; i--) {
    // if (x == 3 && y == 2) {
    //   console.log(grid[y].at(i)!);
    //   console.log(grid[y].at(x)!);
    // }
    if (grid[y].at(i)! >= grid[y].at(x)!) {
      break;
    } else if (i == x + 1 && grid[y].at(i)! < grid[y].at(x)!) {
      console.log(x, y);
      showingCount += 1;
      return;
    }
  }

  //bottom
  for (let i = grid.length - 1; i > y; i--) {
    if (grid[i].at(x)! >= grid[y].at(x)!) {
      break;
    } else if (i == y + 1 && grid[i].at(x)! < grid[y].at(x)!) {
      console.log(x, y);
      showingCount += 1;
      return;
    }
  }

  //top
  for (let i = y - 1; i == 0; i--) {
    if (grid[y].at(x)! <= grid[i].at(x)!) {
      break;
    } else if (i == 0 && grid[y].at(x)! > grid[i].at(x)!) {
      console.log(x, y);
      showingCount += 1;
      return;
    }
  }
}

for (let y = 1; y < grid.length - 1; y++) {
  for (let x = 1; x < grid[y].length - 1; x++) {
    checkCordinate(x, y);
  }
}

function findOuterNum() {
  console.log(grid.length);
  let vertical = (grid.length - 2) * 2;
  let horizontal = grid[0].length * 2;
  return horizontal + vertical;
}

console.log(showingCount);
