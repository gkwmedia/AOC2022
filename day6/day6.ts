export const day6 = 6;

function part1(input: string): number {
  let answer = 0;
  for (let i = 0; i <= input.length - 4; i++) {
    let subString = input.substring(i, i + 4);
    let split = subString.split("");
    let set = new Set(split);
    console.log(set);
    if (set.size == 4) {
      answer = i + 4;
      break;
    }
    // console.log(subString);
  }
  return answer;
}

function part2(input: string): number {
  let answer = 0;
  for (let i = 0; i <= input.length - 4; i++) {
    let subString = input.substring(i, i + 14);
    let split = subString.split("");
    let set = new Set(split);
    console.log(set);
    if (set.size == 14) {
      answer = i + 14;
      break;
    }
    // console.log(subString);
  }
  return answer;
}

const input = await Deno.readTextFile("./input.txt");

// console.log("answer 1: ", part1(input));
console.log("answer 2: ", part2(input));
