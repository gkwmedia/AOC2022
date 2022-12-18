export const day = 5;

// After the rearrangement procedure completes, what crate ends up on top of each stack?
function parseAndMove2(stacks: string[][], moves: string[][]): string[][] {
  console.log("original", stacks);

  //   const numToMove = 1;
  //   const startingColumn = 3;
  //   const finalColumn = 5;

  moves.forEach((move) => {
    let numToMove = parseInt(move[1]);
    let startingColumn = parseInt(move[3]);
    let finalColumn = parseInt(move[5]);
    let _moves = [];
    // console.log(numToMove, startingColumn, finalColumn);
    // console.log(stacks[startingColumn - 1]);
    for (let i = 1; i <= numToMove; i++) {
      let moveC = stacks[startingColumn - 1].pop();
      if (moveC != undefined) {
        _moves.unshift(moveC);
      }
    }
    console.log("this is the array", _moves);
    _moves.forEach((item) => {
      stacks[finalColumn - 1].push(item);
    });
    // let moveC = stacks[startingColumn - 1].slice(-numToMove);
    // moveC.forEach((c) => {
    //   stacks[finalColumn - 1].push(c);
    // });
  });
  return stacks;
}

function parseAndMove(stacks: string[][], moves: string[][]): string[][] {
  console.log("original", stacks);

  //   const numToMove = 1;
  //   const startingColumn = 3;
  //   const finalColumn = 5;

  moves.forEach((move) => {
    let numToMove = parseInt(move[1]);
    let startingColumn = parseInt(move[3]);
    let finalColumn = parseInt(move[5]);
    // console.log(numToMove, startingColumn, finalColumn);
    // console.log(stacks[startingColumn - 1]);
    for (let i = 1; i <= numToMove; i++) {
      let moveC = stacks[startingColumn - 1].pop();
      if (moveC != undefined) {
        stacks[finalColumn - 1].push(moveC);
      }
    }
    // let moveC = stacks[startingColumn - 1].slice(-numToMove);
    // moveC.forEach((c) => {
    //   stacks[finalColumn - 1].push(c);
    // });
  });
  return stacks;
}

const input = await Deno.readTextFile("./input.txt");

// console.log(input);

const [data, moves] = input.split("\n\n");
const moves2 = moves.split("\n");
const finalMoves = moves2.map((item) => item.split(" "));

console.log({ data, moves });

let test = data.split("\n");
// console.log(test);

// const test2 = test.map((item) => item.split("\t"));
// console.log(test2);

let stack: string[][] = [[]];
// test.splice(-1)
test.pop();

test.forEach((row) => {
  let i = 0;
  let count = 0;
  for (i = 0; i < +row.length; i += 4) {
    let char = row.substring(i + 1, i + 2);
    if (stack[count] == undefined) {
      stack[count] = [];
    }
    if (char != " ") {
      stack[count].unshift(char);
    }

    count++;
  }
});

const finalStacks = parseAndMove2(stack, finalMoves);
console.log("answer", finalStacks);
