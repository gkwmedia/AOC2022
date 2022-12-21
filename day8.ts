export const day = 8;

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((line) => line.split("").map((num) => parseInt(num)));
console.log(grid);

let showingCount = 0;

function checkCordinate(x: number, y: number) {
  //left
  for (let i = 0; i < x; i++) {
    if (grid[y].at(i)! < grid[y].at(x)!) {
      showingCount += 1;
      return;
    }
  }
  //right

  //up

  //down
}

grid.forEach((item, index) => {
  for (let x = 1; x < item.length - 1; x++) {
    checkCordinate(x, index);
  }
});

console.log(showingCount);
