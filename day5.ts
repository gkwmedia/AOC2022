export const day = 5;

// After the rearrangement procedure completes, what crate ends up on top of each stack?
function parseAndMove(stacks: String[][], moves: String[]): String[][] {
	console.log("original", stacks);

	moves.forEach((move) => {
		console.log(move);
	});
	return [];
}

const input = await Deno.readTextFile("./input.txt");

console.log(input);

const [data, moves] = input.split("\n\n");
const finalMoves = moves.split("\n");

console.log({ data, moves });

let test = data.split("\n");
console.log(test);

// const test2 = test.map((item) => item.split("\t"));
// console.log(test2);

let stack: String[][] = [[]];
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

const finalStacks = parseAndMove(stack, finalMoves);
console.log("answer", finalStacks);
