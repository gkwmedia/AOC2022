export const day = 10;

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

console.log(lines);

let instruction = 1;
let xVal = 1;
let xLog: number[] = [];
let indexs = [19, 59, 99, 139, 179, 219];
let screenRow = 0;
let grid: String[][] = [];

function drawScreen() {
  let position = instruction - screenRow * 40;
  console.log("scren posiitonL ", position, " XVal: ", xVal);
  if (grid[screenRow] == undefined) {
    grid[screenRow] = new Array();
  }
  if (xVal == position || xVal + 2 == position || xVal + 1 == position) {
    grid[screenRow].push("#");
  } else {
    grid[screenRow].push(".");
  }

  if (instruction % 40 == 0) {
    screenRow++;
  }
  //   printGrid();
}

lines.forEach((line, index) => {
  const [cmd, value] = line.split(" ");
  if (cmd == "noop") {
    xLog.push(xVal);

    drawScreen();
    instruction++;
  }
  if (cmd == "addx") {
    xLog.push(xVal);
    drawScreen();
    instruction++;
    xLog.push(xVal);
    drawScreen();
    xVal += parseInt(value);
    instruction++;
  }

  //   console.log("Index: ", index, "Instruction: ", instruction, "Val: ", xVal);
});

// console.log(xLog[19]);

function printGrid() {
  grid.forEach((row) => {
    console.log(row.join(""));
  });
}

printGrid();
// console.log("here");

// console.log("answer: ", grid);
