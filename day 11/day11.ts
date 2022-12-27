export const day = 11;
type monkey = {
  id: number;
  items: number[];
  inspectNum: number;
  operation: (item: number, monk: monkey) => number;
  test: (item: number, monk: monkey) => void;
};
// console.log("here");

const monkeys: monkey[] = [];

const input = await Deno.readTextFile("./input.txt");
const lines = input
  .split("\n\n")
  .map((item) => item.split("\n").map((item2) => item2.split(":")));
// console.log(lines);

lines.forEach((line, index) => {
  let monk: monkey = {
    id: index,
    items: [],
    inspectNum: 0,
    operation: (item: number, monk: monkey) => {
      return 0;
    },
    test: (item: number, monk: monkey) => {},
  };
  console.log("index: ", index, " line: ", line);

  const items = line[1][1].split(", ").map((item) => parseInt(item));
  monk.items = items;

  const operation = line[2][1];
  monk.operation = createOperation(operation, monk)!;

  // console.log("here");

  const testNum = parseInt(line[3][1].trim().split(" ")[2]);
  const trueMonk = parseInt(line[4][1].slice(-1));
  const falseMonk = parseInt(line[5][1].slice(-1));
  monk.test = createTest(testNum, trueMonk, falseMonk, monk);
  monkeys.push(monk);
});

// console.log(monkeys);

for (let round = 1; round <= 20; round++) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((item) => {
      const num = Math.floor(monkey.operation(item, monkey) / 3);
      console.log(num);

      monkey.test(num, monkey);
      // monkey.items = []
    });
  });
  // console.log(monkeys);
  // console.log(round);
}

console.log(monkeys);

// let answer = monkeys.map((item) => item.inspectNum).reduce((a, b) => a * b);
let nums = monkeys.map((item) => item.inspectNum).sort((a, b) => b - a);
let answer = nums[0] * nums[1];
console.log("answer: ", answer);

function createOperation(operation: string, monk: monkey) {
  const parts = operation.split(" ");
  //   console.log(parts);

  switch (parts[4]) {
    case "+":
      return (item: number, monk: monkey) => {
        monk.inspectNum = monk.inspectNum + 1;
        monk.items = monk.items.filter((num) => num != item);
        const number = isNaN(parseInt(parts[5])) ? item : parseInt(parts[5]);
        return item + number;
      };
      break;
    case "*":
      return (item: number, monk: monkey) => {
        monk.inspectNum = monk.inspectNum + 1;
        monk.items = monk.items.filter((num) => num != item);
        const number = isNaN(parseInt(parts[5])) ? item : parseInt(parts[5]);
        return item * number;
      };
      break;
  }
}

function createTest(
  divs: number,
  trueMonk: number,
  falseMonk: number,
  monk: monkey
) {
  return (item: number) => {
    // monk.items = monk.items.filter((num) => num != item);
    item % divs == 0
      ? monkeys[trueMonk].items.push(item)
      : monkeys[falseMonk].items.push(item);
  };
}

// console.log("here");
