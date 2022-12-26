export const day = 10;

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

console.log(lines);

let instruction = 1;
let xVal = 1;
let xLog: number[] = [];
let indexs = [19, 59, 99, 139, 179, 219];

lines.forEach((line, index) => {
  const [cmd, value] = line.split(" ");
  if (cmd == "noop") {
    xLog.push(xVal);
    instruction++;
  }
  if (cmd == "addx") {
    xLog.push(xVal);
    instruction++;
    xLog.push(xVal);
    xVal += parseInt(value);
    instruction++;
  }

  console.log("Index: ", index, "Instruction: ", instruction, "Val: ", xVal);
});

function calcAnswer() {
  let answer = 0;
  indexs.forEach((item) => {
    answer += (item + 1) * xLog[item];
  });
  return answer;
}

console.log(xLog[19]);

console.log("answer: ", calcAnswer());
